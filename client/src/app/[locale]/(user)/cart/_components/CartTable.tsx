"use client";
import { useCart, useAuth } from "@/context";
import { Button } from "@/components/ui/button";
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
import { useProductsList } from "@/hooks";
import { useRouter } from "@/i18n/navigation";
import { routes } from "@/lib/routes";
import { toast } from "sonner";
import CartItemRow from "../../_components/ItemRow";
import { useMemo } from "react";
import { useTranslations } from "next-intl";

function CartTable() {
  const t = useTranslations("CartPage");
  const router = useRouter();
  const { user } = useAuth();
  const { cart, removeAll } = useCart();
  const productIds = cart.items.map((item) => Number(item.productId));
  const { data: products } = useProductsList(productIds);

  const enrichedItems = cart.items.map((cartItem) => {
    const product = products?.find((p) => p.id === Number(cartItem.productId));
    return {
      ...cartItem,
      product: product,
      price: product?.price || 0,
      name: product?.name || `#${cartItem.productId}`,
      imageUrl: product?.imageUrl,
      description: product?.description,
    };
  });

  const total = useMemo(() => {
    return enrichedItems.reduce((sum, it) => sum + it.price * it.quantity, 0);
  }, [enrichedItems]);

  const handleCreateOrder = () => {
    if (!user) {
      toast.error(t("loginRequired"));
      router.push(routes.auth.login);
      return;
    }

    if (!products || products.length === 0) {
      toast.error(t("noProducts"));
      return;
    }

    router.push(routes.checkout);
  };

  if (!cart.items.length) {
    return (
      <div className="w-full text-center py-10 text-muted-foreground">
        {t("emptyCart")}
        <div className="mt-2">
          <Button onClick={() => router.push(routes.products.list)}>
            {t("continueShopping")}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="max-md:text-center">{t("product")}</TableHead>
            <TableHead className="text-center">{t("price")}</TableHead>
            <TableHead className="text-center">{t("quantity")}</TableHead>
            <TableHead className="text-center">{t("subtotal")}</TableHead>
            <TableHead className="text-center">{t("actions")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {enrichedItems.map((item, index) => (
            <CartItemRow key={index} item={item} isEditable />
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3} className="text-right font-medium">
              {t("total")}
            </TableCell>
            <TableCell className="font-bold">{formatToVND(total)}</TableCell>
            <TableCell />
          </TableRow>
        </TableFooter>
      </Table>
      <div className="mt-5 flex gap-5 justify-end">
        <Button onClick={() => router.push(routes.products.list)}>
          {t("continueShopping")}
        </Button>
        <Button onClick={() => removeAll()}>{t("removeAll")}</Button>
        <Button onClick={handleCreateOrder}>{t("placeOrder")}</Button>
      </div>
    </div>
  );
}

export default CartTable;
