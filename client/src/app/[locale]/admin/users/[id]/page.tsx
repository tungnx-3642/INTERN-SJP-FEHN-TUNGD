import type { Metadata } from "next";
import { adminApi } from "@/api";
import { orderApi } from "@/api/orderApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeftCircle, User } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { routes } from "@/lib/routes";
import { StatusBadge } from "@/components/StatusBadge";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const user = await adminApi.getCustomerInfor(Number(params.id));
  if (!user) {
    return { title: "User Not Found" };
  }
  return { title: user.name || "User Detail" };
}

async function UserDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const user = await adminApi.getCustomerInfor(Number(id));
  const orders = await orderApi.getByUserId(user.id);

  const totalOrders = orders.length;
  const totalSpent = orders.reduce((sum: number, o: any) => sum + o.total, 0);
  const avgOrderValue = totalOrders > 0 ? totalSpent / totalOrders : 0;
  const completedOrders = orders.filter(
    (o: any) => o.status === "delivered"
  ).length;
  const cancelledOrders = orders.filter(
    (o: any) => o.status === "cancelled"
  ).length;
  const processingOrders = orders.filter((o: any) =>
    ["pending", "confirmed", "shipped"].includes(o.status)
  ).length;

  const stats = [
    {
      label: "Tổng đơn hàng",
      value: totalOrders,
    },
    {
      label: "Tổng chi tiêu (VND)",
      value: `${(totalSpent / 1_000_000).toFixed(2)}M`,
    },
    {
      label: "Đơn hàng trung bình",
      value: `${(avgOrderValue / 1_000_000).toFixed(2)}M`,
    },
    {
      label: "Đơn hoàn thành",
      value: completedOrders,
    },
    {
      label: "Đơn đang xử lý",
      value: processingOrders,
    },
    {
      label: "Đơn đã hủy",
      value: cancelledOrders,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <Link
        href={routes.admin.users.list}
        className="flex gap-2 mb-5 rounded px-4 py-2 w-fit hover:bg-accent"
      >
        <ArrowLeftCircle />
        Back
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Thông tin người dùng</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full border flex justify-center items-center mb-3">
              <User className="w-10 h-10" />
            </div>
            <p className="text-lg font-semibold">{user?.name}</p>
            <p className="underline text-blue-500 text-sm">{user?.email}</p>

            <div className="w-full mt-6">
              <h2 className="text-base font-semibold mb-4">Thống kê</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {stats.map((s, i) => (
                  <Card key={i} className="p-4 text-center">
                    <p className="text-2xl font-bold text-primary">{s.value}</p>
                    <p className="text-sm text-muted-foreground">{s.label}</p>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order History */}
        <Card>
          <CardHeader>
            <CardTitle>Lịch sử đơn hàng</CardTitle>
          </CardHeader>
          <CardContent>
            {orders.length === 0 ? (
              <p className="text-sm text-gray-500">Chưa có đơn hàng nào</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Ngày tạo</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Tổng tiền</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order: any) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>
                        {new Date(order.created_at).toLocaleDateString("vi-VN")}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={order.status} />
                      </TableCell>
                      <TableCell>{order.total.toLocaleString()} đ</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default UserDetailPage;
