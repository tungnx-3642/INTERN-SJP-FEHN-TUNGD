"use client";

import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/api";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import Link from "next/link";
import { routes } from "@/lib/routes";

export const userColumns: ColumnDef<User>[] = [
  {
    header: "STT",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "name",
    header: "Tên",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    header: "Thao tác",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <Button asChild variant="outline" size="sm">
          <Link href={routes.admin.users.detail(user.id)}>
            <Eye className="h-4 w-4 mr-1" />
            Xem chi tiết
          </Link>
        </Button>
      );
    },
  },
];
