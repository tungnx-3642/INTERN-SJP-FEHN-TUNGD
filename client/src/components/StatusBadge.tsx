"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { OrderStatus } from "@/api/orderApi";
import { useTranslations } from "next-intl";

export function StatusBadge({ status }: { status: OrderStatus }) {
  const t = useTranslations("StatusBadge");

  const badgeStyles = {
    [OrderStatus.Pending]: "bg-yellow-100 text-yellow-800",
    [OrderStatus.Confirmed]: "bg-blue-100 text-blue-800",
    [OrderStatus.Shipped]: "bg-purple-100 text-purple-800",
    [OrderStatus.Delivered]: "bg-green-100 text-green-800",
    [OrderStatus.Cancelled]: "bg-red-100 text-red-800",
  };

  const statusLabels = {
    [OrderStatus.Pending]: t("pending"),
    [OrderStatus.Confirmed]: t("confirmed"),
    [OrderStatus.Shipped]: t("shipped"),
    [OrderStatus.Delivered]: t("delivered"),
    [OrderStatus.Cancelled]: t("cancelled"),
  };

  return (
    <Badge
      variant="secondary"
      className={cn(
        "px-3 py-1 rounded-full text-xs font-medium",
        badgeStyles[status]
      )}
    >
      {statusLabels[status]}
    </Badge>
  );
}
