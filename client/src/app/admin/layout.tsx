"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "./_components/AdminSidebar";
import AdminHeader from "./_components/AdminHeader";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <AdminSidebar />
        <main className="flex-1">
          <AdminHeader />
          <div className="p-4">{children}</div>
        </main>
        <Toaster richColors position="top-center" />
      </SidebarProvider>
    </QueryClientProvider>
  );
}
