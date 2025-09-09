"use client";

import { useMemo, useState } from "react";
import { useAuth, useCart } from "@/context";
import { useCreateOrder, useProductsList } from "@/hooks";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { TicketPercent } from "lucide-react";
import { formatToVND } from "@/utlis/formatData";
import { Order, OrderStatus } from "@/api/orderApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { routes } from "@/lib/routes";

function ReviewCart({ selectedId }: { selectedId: number | null }) {
  const router = useRouter();
  const { user } = useAuth();
  const { cart, removeAll } = useCart();
  const productIds = cart.items.map((item) => Number(item.productId));
  const { data: products } = useProductsList(productIds);
  const { mutate: createOrder } = useCreateOrder({
    onSuccess: () => {
      toast.success("Đặt hàng thành công!");
      removeAll();
      router.push(routes.products.list);
    },
    onError: (error) => {
      toast.error("Có lỗi xảy ra khi đặt hàng: " + error.message);
    },
  });

  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);

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

  const subtotal = useMemo(
    () =>
      enrichedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [enrichedItems]
  );

  const shippingFee = subtotal > 0 ? 5000 : 0;
  const discount = appliedDiscount;
  const total = subtotal + shippingFee - discount;

  const handleApplyDiscount = () => {
    if (discountCode.trim().toUpperCase() === "SAVE10") {
      setAppliedDiscount(subtotal * 0.1);
    } else {
      setAppliedDiscount(0);
    }
  };

  const handleCreateOrder = () => {
    if (!user) {
      toast.error("Đặt đơn không thành công");
      router.push(routes.auth.login);
      return;
    }
    if(!selectedId) {
      toast.error("Chưa chọn địa chỉ")
      return;
    }

    const orderData: Order = {
      userId: user.id,
      addressId: selectedId,
      items: cart.items,
      total: total,
      status: OrderStatus.Pending,
    };
    createOrder(orderData);
  };

  return (
    <div className="w-full lg:w-1/2 mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Đơn hàng</h1>

      <Card className="border-none shadow-none">
        <CardHeader>
          <CardTitle>Danh sách Sản phẩm</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {enrichedItems.map((item) => (
            <div
              key={item.productId}
              className="flex items-center gap-4 border-b pb-4 last:border-none last:pb-0"
            >
              {item.imageUrl && (
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="w-20 h-30 object-contain"
                />
              )}
              <div>
                <h2 className="font-medium">{item.name}</h2>
                <p className="mt-1 text-sm">
                  x <span className="font-medium">{item.quantity}</span>
                </p>
                <p className="font-bold mt-auto">
                  {formatToVND(item.price * item.quantity)}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      <Separator />
      <Card className="border-none shadow-none py-0 gap-2">
        <CardHeader>
          <CardTitle>Discount Code</CardTitle>
        </CardHeader>
        <CardContent className="flex max-md:flex-col gap-2">
          <Input
            placeholder="Discount code"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
          />
          <Button onClick={handleApplyDiscount}>
            <TicketPercent />
            Apply
          </Button>
        </CardContent>
      </Card>
      <Card className="border-none shadow-none">
        <CardContent className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{formatToVND(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{formatToVND(shippingFee)}</span>
          </div>
          <div className="flex justify-between">
            <span>Discount</span>
            <span className="text-green-600">-{formatToVND(discount)}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-semibold text-base">
            <span>Total</span>
            <span>{formatToVND(total)}</span>
          </div>
          <Button className="w-full mt-4" disabled={selectedId == null} onClick={handleCreateOrder}>
            Pay Now
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default ReviewCart;
