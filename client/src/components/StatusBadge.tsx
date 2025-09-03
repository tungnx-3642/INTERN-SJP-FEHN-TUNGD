"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { OrderStatus } from "@/api/orderApi";

export function StatusBadge({ status }: { status: OrderStatus }) {
  const badgeStyles = {
    [OrderStatus.Pending]: "bg-yellow-100 text-yellow-800",
    [OrderStatus.Confirmed]: "bg-blue-100 text-blue-800",
    [OrderStatus.Shipped]: "bg-purple-100 text-purple-800",
    [OrderStatus.Delivered]: "bg-green-100 text-green-800",
    [OrderStatus.Cancelled]: "bg-red-100 text-red-800",
  };

  return (
    <Badge
      variant="secondary"
      className={cn(
        "px-3 py-1 rounded-full text-xs font-medium",
        badgeStyles[status]
      )}
    >
      {status}
    </Badge>
  );
}
