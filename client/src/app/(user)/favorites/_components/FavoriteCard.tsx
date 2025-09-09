"use client";
import { Product } from "@/api";
import Image from "next/image";
import { formatToVND } from "@/utlis/formatData";
import Link from "next/link";
import { useAuth, useCart } from "@/context";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { routes } from "@/lib/routes";
import { X } from "lucide-react";

function FavoriteCard({ product }: { product: Product }) {
  const { dislike } = useAuth();
  const { addItem } = useCart();

  const handleAddToCart = () => {
    try {
      addItem({ productId: product.id, quantity: 1 });
      toast.success("Đã thêm sản phẩm vào giỏ hàng");
    } catch {
      toast.error("Không thể được sản phẩm vào giỏ hàng");
    }
  };

  return (
    <div className="bg-background flex flex-col items-center space-y-4 py-2 rounded-lg">
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={300}
        height={400}
        className="w-full h-48 object-contain"
      />
      <Link
        href={routes.products.detail(product.id)}
        className="hover:underline text-center"
      >
        {product.name}
      </Link>
      <h2>{formatToVND(product.price)}</h2>
      <div className="flex gap-3 items-center">
        <Button
          onClick={handleAddToCart}
          className="cursor-pointer hover:bg-amber-500"
        >
          Add to cart
        </Button>
        <Button
          onClick={() => dislike(product.id)}
          variant="ghost"
        >
          <X />
          Bỏ yêu thích
        </Button>
      </div>
    </div>
  );
}

export default FavoriteCard;
