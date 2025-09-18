"use client";
import { Order, OrderStatus } from "@/api/orderApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatToVND } from "@/utlis/formatData";
import { Link } from "@/i18n/navigation";
import { routes } from "@/lib/routes";
import { formatShortTime } from "@/utlis/formatData";
import { StatusBadge } from "@/components/StatusBadge";
import { useTranslations } from "next-intl";

interface OrderTableProps {
  orders: Order[];
  activeStatus: OrderStatus | null;
}

function OrderTable({ orders, activeStatus }: OrderTableProps) {
  const t = useTranslations("OrdersPage");

  const tableHeaders = [
    t("orderCode"),
    t("orderDate"),
    t("quantity"),
    t("total"),
    t("status"),
    t("actions"),
  ];

  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        {t("noOrders")}
      </div>
    );
  }

  const filteredOrders = activeStatus
    ? orders.filter((order) => order.status === activeStatus)
    : orders;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {tableHeaders.map((header) => (
            <TableHead
              key={header}
              className="font-medium uppercase text-center"
            >
              {header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium text-center">
                #{order.id}
              </TableCell>
              <TableCell className="text-center">
                {formatShortTime(order.created_at || "")}
              </TableCell>
              <TableCell className="text-center">
                {order.items.length}
              </TableCell>
              <TableCell className="text-center">
                {formatToVND(order.total)}
              </TableCell>
              <TableCell className="text-center">
                <StatusBadge status={order.status} />
              </TableCell>
              <TableCell className="text-center">
                <Link
                  href={routes.orders.detail(order.id || "")}
                  className="border rounded-lg px-2 py-1 shadow hover:underline"
                >
                  {t("viewDetails")}
                </Link>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={6} className="text-center italic h-40">
              {t("noOrders")}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default OrderTable;
