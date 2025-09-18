"use client";

import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/api";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { routes } from "@/lib/routes";
import { useTranslations } from "next-intl";

export function userColumns(): ColumnDef<User>[] {
  const t = useTranslations("AdminManageUsers");

  return [
    {
      header: t("index"),
      cell: ({ row }) => row.index + 1,
    },
    {
      accessorKey: "name",
      header: t("name"),
    },
    {
      accessorKey: "email",
      header: t("email"),
    },
    {
      header: t("actions"),
      cell: ({ row }) => {
        const user = row.original;
        return (
          <Button asChild variant="outline" size="sm">
            <Link href={routes.admin.users.detail(user.id)}>
              <Eye className="h-4 w-4 mr-1" />
              {t("viewDetail")}
            </Link>
          </Button>
        );
      },
    },
  ];
}
