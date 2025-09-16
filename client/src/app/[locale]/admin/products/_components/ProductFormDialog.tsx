"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { Product } from "@/api";
import { toast } from "sonner";
import { uploadFile } from "@/api/cloudinary";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCategories, useCreateProduct, useUpdateProduct } from "@/hooks";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import ImageDropZone from "@/components/ImageDropZone";

const productSchema = z.object({
  name: z.string().min(1, "Tên sản phẩm không được để trống"),
  description: z.string().optional(),
  price: z.coerce.number().min(1, "Giá phải lớn hơn 0"),
  madeYear: z.coerce.number().min(1900).max(new Date().getFullYear()),
  made_from: z.string().optional(),
  subcategoryId: z.number(),
  imageFile: z.any().optional(),
});

export type ProductFormValues = z.input<typeof productSchema>;

interface ProductDialogFormProps {
  open: boolean;
  onClose: () => void;
  product?: Product;
}

export function ProductDialogForm({
  open,
  onClose,
  product,
}: ProductDialogFormProps) {
  const { data: categories } = useCategories();
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: product
      ? {
          name: product.name,
          description: product.description,
          price: product.price,
          madeYear: product.madeYear,
          made_from: product.made_from,
          subcategoryId: product.subcategoryId,
        }
      : {
          name: "",
          description: "",
          price: 0,
          madeYear: new Date().getFullYear(),
          made_from: "",
          subcategoryId: undefined,
          imageFile: undefined,
        },
  });
  const [isSubmiting, setIsSummiting] = useState(false);
  const queryClient = useQueryClient();
  const { mutate: createPorduct } = useCreateProduct({
    onSuccess: () => {
      toast.success("Tạo sản phẩm mới thành công");
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
  const { mutate: updateProduct } = useUpdateProduct({
    onSuccess: () => {
      toast.success("Cập nhật sản phẩm mới thành công");
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });

  const onSubmit = async (data: ProductFormValues) => {
    try {
      setIsSummiting(true);
      let imageUrl = product?.imageUrl || "";
      if (data.imageFile) {
        console.log(data.imageFile)
        const uploadedUrl = await uploadFile(data.imageFile);
        if (!uploadedUrl) {
          toast.error("Upload ảnh thất bại");
          setIsSummiting(false);
          return;
        }
        imageUrl = uploadedUrl;
      }

      if (product) {
        updateProduct({
          id: product.id,
          data: {
            name: data.name,
            description: data.description || "",
            price: Number(data.price),
            imageUrl,
            madeYear: Number(data.madeYear),
            made_from: data.made_from || "",
            created_at: product.created_at,
            subcategoryId: data.subcategoryId,
          },
        });
      } else {
        createPorduct({
          name: data.name,
          description: data.description || "",
          price: Number(data.price),
          imageUrl,
          madeYear: Number(data.madeYear),
          made_from: data.made_from || "",
          subcategoryId: data.subcategoryId,
        });
      }

      setIsSummiting(false);
      onClose();
    } catch (err: any) {
      toast.error("Có lỗi xảy ra khi lưu sản phẩm", {
        description: err.message,
      });
      setIsSummiting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-4xl">
        <DialogHeader>
          <DialogTitle>
            {product ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên sản phẩm</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập tên sản phẩm" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Nhập mô tả sản phẩm" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Giá (VNĐ)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Nhập mô tả sản phẩm"
                      {...field}
                      value={String(field.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="madeYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Năm sản xuất</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      value={String(field.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="made_from"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nguồn gốc</FormLabel>
                  <FormControl>
                    <Input placeholder="Nguồn gốc" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subcategoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chọn loại rượu</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    value={field.value ? String(field.value) : undefined}
                  >
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="Sản phẩm thuộc loại.." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories?.map((category) => (
                        <SelectGroup key={category.id}>
                          <SelectLabel>{category.name}</SelectLabel>
                          {category.subcategories?.map((subcategory) => (
                            <SelectItem
                              key={subcategory.id}
                              value={subcategory.id.toString()}
                            >
                              {subcategory.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageFile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hình ảnh</FormLabel>
                  <FormControl>
                    <ImageDropZone
                      value={field.value}
                      onChange={(file) => field.onChange(file)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Hủy
              </Button>
              <Button type="submit" disabled={isSubmiting}>
                {isSubmiting && <Spinner />}
                {product ? "Cập nhật" : "Tạo mới"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
