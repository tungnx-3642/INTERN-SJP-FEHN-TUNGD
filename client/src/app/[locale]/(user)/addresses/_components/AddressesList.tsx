"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Image from "next/image";
import {
  useAddressesByUser,
  useCreateAddress,
  useDeleteAddress,
  useUpdateAddress,
} from "@/hooks/useAddress";
import { useAuth } from "@/context";
import AddressCard from "./AddressCard";
import AddressForm from "./AddressForm";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Address } from "@/api";
import { useTranslations } from "next-intl";

function AddressesList() {
  const t = useTranslations("AddressesPage");
  const { user } = useAuth();
  const { data: addresses } = useAddressesByUser(user?.id);
  const { mutate: deleteAddress } = useDeleteAddress();
  const queryClient = useQueryClient();

  const [addAddress, setAddAddress] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const { mutate: createAddress } = useCreateAddress({
    onSuccess: () => {
      toast.success(t("createSuccess"));
      queryClient.invalidateQueries({
        queryKey: ["addressesByUser", user?.id],
      });
    },
    onError: (err) => {
      toast.error(t("createError"), { description: err.message });
    },
  });
  const { mutate: updateAddress } = useUpdateAddress({
    onSuccess: () => {
      toast.success(t("updateSuccess"));
      queryClient.invalidateQueries({
        queryKey: ["addressesByUser", user?.id],
      });
    },
    onError: (err) => {
      toast.error(t("updateError"), { description: err.message });
    },
  });

  const handleDelete = (id: number) => {
    deleteAddress(id, {
      onSuccess: () => {
        toast.success(t("deleteSuccess"));
        queryClient.invalidateQueries({
          queryKey: ["addressesByUser", user?.id],
        });
      },
      onError: () => {
        toast.error(t("deleteError"));
      },
    });
  };

  const handleSave = (values: any, id?: number) => {
    if (id) {
      updateAddress({ id, data: values });
    } else {
      createAddress(values);
    }
    setAddAddress(false);
    setEditingAddress(null);
  };

  return (
    <div>
      <div className="mt-5">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl uppercase">{t("title")}</h1>
          <Button
            variant="link"
            className="text-lg"
            onClick={() => setAddAddress(true)}
          >
            <Plus />
            {t("addAddress")}
          </Button>
        </div>
        <Image
          src="/titleleft-dark.png"
          alt="title-left"
          width={600}
          height={100}
          className="w-20 h-1.5 mt-4 mb-6"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {addAddress && (
          <AddressForm
            address={null}
            onCancel={() => setAddAddress(false)}
            onSubmitForm={handleSave}
          />
        )}

        {addresses && addresses.length > 0
          ? addresses.map((address) =>
              editingAddress?.id === address.id ? (
                <AddressForm
                  key={address.id}
                  address={address}
                  onCancel={() => setEditingAddress(null)}
                  onSubmitForm={handleSave}
                />
              ) : (
                <AddressCard
                  key={address.id}
                  address={address}
                  onEdit={() => setEditingAddress(address)}
                  onDelete={() => handleDelete(address.id!)}
                />
              )
            )
          : !addAddress && (
              <p className="col-span-full text-center text-gray-500 text-lg">
                {t("noAddresses")}
              </p>
            )}
      </div>
    </div>
  );
}

export default AddressesList;
