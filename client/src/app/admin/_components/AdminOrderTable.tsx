import { Order } from "@/api/orderApi";
import { StatusBadge } from "@/components/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatShortTime, formatToVND } from "@/utlis/formatData";
function AdminOrderTable({ orders }: { orders: Order[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Order</TableHead>
              <TableHead className="text-center">Customer</TableHead>
              <TableHead className="text-center">Date</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length > 0 ? (
              orders.map((o) => (
                <TableRow key={o.id}>
                  <TableCell className="text-center">#{o.id}</TableCell>
                  <TableCell className="text-center">{o.user?.name}</TableCell>
                  <TableCell className="text-center">
                    {o.created_at && formatShortTime(o.created_at)}
                  </TableCell>
                  <TableCell className="text-center">
                    <StatusBadge status={o.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    {formatToVND(o.total)}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-40">
                  Không có đơn đặt hàng gần đây
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default AdminOrderTable;
