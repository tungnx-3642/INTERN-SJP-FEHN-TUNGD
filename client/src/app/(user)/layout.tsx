"use client";
import { ReactNode } from "react";
import UserHeader from "./_components/userHeader";
import { Fraunces } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import UserFooter from "./_components/userFooter";

const queryClient = new QueryClient();

const fraunces = Fraunces({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "700", "900"], // Specify the weights you need
  display: "swap",
  variable: "--font-fraunces", // Define the CSS variable name
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
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
