import Image from "next/image";
import { DynamicBreadcrumb } from "../_components/DynamicBreadcrumb";
import { routes } from "@/lib/routes";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("infor"),
  };
}

async function InforPage() {
  const t = await getTranslations("InforPage");

  const breadCrumbItems = [
    { label: t("breadcrumb.home"), href: routes.home },
    { label: t("breadcrumb.info"), href: routes.infor },
  ];

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
      <DynamicBreadcrumb items={breadCrumbItems} />
      <div className="flex flex-col gap-3 my-10">
        <h1 className="uppercase text-2xl">{t("introTitle")}</h1>
        <Image
          src="/titleleft-dark.png"
          alt="title-left"
          width={600}
          height={100}
          className="w-20 h-1.5 mb-6"
        />
        <div className="flex max-md:flex-col justify-between">
          <Image
            src="/wine-background.jpg"
            alt="wine-background"
            width={1000}
            height={1000}
            className="w-full z-0 md:w-2/5 h-80 object-cover"
          />
          <div className="w-full max-md:mt-5 md:w-3/5 md:pl-10 flex flex-col gap-5">
            <h1 className="uppercase text-3xl">{t("welcomeTitle")}</h1>
            <p className="text-gray-500">{t("paragraph1")}</p>
            <p className="text-gray-500">{t("paragraph2")}</p>
            <p className="text-gray-500">{t("paragraph3")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InforPage;
