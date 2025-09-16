"use client";

import StaticCard from "@/components/card/StaticCard";
import { formatToVND } from "@/utlis/formatData";
import { ShoppingCart, User, Box, CircleDollarSign } from "lucide-react";
import { RevenueChart } from "./_components/RevenueChart";
import AdminOrderTable from "./_components/AdminOrderTable";
import { useOrders, useProducts } from "@/hooks";
import { useCustomers } from "@/hooks/adminHooks";
import { OrderStatus } from "@/api/orderApi";
import { useTranslations } from "next-intl";

function DashboardPage() {
  const t = useTranslations("DashboardPage");

  const { data: orders } = useOrders();
  const completedOrders = orders?.filter(
    (order) => order.status == OrderStatus.Delivered
  );
  const totalRevenue = completedOrders?.reduce(
    (total, order) => total + order.total,
    0
  );
  const { data: products } = useProducts();
  const { data: customers } = useCustomers();

  const data = [
    {
      icon: Box,
      title: t("products"),
      value: products?.length || 0,
      text: t("productsText"),
    },
    {
      icon: User,
      title: t("customers"),
      value: customers?.length || 0,
      text: t("customersText"),
    },
    {
      icon: ShoppingCart,
      title: t("orders"),
      value: orders?.length || 0,
      text: t("ordersText"),
    },
    {
      icon: CircleDollarSign,
      title: t("revenue"),
      value: formatToVND(totalRevenue || 0),
      text: t("revenueText"),
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
