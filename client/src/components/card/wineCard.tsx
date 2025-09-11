"use client";
import { Product } from "@/api";
import Image from "next/image";
import { formatToVND } from "@/utlis/formatData";
import Link from "next/link";
import { useCart } from "@/context";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { routes } from "@/lib/routes";

function WineCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    try {
      addItem({productId: product.id, quantity: 1});
      toast.success("Đã thêm sản phẩm vào giỏ hàng")
    } catch {
      toast.error("Không thể được sản phẩm vào giỏ hàng")
    }
  }

  return (
    <div className="bg-background flex flex-col items-center space-y-4 py-2 rounded-lg">
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={300}
        height={400}
        className="w-30 h-48 object-contain dark:bg-white"
      />
      <Link href={routes.products.detail(product.id)} className="hover:underline text-center line-clamp-1">
        {product.name}
      </Link>
      <h2>{formatToVND(product.price)}</h2>
      <Button
        onClick={handleAddToCart}
        className="rounded-none cursor-pointer hover:bg-amber-500"
      >
        Add to cart
      </Button>
    </div>
  );
}

export default WineCard;
