"use client";
import { Product } from "@/api";
import Image from "next/image";
import { formatToVND } from "@/utlis/formatData";
import { Heart, ChartNoAxesColumn } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { useAuth, useCart } from "@/context";
import { toast } from "sonner";

function HorizonalWineCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { like, dislike, getFavorites, user } = useAuth();

  const isFavorites = getFavorites().includes(product.id);

  const handleAddToCart = () => {
    try {
      addItem({ productId: product.id, quantity: 1 });
      toast.success("Đã thêm sản phẩm vào giỏ hàng");
    } catch {
      toast.error("Không thể được sản phẩm vào giỏ hàng");
    }
  };

  const handleToggleFavorite = () => {
    if (!user) {
      toast.error("Cần đăng nhập để thích sản phẩm");
      return;
    }
    if (isFavorites) {
      dislike(product.id);
      toast("Đã bỏ khỏi danh sách yêu thích");
    } else {
      like(product.id);
      toast.success("Đã thêm vào danh sách yêu thích");
    }
  };

  return (
    <div className="flex max-md:flex-col border-b border-gray-300 py-2">
      <div className="w-full md:w-1/4 mr-4 py-2">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={300}
          height={400}
          className="w-30 h-48 object-contain dark:bg-white mx-auto"
        />
      </div>
      <div>
        <Link
          href={`/products/${product.id}`}
          className="text-2xl uppercase mb-2"
        >
          {product.name}
        </Link>
        <h2 className="text-3xl text-yellow-400 mb-4">
          {formatToVND(product.price)}
        </h2>
        <p className="mb-2">{product.description}</p>
        <div className="flex items-center">
          <Button
            className="py-2 px-4 rounded-none bg-foreground text-background cursor-pointer hover:bg-amber-500"
            onClick={handleAddToCart}
          >
            Add to cart
          </Button>
          <Button
            variant="ghost"
            className="flex items-center ml-4 gap-1"
            onClick={handleToggleFavorite}
          >
            <Heart className={isFavorites ? "fill-red-500 text-red-500" : ""} />
            {isFavorites ? "Đã yêu thích" : "Yêu thích"}
          </Button>
          <Button variant="ghost" className="flex items-center ml-4 gap-1">
            <ChartNoAxesColumn />
            So sánh
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HorizonalWineCard;
