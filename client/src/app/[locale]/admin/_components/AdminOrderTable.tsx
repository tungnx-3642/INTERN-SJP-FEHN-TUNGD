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
import { useTranslations } from "next-intl";
function AdminOrderTable({ orders }: { orders: Order[] }) {
  const t = useTranslations("DashboardPage");

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("recentOrders")}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">{t("order")}</TableHead>
              <TableHead className="text-center">{t("customer")}</TableHead>
              <TableHead className="text-center">{t("date")}</TableHead>
              <TableHead className="text-center">{t("status")}</TableHead>
              <TableHead className="text-right">{t("total")}</TableHead>
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
                  {t("noRecentOrders")}
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
