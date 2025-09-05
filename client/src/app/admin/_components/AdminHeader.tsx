"use client";

import { usePathname } from "next/navigation";
import SearchForm from "@/app/(user)/_components/SearchForm";
import { SidebarTrigger } from "@/components/ui/sidebar";
function AdminHeader() {
  const pathname = usePathname();
  const titles: Record<string, string> = {
    "/admin": "Dashboard",
    "/admin/products": "Products",
    "/admin/orders": "Orders",
    "/admin/customers": "Customers",
    "/admin/settings": "Settings",
  };

  return (
    <div className="p-5 flex items-center">
      <SidebarTrigger size="lg" />
      <h1 className="text-2xl font-bold">{titles[pathname]}</h1>
    </div>
  );
}

export default AdminHeader;
