"use client";
import { authApi } from "@/api";
import { routes } from "@/lib/routes";
import { Link } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export default function ActivatePage() {
  const t = useTranslations("NotFound");
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("Activating");

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      authApi
        .activateAccount(token)
        .then((res) => setStatus(res.message))
        .catch(() => setStatus("activateFailed"));
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <p>{t(status)}</p>
      <Link className="bg-foreground text-background rounded-lg px-4 py-2 mt-5" href={routes.home}>{t("backHome")}</Link>
    </div>
  );
}
