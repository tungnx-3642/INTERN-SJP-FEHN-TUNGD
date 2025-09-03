"use client";

import { usePathname } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
function AdminHeader() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean); 
  const section = segments[1] || "";
  const titles: Record<string, string> = {
    "": "Dashboard",
    products: "Products",
    orders: "Orders",
    customers: "Customers",
    settings: "Settings",
  };

  return (
    <div className="p-5 flex items-center gap-4">
      <SidebarTrigger size="lg" />
      <h1 className="text-2xl font-bold">{titles[section] ?? "Admin"}</h1>
    </div>
  );
}

export default AdminHeader;
