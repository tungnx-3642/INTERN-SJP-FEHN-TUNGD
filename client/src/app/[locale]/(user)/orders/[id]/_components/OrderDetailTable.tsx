"use client";
import { useOrder, useProductsList } from "@/hooks";
import { formatShortTime } from "@/utlis/formatData";
import { StatusBadge } from "@/components/StatusBadge";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatToVND } from "@/utlis/formatData";
import { useMemo } from "react";
import ItemRow from "@/app/[locale]/(user)/_components/ItemRow";
import { useTranslations } from "next-intl";

function OrderDetailTable({ orderId }: { orderId: number }) {
  const t = useTranslations("OrderDetailTable");
  const { data: order } = useOrder(orderId);
  const itemsId = order?.items.map((item) => item.productId);
  const { data: products } = useProductsList(itemsId || []);
  const enrichedItems = order?.items.map((item) => {
    const product = products?.find((p) => p.id === Number(item.productId));
    return {
      ...item,
      price: product?.price || 0,
      name: product?.name || `#${item.productId}`,
      imageUrl: product?.imageUrl,
      description: product?.description,
    };
  });

  const total = useMemo(() => {
    return enrichedItems?.reduce((sum, it) => sum + it.price * it.quantity, 0);
  }, [enrichedItems]);
  return (
    <div>
      <div className="flex flex-col space-y-2">
        <p>
          {t("orderCode")}: <span className="ml-1 italic">#{order?.id}</span>
        </p>
        <p>
          {t("orderTime")}:{" "}
          <span className="ml-1 italic">
            {formatShortTime(order?.created_at || "")}
          </span>
        </p>
        <p>
          {t("status")}:{" "}
          {order?.status && <StatusBadge status={order?.status} />}
        </p>
      </div>
      <Table className="my-5">
        <TableHeader>
          <TableRow>
            <TableHead>{t("product")}</TableHead>
            <TableHead className="text-center">{t("price")}</TableHead>
            <TableHead className="text-center">{t("quantity")}</TableHead>
            <TableHead className="text-center">{t("amount")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {enrichedItems &&
            enrichedItems.map((item, index) => (
              <ItemRow key={index} item={item} isEditable={false} />
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3} className="text-right font-medium">
              {t("total")}
            </TableCell>
            <TableCell className="font-bold text-center">
              {total && formatToVND(total)}
            </TableCell>
            <TableCell />
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}

export default OrderDetailTable;
