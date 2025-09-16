"use client";

import { useState, useMemo } from "react";
import { useOrders } from "@/hooks";
import OrderCard from "./OrderCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Order, OrderStatus } from "@/api/orderApi";
import { Filter, ArrowDownUp, ShoppingCart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslations } from "next-intl";

function OrderList() {
  const t = useTranslations("AdminOrders");
  const { data: orders } = useOrders();
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");

  const filteredOrders = useMemo(() => {
    if (!orders) return [];
    let list = [...orders];

    if (statusFilter !== "all") {
      list = list.filter((o) => o.status === statusFilter);
    }

    list.sort((a, b) => {
      const timeA = new Date(a.created_at ?? "").getTime();
      const timeB = new Date(b.created_at ?? "").getTime();
      return sortOrder === "desc" ? timeB - timeA : timeA - timeB;
    });

    return list;
  }, [orders, statusFilter, sortOrder]);

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="flex flex-wrap items-center gap-4">
          <div>
            <p className="text-sm text-gray-400">{t("orderCount")}</p>
            <p className="flex gap-2 text-xl text-gray-700 mt-2 font-bold items-center dark:text-white">
              {filteredOrders.length} <ShoppingCart size={20} />
            </p>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <Select
              value={statusFilter}
              onValueChange={(val) =>
                setStatusFilter(val as OrderStatus | "all")
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t("filterStatus")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("all")}</SelectItem>
                {Object.values(OrderStatus).map((s) => (
                  <SelectItem key={s} value={s}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <ArrowDownUp className="w-4 h-4 text-muted-foreground" />
            <Select
              value={sortOrder}
              onValueChange={(val) => setSortOrder(val as "asc" | "desc")}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t("sort")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="desc">{t("newToOld")}</SelectItem>
                <SelectItem value="asc">{t("oldToNew")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {filteredOrders.length === 0 ? (
        <p className="text-center text-muted-foreground">{t("noOrders")}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          {filteredOrders.map((order: Order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderList;
