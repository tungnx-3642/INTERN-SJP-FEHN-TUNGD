import { Product } from "@/api";
import Image from "next/image";
import { formatToVND } from "@/utlis/formatData";

function WineCard({ product }: { product: Product }) {
  return (
    <div className="bg-background flex flex-col items-center space-y-4 rounded-lg">
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={300}
        height={400}
        className="w-full h-48 object-contain"
      />
      <h1>{product.name}</h1>
      <h2>{formatToVND(product.price)}</h2>
      <button className="py-2 px-4 bg-foreground text-background cursor-pointer hover:bg-amber-500">Add to cart</button>
    </div>
  );
}

export default WineCard;
