"use client";

import { usePathname } from "@/i18n/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import ModeToggle from "@/components/ModeToggle";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useTranslations } from "next-intl";

function AdminHeader() {
  const t = useTranslations("AdminHeader");
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const section = segments[1] || "";

  const titles: Record<string, string> = {
    "": t("dashboard"),
    products: t("products"),
    orders: t("orders"),
    categories: t("categories"),
    customers: t("customers"),
    settings: t("settings"),
    users: t("users"),
  };

  return (
    <div className="p-5 flex items-center justify-between gap-4">
      <div className="flex gap-2">
        <SidebarTrigger size="lg" />
        <h1 className="text-2xl font-bold">{titles[section] ?? t("admin")}</h1>
      </div>
      <div className="flex gap-2">
        <ModeToggle />
        <LanguageSwitcher />
      </div>
    </div>
  );
}

export default AdminHeader;
