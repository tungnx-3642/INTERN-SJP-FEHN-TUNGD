import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context";

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
      <AuthProvider>
        <body>{children}</body>
      </AuthProvider>
    </html>
  );
}
