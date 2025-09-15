import { DynamicBreadcrumb } from "../_components/DynamicBreadcrumb";
import { routes } from "@/lib/routes";
import AddressesList from "./_components/AddressesList";
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
    title: t("addresses"),
  };
}

function AddressesPage() {
  const t = useTranslations("AddressesPage");

  const breadcrumbItems = [
    { label: t("home"), href: routes.home },
    { label: t("addresses"), href: routes.addresses },
  ];

  return (
    <div className="max-md:p-4 max-w-7xl mx-auto my-10">
      <DynamicBreadcrumb items={breadcrumbItems} />
      <AddressesList />
    </div>
  );
}

export default AddressesPage;
