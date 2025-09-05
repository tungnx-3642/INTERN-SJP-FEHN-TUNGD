"use client";
import StaticCard from "@/components/card/StaticCard";
import { formatToVND } from "@/utlis/formatData";
import { ShoppingCart, User, Box, CircleDollarSign } from "lucide-react";
import { RevenueChart } from "./_components/RevenueChart";
import AdminOrderTable from "./_components/AdminOrderTable";
import { useOrders, useProducts } from "@/hooks";
import { useCustomers } from "@/hooks/adminHooks";
import { OrderStatus } from "@/api/orderApi";

function DashboardPage() {
  const { data: orders } = useOrders();
  const completedOrders = orders?.filter((order) => order.status == OrderStatus.Delivered)
  const totalRevenue = completedOrders?.reduce((total, order) => total + order.total, 0)
  const { data: products } = useProducts();
  const { data: customers } = useCustomers();
  const data = [
    {
      icon: Box,
      title: "Products",
      value: products?.length || 0,
      text: "Các loại sản phẩm",
    },
    { icon: User, title: "Customers", value: customers?.length || 0, text: "Số lượng khách hàng" },
    {
      icon: ShoppingCart,
      title: "Orders",
      value: orders?.length || 0,
      text: "Số lượng đơn hàng",
    },
    {
      icon: CircleDollarSign,
      title: "Revuene",
      value: formatToVND(totalRevenue || 0),
      text: "Tổng doanh thu",
    },
  ];


  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.map((item, index) => (
          <StaticCard key={index} data={item} />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 mt-5 gap-4">
        <RevenueChart orders={completedOrders || []} />
        <AdminOrderTable orders={orders || []} />
      </div>
    </div>
  );
}

export default DashboardPage;
