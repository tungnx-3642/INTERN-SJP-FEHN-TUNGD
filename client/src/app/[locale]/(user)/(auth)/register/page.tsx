import type { Metadata } from "next";
import { DynamicBreadcrumb } from "../../_components/DynamicBreadcrumb";
import { routes } from "@/lib/routes";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import RegisterForm from "./_components/registerForm";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("register"),
  };
}

function RegisterPage() {
  const t = useTranslations("RegisterPage");

  const breadcrumbItems = [
    { label: t("home"), href: routes.home },
    { label: t("register"), href: routes.auth.register },
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
        <Link
          href={routes.auth.login}
          className="bg-foreground text-white px-7 h-12 flex justify-center items-center hover:bg-background hover:text-foreground"
        >
          {t("login")}
        </Link>
      </div>
      <RegisterForm />
    </div>
  );
}

export default RegisterPage;
