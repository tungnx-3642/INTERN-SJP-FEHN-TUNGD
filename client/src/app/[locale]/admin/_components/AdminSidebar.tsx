"use client";
import {
  Home,
  Package,
  ShoppingCart,
  LogOut,
  ChartColumnStacked,
  User,
} from "lucide-react";
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
import { Link } from "@/i18n/navigation";
import { useAuth } from "@/context";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export function AdminSidebar() {
  const t = useTranslations("AdminSidebar");
  const { user, logout } = useAuth();
  const router = useRouter();

  const menu = [
    { label: t("dashboard"), icon: Home, href: routes.admin.dashboard },
    { label: t("products"), icon: Package, href: routes.admin.products.list },
    { label: t("users"), icon: User, href: routes.admin.users.list },
    {
      label: t("categories"),
      icon: ChartColumnStacked,
      href: routes.admin.categories,
    },
    { label: t("orders"), icon: ShoppingCart, href: routes.admin.orders },
  ];

  const handleLogout = () => {
    logout();
    router.push(routes.home);
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <h1 className="text-xl font-semibold mt-2">Wine horse</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t("adminPanel")}</SidebarGroupLabel>
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
            <p className="text-sm font-semibold">{user?.name}</p>
            <p className="text-xs text-gray-500">{t("adminRole")}</p>
          </div>
        </div>
        <Button
          size="icon"
          variant="destructive"
          className="w-full"
          onClick={handleLogout}
        >
          <LogOut />
          <p>{t("logout")}</p>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
