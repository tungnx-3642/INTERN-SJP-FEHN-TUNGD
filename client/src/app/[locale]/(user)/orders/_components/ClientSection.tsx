"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, MapPin, Phone } from "lucide-react";
import { useAuth } from "@/context";
import { routes } from "@/lib/routes";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

function ClientSection() {
  const { user } = useAuth();
  const t = useTranslations("OrdersPage");

  return (
    <Card className="w-full md:w-1/4 rounded-none shadow-none h-fit bg-gray-100 dark:bg-accent">
      <CardHeader>
        <CardTitle className="uppercase text-lg font-normal">
          {t("customerInfo")}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex gap-2 items-start">
          <User />
          <div>
            <p>{user?.name}</p>
            <p className="text-sm text-gray-800 dark:text-white">
              {user?.email}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <MapPin />
          <div>
            <p>9/39 ngõ 83 Tân Triều, Hà Nội</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Phone />
          <div>
            <p>033 671 7168</p>
          </div>
        </div>
        <Link className="mt-3 underline" href={routes.addresses}>
          {t("addressDetails")}
        </Link>
      </CardContent>
    </Card>
  );
}

export default ClientSection;
