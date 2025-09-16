import type { Metadata } from "next";
import Image from "next/image";
import { DynamicBreadcrumb } from "../_components/DynamicBreadcrumb";
import { routes } from "@/lib/routes";
import OrderList from "./_components/OrderList";

export const metadata: Metadata = {
  title: "Danh sách đơn hàng",
};

function OrdersPage() {
  const breadCrumbItems = [
    { label: "Trang chủ", href: routes.home },
    { label: "Danh sách đơn hàng", href: routes.orders.list },
  ];

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
      <DynamicBreadcrumb items={breadCrumbItems} />
      <div className="flex flex-col gap-3 mt-10">
        <h1 className="uppercase text-2xl">Đơn hàng</h1>
        <Image
          src="/titleleft-dark.png"
          alt="title-left"
          width={600}
          height={100}
          className="w-20 h-1.5 mb-6"
        />
      </div>
      <OrderList />
    </div>
  );
}

export default OrdersPage;
