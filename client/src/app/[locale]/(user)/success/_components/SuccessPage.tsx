"use client";
import { OrderStatus } from "@/api/orderApi";
import { useUpdateOrderStatus } from "@/hooks";
import { formatShortTime, formatToVND } from "@/utlis/formatData";
import { useEffect } from "react";
import { Link } from "@/i18n/navigation";
import { routes } from "@/lib/routes";
import { CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useCart } from "@/context";

type SuccessSession = {
  customerEmail: string;
  amount: number;
  createdAt: number;
  orderId: number;
  name: string;
  address: string;
  city: string;
};

function SuccessPage({ session }: { session: SuccessSession }) {
  const t = useTranslations("SuccessPage");
  const { removeAll } = useCart();
  const { mutate: updateStatus } = useUpdateOrderStatus({
    onSuccess: () => {
      removeAll();
    }
  });

  useEffect(() => {
    updateStatus({ id: session.orderId, status: OrderStatus.Confirmed });
  }, [session.orderId, updateStatus]);

  const infoRows = [
    {
      label: t("createdTime"),
      value: formatShortTime(new Date(session.createdAt * 1000)),
    },
    { label: t("recipientName"), value: session.name },
    { label: t("address"), value: session.address },
    { label: t("city"), value: session.city },
  ];

  return (
    <section className="max-w-2xl mx-auto min-h-[56vh] flex items-center justify-center p-6">
      <Card className="w-full shadow-none rounded-2xl">
        <CardHeader className="flex flex-col items-center text-center gap-2">
          <CheckCircle2 className="w-12 h-12 text-green-500" />
          <CardTitle className="text-2xl font-semibold">
            {t("paymentSuccess")}
          </CardTitle>
          <p className="text-muted-foreground text-sm">
            {t("thankYou")}{" "}
            <span className="font-medium">{session.customerEmail}</span>.
          </p>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          <div className="flex justify-between border-b pb-2">
            <p className="text-muted-foreground">{t("totalAmount")}</p>
            <p className="font-semibold text-lg">
              {formatToVND(session.amount)}
            </p>
          </div>

          {infoRows.map((row, idx) => (
            <div key={idx} className="flex justify-between">
              <p className="text-muted-foreground">{row.label}</p>
              <p className="font-medium">{row.value}</p>
            </div>
          ))}

          <div className="pt-4 flex justify-center">
            <Button asChild>
              <Link href={routes.products.list}>{t("continueShopping")}</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

export default SuccessPage;
