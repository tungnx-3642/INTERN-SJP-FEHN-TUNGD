"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil, Trash } from "lucide-react";
import { useProduct } from "@/hooks";
import { formatToVND } from "@/utlis/formatData";
import ReviewCard from "@/components/card/reviewCard";

export default function AdminProductDetail({
  productId,
}: {
  productId: number;
}) {
  const { data: product, isLoading, error } = useProduct(productId);

  if (isLoading) {
    return <p className="p-6">Loading product...</p>;
  }

  if (error || !product) {
    return <p className="p-6 text-red-500">Product not found.</p>;
  }

  return (
    <div className="p-6 space-x-6 flex justify-between gap-7">
      <Card className="flex gap-6 p-6 w-1/2">
        <div className="w-full h-80 relative">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-contain rounded-xl"
          />
        </div>
        <div className="flex-1 space-y-3">
          <CardHeader className="p-0">
            <CardTitle className="text-2xl font-bold">{product.name}</CardTitle>
          </CardHeader>
          <CardContent className="p-0 space-y-2">
            <p className="text-gray-600">{product.description}</p>
            <p>
              <span className="font-medium">Năm sản xuất: </span>
              {product.madeYear}
            </p>
            <p>
              <span className="font-medium">Nguồn gốc: </span>
              {product.made_from}
            </p>
            <p className="text-xl font-semibold text-red-600">
              {formatToVND(product.price)}
            </p>
          </CardContent>
          <div className="flex gap-3">
            <Button variant="default">
              <Pencil />
              Chỉnh sửa
            </Button>
            <Button variant="destructive">
              <Trash />
              Xóa
            </Button>
          </div>
        </div>
      </Card>

      <Card className="w-1/2">
        <CardHeader>
          <CardTitle>Đánh giá sản phẩm</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {product.reviews?.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
