import { Product } from "@/api";
import Image from "next/image";
import { formatToVND } from "@/utlis/formatData";
import { Heart, ChartNoAxesColumn } from 'lucide-react';
import Link from "next/link";
import { Button } from "../ui/button";

function HorizonalWineCard({ product }: { product: Product }) {
  return (
    <div className="flex border-b border-gray-300 py-2">
      <div className="w-1/4 mr-4">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={300}
          height={400}
          className="w-full h-48 object-contain"
        />
      </div>
      <div>
        <Link href={`/products/${product.id}`} className="text-2xl uppercase mb-2">{product.name}</Link>
        <h2 className="text-3xl text-yellow-400 mb-4">{formatToVND(product.price)}</h2>
        <p className="mb-2">{product.description}</p>
        <div className="flex items-center">
        <Button className="py-2 px-4 rounded-none bg-foreground text-background cursor-pointer hover:bg-amber-500">
          Add to cart
        </Button>
        <Button variant='ghost' className="flex items-center ml-4 gap-1">
          <Heart />
          Yêu thích
        </Button>
        <Button variant='ghost' className="flex items-center ml-4 gap-1">
          <ChartNoAxesColumn />
          So sánh
        </Button>
        </div>
      </div>
    </div>
  );
}

export default HorizonalWineCard;
