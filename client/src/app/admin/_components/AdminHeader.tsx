"use client";

import { usePathname } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import ModeToggle from "@/components/ModeToggle";
function AdminHeader() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const section = segments[1] || "";
  const titles: Record<string, string> = {
    "": "Dashboard",
    products: "Products",
    orders: "Orders",
    categories: "Categories",
    customers: "Customers",
    settings: "Settings",
    users: "Users",
  };

  return (
    <div className="p-5 flex items-center justify-between gap-4">
      <div className="flex gap-2">
        <SidebarTrigger size="lg" />
        <h1 className="text-2xl font-bold">{titles[section] ?? "Admin"}</h1>
      </div>
      <ModeToggle />
    </div>
  );
}

export default AdminHeader;
