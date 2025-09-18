import type { Metadata } from "next";
import Image from "next/image";
import { DynamicBreadcrumb } from "../../_components/DynamicBreadcrumb";
import { routes } from "@/lib/routes";
import OrderDetailTable from "./_components/OrderDetailTable";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "OrderDetailPage" });

  return {
    title: t("title"),
  };
}

async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id, locale } = await params;
  const t = await getTranslations({ locale, namespace: "OrderDetailPage" });

  const breadCrumbItems = [
    { label: t("home"), href: routes.home },
    { label: t("orderList"), href: routes.orders.list },
    { label: `#${id}`, href: routes.orders.detail(id) },
  ];
  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
      <DynamicBreadcrumb items={breadCrumbItems} />
      <div className="flex flex-col gap-3 mt-10">
        <h1 className="uppercase text-2xl">{t("orderDetails")}</h1>
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
