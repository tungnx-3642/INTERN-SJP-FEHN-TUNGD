"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Product } from "@/api/productApi";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { formatToVND } from "@/utlis/formatData";
import Link from "next/link";
import { routes } from "@/lib/routes";
import { ProductActions } from "./ProductActions";

export const productColumns: ColumnDef<Product>[] = [
  {
    id: "stt",
    header: "STT",
    cell: ({ row }) => (
      <div className="text-center w-full">{row.index + 1}</div>
    ),
  },
  {
    accessorKey: "product",
    header: "Sản phẩm",
    maxSize: 60,
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="flex items-center gap-3 max-w-96">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={60}
            height={60}
            className="rounded-md h-20 w-16 object-contain dark:bg-white"
          />
          <div className="flex-1 min-w-0">
            <Link
              href={routes.admin.products.detail(product.id)}
              className="font-medium truncate hover:underline"
            >
              {product.name}
            </Link>
            <p className="text-xs text-muted-foreground line-clamp-1 text-wrap">
              {product.description}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    header: "Loại",
    maxSize: 60,
    cell: ({ row }) => {
      const subcategory = row.original.subcategory;
      return <div className="flex items-center">{subcategory?.name}</div>;
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="w-full"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Giá
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const price = row.original.price;
      return <div className="text-center">{formatToVND(price)}</div>;
    },
  },
  {
    accessorKey: "madeYear",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="w-full"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Năm sản xuất
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-center">{row.original.madeYear}</div>
    ),
  },
  {
    accessorKey: "made_from",
    header: "Nguồn gốc",
    cell: ({ row }) => (
      <div className="text-xs max-w-52 text-wrap">{row.original.made_from}</div>
    ),
  },
  {
    id: "actions",
     cell: ({ row }) => <ProductActions product={row.original} />,
  },
];
