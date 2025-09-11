import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context";
import { ThemeProvider } from "@/components/theme-provider";
import CustomSessionProvider from "./provider/CustomSessionProvider";

export const metadata: Metadata = {
  title: {
    default: "Wine horse",
    template: "%s | Wine horse",
  },
  description: "Discover and explore the world of fine wines with Wine horse.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <CustomSessionProvider>
        <AuthProvider>
          <body>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </body>
        </AuthProvider>
      </CustomSessionProvider>
    </html>
  );
}
