import { DynamicBreadcrumb } from "@/app/[locale]/(user)/_components/DynamicBreadcrumb";
import { routes } from "@/lib/routes";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import LoginForm from "./_components/LoginForm";
import GoogleSignInButton from "@/components/GoogleLoginButton";
import FacebookSignInButton from "@/components/FacebookSignInButton";
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
    title: t("login"),
  };
}

function LoginPage() {
  const t = useTranslations("LoginPage");

  const breadcrumbItems = [
    { label: t("home"), href: routes.home },
    { label: t("login"), href: routes.auth.login },
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
        <div className="flex items-center gap-3">
          <FacebookSignInButton />
          <GoogleSignInButton />
          <Link
            href={routes.auth.register}
            className="bg-foreground text-white px-7 h-12 flex justify-center items-center hover:bg-background hover:text-foreground"
          >
            {t("register")}
          </Link>
        </div>
      </div>
      <LoginForm />
    </div>
  );
}

export default LoginPage;
