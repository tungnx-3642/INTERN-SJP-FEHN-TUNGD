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
import Link from "next/link";
import { routes } from "@/lib/routes";
import { formatShortTime } from "@/utlis/formatData";
import { StatusBadge } from "@/components/StatusBadge";

interface OrderTableProps {
  orders: Order[];
  activeStatus: OrderStatus | null;
}

function OrderTable({ orders, activeStatus }: OrderTableProps) {
  const tableHeaders = [
    "Mã đơn hàng",
    "Ngày đặt",
    "Số lượng SP",
    "Tổng tiền",
    "Trạng thái",
    "Thao tác",
  ];

  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        Bạn chưa có đơn hàng nào
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
                  Chi tiết
                </Link>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={6} className="text-center italic h-40">
              Không có dơn hàng
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default OrderTable;
