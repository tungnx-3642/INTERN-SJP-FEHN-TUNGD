"use client";
import React, { useEffect, useState } from "react";
import { OrderStatus } from "@/api/orderApi";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context";
import { useRouter } from "@/i18n/navigation";
import { routes } from "@/lib/routes";
import { useOrderByUSer } from "@/hooks";
import OrderTable from "./OrderTable";
import ClientSection from "./ClientSection";
function OrderList() {
  const { user } = useAuth();
  const { data: orders } = useOrderByUSer(user?.id);
  const statuses = Object.values(OrderStatus);
  const [activeStatus, setActiveStatus] = useState<OrderStatus | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace(routes.auth.login);
    }
  }, [user, router]);

  const numberOrdersInStatus = (status: OrderStatus): number => {
    return orders?.filter((order) => order.status === status).length || 0;
  };

  if (!user) return null;

  return (
    <div className="flex max-md:flex-col-reverse gap-5 justify-between">
      <Card className="w-full md:w-3/4 rounded-none shadow-none py-0">
        <CardHeader className="bg-gray-100 py-6 border-b dark:bg-accent">
          <CardTitle className="uppercase text-lg font-normal">
            Danh sách đơn hàng
          </CardTitle>
          <div className="flex flex-wrap gap-2 mt-5 mb-3 items-center space-x-1">
            <Button
              variant="link"
              onClick={() => setActiveStatus(null)}
              className={cn({
                "text-yellow-400": !activeStatus,
              })}
            >
              Tất cả ({orders?.length})
            </Button>
            <Separator orientation="vertical" className="h-6" />
            {statuses.map((status) => (
              <React.Fragment key={status}>
                <Button
                  key={status}
                  variant="link"
                  onClick={() => setActiveStatus(status)}
                  className={cn({
                    "text-yellow-400": status == activeStatus,
                  })}
                >
                  {status} ({numberOrdersInStatus(status)})
                </Button>
                <Separator orientation="vertical" />
              </React.Fragment>
            ))}
          </div>
        </CardHeader>
        <CardContent className="min-h-80">
          <OrderTable orders={orders || []} activeStatus={activeStatus} />
        </CardContent>
      </Card>
      <ClientSection />
    </div>
  );
}

export default OrderList;
