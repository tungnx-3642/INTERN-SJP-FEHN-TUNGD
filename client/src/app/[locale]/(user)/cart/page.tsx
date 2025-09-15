import { routes } from "@/lib/routes";
import Image from "next/image";
import { DynamicBreadcrumb } from "@/app/[locale]/(user)/_components/DynamicBreadcrumb";
import CartTable from "./_components/CartTable";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("cart"),
  };
}

function CartPage() {
  const t = useTranslations("CartPage");

  const breadcrumbItems = [
    { label: t("home"), href: routes.home },
    { label: t("cart"), href: routes.cart },
  ];

  return (
    <div className="max-md:p-4 max-w-7xl mx-auto my-10">
      <DynamicBreadcrumb items={breadcrumbItems} />
      <div className="flex justify-between mt-5">
        <div>
          <h1 className="text-2xl uppercase">{t("title")}</h1>
          <Image
            src="/titleleft-dark.png"
            alt="title-left"
            width={600}
            height={100}
            className="w-20 h-1.5 mt-4 mb-6"
          />
        </div>
      </div>
      <CartTable />
    </div>
  );
}

export default CartPage;
