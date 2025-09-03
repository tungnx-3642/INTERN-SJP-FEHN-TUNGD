import { Home, Package, ShoppingCart, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { routes } from "@/lib/routes";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

const menu = [
  { label: "Dashboard", icon: Home, href: routes.admin.dashboard },
  { label: "Products", icon: Package, href: routes.admin.products },
  { label: "Orders", icon: ShoppingCart, href: routes.admin.orders },
];

export function AdminSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <h1 className="text-xl font-semibold mt-2">Wine horse</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Admin panel</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menu.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild>
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center gap-4">
          <Image
            src="/logo.jpeg"
            alt="Admin Avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <p className="text-sm font-semibold">Test Admin</p>
            <p className="text-xs text-gray-500">Admin manager</p>
          </div>
        </div>
        <Button size="icon" variant="destructive" className="w-full">
          <LogOut />
          <p>Log out</p>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
