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

const schema = z.object({
  firstName: z.string().min(1, "Tên không được để trống"),
  lastName: z.string().min(1, "Họ không được để trống"),
  address: z.string().min(1, "Địa chỉ không được để trống"),
  city: z.string().min(1, "Thành phố không được để trống"),
  nationality: z.string().min(1, "Quốc tịch không được để trống"),
  zipCode: z
    .string()
    .min(1, "Zip code không được để trống")
    .regex(/^\d{4,10}$/, "Zip code phải là số từ 4 đến 10 ký tự"),
  phone: z
    .string()
    .min(1, "Số điện thoại không được để trống")
    .regex(/^0\d{9,10}$/, "Sai định dạng số điện thoại"),
});

type FormValues = z.infer<typeof schema>;

export default function AddressForm({
  address,
  onCancel,
  onSubmitForm,
}: {
  address: Address | null;
  onCancel: () => void;
  onSubmitForm: (values: Address, id?: number) => void;
}) {
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
              <FormLabel className="w-32">Tên</FormLabel>
              <div className="flex-1 w-full">
                <FormControl>
                  <Input {...field} placeholder="Nhập tên" />
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
              <FormLabel className="w-32">Họ và tên đệm</FormLabel>
              <div className="flex-1 w-full">
                <FormControl>
                  <Input {...field} placeholder="Nhập họ" />
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
              <FormLabel className="w-32">Địa chỉ</FormLabel>
              <div className="flex-1 w-full">
                <FormControl>
                  <Input {...field} placeholder="Nhập địa chỉ" />
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
              <FormLabel className="w-32">Thành phố</FormLabel>
              <div className="flex-1 w-full">
                <FormControl>
                  <Input {...field} placeholder="Nhập thành phố" />
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
              <FormLabel className="w-32">Quốc tịch</FormLabel>
              <div className="flex-1 w-full">
                <FormControl>
                  <Input {...field} placeholder="Nhập quốc tịch" />
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
              <FormLabel className="w-32">Zip code</FormLabel>
              <div className="flex-1 w-full">
                <FormControl>
                  <Input {...field} placeholder="Nhập zip code" />
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
              <FormLabel className="w-32">Số điện thoại</FormLabel>
              <div className="flex-1 w-full">
                <FormControl>
                  <Input {...field} placeholder="Nhập số điện thoại" />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <div className="flex gap-2 mt-4 justify-end">
          <Button type="submit">
            {address ? "Cập nhật địa chỉ" : "Thêm địa chỉ"}
          </Button>
          <Button type="button" variant="ghost" onClick={onCancel}>
            Hủy
          </Button>
        </div>
      </form>
    </Form>
  );
}
