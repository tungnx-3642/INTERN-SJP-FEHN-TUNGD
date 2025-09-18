"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, UserPlus } from "lucide-react";
import { useTranslations } from "next-intl";

interface UserTableHeaderProps {
  total: number;
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
}

export function UserTableHeader({
  total,
  globalFilter,
  setGlobalFilter,
}: UserTableHeaderProps) {
  const t = useTranslations("AdminManageUsers")
  return (
    <Card className="shadow-none mb-4 py-4">
      <CardContent className="flex flex-col md:flex-row md:items-center gap-4">
        <div>
          <p className="text-gray-500 dark:text-gray-300">{t("totalUser")}</p>
          <p className="text-2xl font-semibold flex items-center gap-1 text-gray-700 dark:text-white">
            {total} <UserPlus />
          </p>
        </div>

        <div className="ml-auto w-full md:w-auto">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t("searchPlaceHolder")}
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
