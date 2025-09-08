"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Order, OrderStatus } from "@/api/orderApi";
import { useProductsList, useUpdateOrderStatus } from "@/hooks";
import Image from "next/image";
import { formatToVND, formatShortTime } from "@/utlis/formatData";
import { StatusBadge } from "@/components/StatusBadge";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface OrderCardProps {
  order: Order;
}

export default function OrderCard({ order }: OrderCardProps) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<OrderStatus>(order.status);
  const [editing, setEditing] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>(
    order.status
  );
  const { mutate: updateStatus } = useUpdateOrderStatus({
    onSuccess: () => {
      toast.success("Cập nhật trạng thái đơn hàng thành công");
      setStatus(selectedStatus);
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      setEditing(false);
    },
    onError: () => {
      toast.error("Cập nhật trạng thái đơn hàng thất bại");
    },
  });

  const itemIds = order.items.map((item) => item.productId);
  const { data: products } = useProductsList(itemIds);

  const enrichedItems = order.items.map((item) => {
    const product = products?.find((p) => p.id === Number(item.productId));
    return {
      ...item,
      price: product?.price || 0,
      name: product?.name || `#${item.productId}`,
      imageUrl: product?.imageUrl,
      description: product?.description,
    };
  });

  return (
    <Card className="w-full shadow-md rounded-2xl p-2">
      <CardHeader className="flex flex-col sm:flex-row justify-between items-start pt-5">
        <div>
          <CardTitle className="text-lg mb-5">
            Đơn #{order.id} - {order.user?.name ?? `User ${order.userId}`}
          </CardTitle>
          <p className="text-sm text-muted-foreground mb-1">
            Trạng thái: <StatusBadge status={status} />
          </p>
          <p className="text-sm text-muted-foreground mb-1">
            Tổng tiền: {formatToVND(order.total)}
          </p>
          <p className="text-xs text-muted-foreground">
            Thời gian: {formatShortTime(order.created_at || "")}
          </p>
        </div>

        <div className="flex items-start gap-2 mt-2 sm:mt-0">
          {!editing ? (
            <Button
              className="bg-green-600 text-white hover:bg-green-700"
              size="sm"
              onClick={() => setEditing(true)}
            >
              Cập nhật trạng thái
            </Button>
          ) : (
            <div className="flex gap-2">
              <Select
                value={selectedStatus}
                onValueChange={(val) => setSelectedStatus(val as OrderStatus)}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(OrderStatus).map((s) => (
                    <SelectItem
                      key={s}
                      value={s}
                      className={cn({
                        "text-red-500": s === OrderStatus.Cancelled,
                      })}
                    >
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                size="sm"
                onClick={() =>
                  updateStatus({ id: order.id!, status: selectedStatus })
                }
              >
                Lưu
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => {
                  setSelectedStatus(status);
                  setEditing(false);
                }}
              >
                Hủy
              </Button>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <Collapsible open={open} onOpenChange={setOpen}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2"
            >
              {open ? (
                <>
                  <ChevronUp className="w-4 h-4" /> Ẩn
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" /> Chi tiết
                </>
              )}
            </Button>
          </CollapsibleTrigger>

          <CollapsibleContent className="mt-2">
            <ul className="space-y-3">
              {enrichedItems.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-3 border rounded-lg p-2"
                >
                  {item.imageUrl && (
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="rounded-md object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    {item.description && (
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {item.description}
                      </p>
                    )}
                    <div className="mt-1 text-yellow-400">
                      {formatToVND(item.price)}
                    </div>
                    <div className="mt-3 text-sm font-semibold">
                      Số lượng: {item.quantity}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}
