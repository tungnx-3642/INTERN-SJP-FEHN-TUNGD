'use client';
import WineCarousel from "@/components/WineCarousel";
import { useProducts } from "@/hooks";

function RelativeProducts() {
  const {data: products} = useProducts();
  return ( <WineCarousel title="Sản phẩm tương tự" items={products || []} /> );
}

export default RelativeProducts;
