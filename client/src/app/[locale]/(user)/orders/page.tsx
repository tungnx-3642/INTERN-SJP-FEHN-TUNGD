import type { Metadata } from "next";
import Image from "next/image";
import { DynamicBreadcrumb } from "../_components/DynamicBreadcrumb";
import { routes } from "@/lib/routes";
import OrderList from "./_components/OrderList";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("orders"),
  };
}

async function OrdersPage() {
  const t = await getTranslations("OrdersPage");

  const breadCrumbItems = [
    { label: t("home"), href: routes.home },
    { label: t("orders"), href: routes.orders.list },
  ];

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
      <DynamicBreadcrumb items={breadCrumbItems} />
      <div className="flex flex-col gap-3 mt-10">
        <h1 className="uppercase text-2xl">{t("title")}</h1>
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
