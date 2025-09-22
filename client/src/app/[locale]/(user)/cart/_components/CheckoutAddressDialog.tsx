"use client";

import { useEffect, useMemo, useState } from "react";
import { useAddressesByUser } from "@/hooks/useAddress";
import { useAuth, useCart } from "@/context";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Address } from "@/api";
import { Order, OrderItem, OrderStatus } from "@/api/orderApi";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import CheckoutAddressForm from "./CheckoutAddressForm";
import { toast } from "sonner";
import { useCreateOrder } from "@/hooks";

interface CheckoutAddressDialogProps {
  open: boolean;
  onClose: () => void;
  items: OrderItem[];
}

function CheckoutAddressDialog({
  open,
  onClose,
  items,
}: CheckoutAddressDialogProps) {
  const t = useTranslations("CartPage");
  const router = useRouter();
  const { user } = useAuth();
  const { cart } = useCart();
  const { data: addresses } = useAddressesByUser(user?.id);
  const { mutateAsync: createOrder } = useCreateOrder();

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selectedAddress =
    addresses?.find((a: Address) => a.id === selectedId) ?? null;

  const total = useMemo(() => {
    return items.reduce((sum, it) => sum + it.price! * it.quantity, 0);
  }, [items]);

  const handleSubmitForm = async (values: Address) => {
    const orderData: Order = {
      userId: user?.id!,
      items: cart.items,
      total: total,
      status: OrderStatus.Pending,
      firstName: values?.firstName,
      lastName: values?.lastName,
      address: values?.address,
      city: values?.city,
      nationality: values?.nationality,
      zipCode: values?.zipCode,
      phone: values?.phone,
    };
    const jsonReq = await createOrder(orderData);


    if (!jsonReq.id) {
      toast.error("Tạo đơn không thành công");
      return;
    }

    const res = await fetch("/api/checkout_cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: items,
        createdOrder: {
          id: jsonReq.id,
          address: jsonReq.address,
          city: jsonReq.city,
          name: `${jsonReq.lastName} ${jsonReq.firstName}`,
        },
      }),
    });

    if (!res.ok) toast.error("Checkout failed");

    const result = await res.json();

    if (result?.url) {
      router.push(result.url);
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>{t("shippingInfo")}</DialogTitle>
        </DialogHeader>

        <div className="mb-4">
          <label className="text-sm font-medium">{t("selectAddress")}</label>
          <Select
            onValueChange={(val) => setSelectedId(Number(val))}
            value={selectedId?.toString() || ""}
          >
            <SelectTrigger id="address-select" className="w-full mt-1">
              <SelectValue placeholder={t("selectAddress")} />
            </SelectTrigger>
            <SelectContent>
              {addresses?.map((addr: Address) => (
                <SelectItem key={addr.id} value={addr.id?.toString() || ""}>
                  {addr.firstName} {addr.lastName} — {addr.city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <CheckoutAddressForm
          address={selectedAddress}
          onCancel={onClose}
          onSubmitForm={handleSubmitForm}
        />
      </DialogContent>
    </Dialog>
  );
}

export default CheckoutAddressDialog;
