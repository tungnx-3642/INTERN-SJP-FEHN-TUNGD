'use client'
import { Product } from "@/api";
import { useDeleteProduct } from "@/hooks";
import { useQueryClient } from "@tanstack/react-query";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Trash, Pencil, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import { ProductDialogForm } from "../ProductFormDialog";
import { useState } from "react";
import { useTranslations } from "next-intl";


export function ProductActions({ product }: { product: Product }) {
  const t = useTranslations("AdminProducts")
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false)
  const { mutate: deleteProduct } = useDeleteProduct({
    onSuccess: () => {
      toast.success("Xóa sản phẩm thành công")
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setDialogOpen(true)}>
          <Pencil />
          {t("edit")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => deleteProduct(product.id)}>
          <Trash />
          {t("delete")}
        </DropdownMenuItem>
      </DropdownMenuContent>
      <ProductDialogForm key={product.id} open={dialogOpen} onClose={() => setDialogOpen(false)} product={product} />
    </DropdownMenu>
  );
}
