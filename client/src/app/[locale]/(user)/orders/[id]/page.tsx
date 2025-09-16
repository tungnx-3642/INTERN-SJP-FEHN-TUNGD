import type { Metadata } from "next";
import Image from "next/image";
import { DynamicBreadcrumb } from "../../_components/DynamicBreadcrumb";
import { routes } from "@/lib/routes";
import OrderDetailTable from "./_components/OrderDetailTable";

export const metadata: Metadata = {
  title: "Chi tiết đơn hàng",
};

function OrderDetailPage({ params }: { params: { id: string }  }) {
  const { id } = params;
  const breadCrumbItems = [
    { label: "Trang chủ", href: routes.home },
    { label: "Danh sách đơn hàng", href: routes.orders.list },
    { label: `#${id}`, href: routes.orders.detail(id) },
  ];
  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
      <DynamicBreadcrumb items={breadCrumbItems} />
      <div className="flex flex-col gap-3 mt-10">
        <h1 className="uppercase text-2xl">Chi tiết đơn hàng</h1>
        <Image
          src="/titleleft-dark.png"
          alt="title-left"
          width={600}
          height={100}
          className="w-20 h-1.5 mb-6"
        />
      </div>
      <OrderDetailTable orderId={Number(id)} />
    </div>
  );
}

export default OrderDetailPage;
