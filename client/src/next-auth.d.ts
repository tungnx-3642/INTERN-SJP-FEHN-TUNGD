import NextAuth from "next-auth";
import { User as ApiUser } from "@/api";

declare module "next-auth" {
  interface Session {
    user: ApiUser;
    accessToken?: string;
  }

  interface User extends ApiUser {}
}
