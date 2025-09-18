import Image from "next/image";
import { DynamicBreadcrumb } from "../_components/DynamicBreadcrumb";
import { routes } from "@/lib/routes";
import FavoritesList from "./_components/FavoritesList";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("favorites"),
  };
}

async function FavortiesPage() {
  const t = await getTranslations("FavoritesPage");

  const breadCrumbItems = [
    { label: t("home"), href: routes.home },
    { label: t("favorites"), href: routes.favorites },
  ];

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
      <DynamicBreadcrumb items={breadCrumbItems} />
      <div className="flex flex-col gap-3 my-10">
        <h1 className="uppercase text-2xl">{t("title")}</h1>
        <Image
          src="/titleleft-dark.png"
          alt="title-left"
          width={600}
          height={100}
          className="w-20 h-1.5 mb-6"
        />
      </div>
      <FavoritesList />
    </div>
  );
}

export default FavortiesPage;
