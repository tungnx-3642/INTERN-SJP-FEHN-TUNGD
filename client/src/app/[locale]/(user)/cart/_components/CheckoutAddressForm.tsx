"use client";

import { useEffect } from "react";
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
import { useTranslations } from "next-intl";

interface CheckoutAddressFormProps {
  address: Address | null;
  onCancel: () => void;
  onSubmitForm: (values: Address) => void;
}

export default function CheckoutAddressForm({
  address,
  onCancel,
  onSubmitForm,
}: CheckoutAddressFormProps) {
  const t = useTranslations("CartPage");

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
    defaultValues: {
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      nationality: "",
      zipCode: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (address) {
      form.reset({
        firstName: address.firstName,
        lastName: address.lastName,
        address: address.address,
        city: address.city,
        nationality: address.nationality,
        zipCode: address.zipCode,
        phone: address.phone,
      });
    } else {
      form.reset({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        nationality: "",
        zipCode: "",
        phone: "",
      });
    }
  }, [address, form]);

  const handleSubmit = (values: FormValues) => {
    onSubmitForm(values as Address);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>{t("firstName")}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>{t("lastName")}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("address")}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>{t("city")}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="zipCode"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>{t("zipCode")}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="nationality"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("nationality")}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("phone")}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="pt-4 flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            {t("cancel")}
          </Button>
          <Button type="submit">{t("placeOrder")}</Button>
        </div>
      </form>
    </Form>
  );
}
