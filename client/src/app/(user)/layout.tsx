"use client";
import { ReactNode } from "react";
import UserHeader from "./_components/UserHeader";
import { Fraunces } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import UserFooter from "./_components/UserFooter";
import { Toaster } from "@/components/ui/sonner"

const queryClient = new QueryClient();

const fraunces = Fraunces({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "700", "900"],
  display: "swap",
  variable: "--font-fraunces",
});

export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <div
        className={`min-h-screen flex flex-col ${fraunces.className}`}
      >
        <UserHeader />
        <div className="mt-52 lg:mt-44">{children}</div>
        <UserFooter />
      </div>
       <Toaster />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
