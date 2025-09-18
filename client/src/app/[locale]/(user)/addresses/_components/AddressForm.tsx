"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Address } from "@/api";
import { useAuth } from "@/context";
import { useTranslations } from "next-intl";

export default function AddressForm({
  address,
  onCancel,
  onSubmitForm,
}: {
  address: Address | null;
  onCancel: () => void;
  onSubmitForm: (values: Address, id?: number) => void;
}) {
  const t = useTranslations("AddressesPage");

  const schema = z.object({
    firstName: z.string().min(1, t("firstNameRequired")),
    lastName: z.string().min(1, t("lastNameRequired")),
    address: z.string().min(1, t("addressRequired")),
    city: z.string().min(1, t("cityRequired")),
    nationality: z.string().min(1, t("nationalityRequired")),
    zipCode: z
      .string()
      .min(1, t("zipCodeRequired"))
      .regex(/^\d{4,10}$/, t("zipCodeInvalid")),
    phone: z
      .string()
      .min(1, t("phoneRequired"))
      .regex(/^0\d{9,10}$/, t("phoneInvalid")),
  });

  type FormValues = z.infer<typeof schema>;
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: address
      ? {
          firstName: address.firstName,
          lastName: address.lastName,
          address: address.address,
          city: address.city,
          nationality: address.nationality,
          zipCode: address.zipCode,
          phone: address.phone,
        }
      : {
          firstName: "",
          lastName: "",
          address: "",
          city: "",
          nationality: "",
          zipCode: "",
          phone: "",
        },
  });
  const { user } = useAuth();
  const handleSubmit = (values: FormValues) => {
    if (address?.id) {
      onSubmitForm(values, address.id);
    } else {
      onSubmitForm({ ...values, userid: user?.id }, undefined);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-4 p-4 border rounded-xl text-lg"
      >
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="flex max-md:flex-col items-start">
              <FormLabel className="w-32">{t("firstName")}</FormLabel>
              <div className="flex-1 w-full">
                <FormControl>
                  <Input {...field} placeholder={t("firstNamePlaceholder")} />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem className="flex max-md:flex-col items-start">
              <FormLabel className="w-32">{t("lastName")}</FormLabel>
              <div className="flex-1 w-full">
                <FormControl>
                  <Input {...field} placeholder={t("lastNamePlaceholder")} />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem className="flex max-md:flex-col items-start">
              <FormLabel className="w-32">{t("address")}</FormLabel>
              <div className="flex-1 w-full">
                <FormControl>
                  <Input {...field} placeholder={t("addressPlaceholder")} />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem className="flex max-md:flex-col items-start">
              <FormLabel className="w-32">{t("city")}</FormLabel>
              <div className="flex-1 w-full">
                <FormControl>
                  <Input {...field} placeholder={t("cityPlaceholder")} />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nationality"
          render={({ field }) => (
            <FormItem className="flex max-md:flex-col items-start">
              <FormLabel className="w-32">{t("nationality")}</FormLabel>
              <div className="flex-1 w-full">
                <FormControl>
                  <Input {...field} placeholder={t("nationalityPlaceholder")} />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="zipCode"
          render={({ field }) => (
            <FormItem className="flex max-md:flex-col items-start">
              <FormLabel className="w-32">{t("zipCode")}</FormLabel>
              <div className="flex-1 w-full">
                <FormControl>
                  <Input {...field} placeholder={t("zipCodePlaceholder")} />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="flex max-md:flex-col items-start">
              <FormLabel className="w-32">{t("phone")}</FormLabel>
              <div className="flex-1 w-full">
                <FormControl>
                  <Input {...field} placeholder={t("phonePlaceholder")} />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <div className="flex gap-2 mt-4 justify-end">
          <Button type="submit">
            {address ? t("updateAddress") : t("addAddress")}
          </Button>
          <Button type="button" variant="ghost" onClick={onCancel}>
            {t("cancel")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
