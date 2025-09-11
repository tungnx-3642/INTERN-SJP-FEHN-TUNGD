import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_HOST}/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          }
        );

        const data = await res.json();

        if (!res.ok || !data.accessToken) {
          return null;
        }

        return {
          id: data.user.id,
          name: data.user.name,
          favorite: data.user.favorite,
          email: data.user.email,
          isAdmin: data.user.isAdmin,
          accessToken: data.accessToken,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        if (account.provider === "credentials") {
          token.id = user.id;
          token.name = user.name;
          token.email = user.email;
          token.favorite = user.favorite;
          token.isAdmin = user.isAdmin;
          token.accessToken = user.accessToken;
        } else {
          const checkRes = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_HOST}/users?email=${user.email}`
          );
          const existingUsers = await checkRes.json();

          let data;
          if (existingUsers.length > 0) {
            const loginRes = await fetch(
              `${process.env.NEXT_PUBLIC_SERVER_HOST}/users?email=${user.email}`
            );
            data = await loginRes.json();
            token.id = data[0].id;
            token.name = data[0].name;
            token.email = data[0].email;
            token.favorite = data[0].favorite;
            token.isAdmin = data[0].isAdmin;
          } else {
            const regRes = await fetch(
              `${process.env.NEXT_PUBLIC_SERVER_HOST}/register`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  email: user.email,
                  name: user.name,
                  password: "no-password",
                  isAdmin: false,
                  isActive: true,
                  favorite: [],
                }),
              }
            );
            data = await regRes.json();
            token.id = data.user.id;
            token.name = data.user.name;
            token.email = data.user.email;
            token.favorite = data.user.favorite;
            token.isAdmin = data.user.isAdmin;
            token.accessToken = data.accessToken;
          }
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        name: token.name,
        favorite: token.favorite,
        email: token.email,
        isAdmin: token.isAdmin,
      };
      session.accessToken = token.accessToken;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
};

export const { handlers, auth } = NextAuth(authOptions);
