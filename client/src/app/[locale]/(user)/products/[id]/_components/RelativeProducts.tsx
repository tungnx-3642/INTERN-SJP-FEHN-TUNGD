"use client";
import WineCarousel from "@/components/WineCarousel";
import { useProducts } from "@/hooks";
import { useTranslations } from "next-intl";

function RelativeProducts() {
  const t = useTranslations("RelativeProducts");
  const { data: products } = useProducts();
  return <WineCarousel title={t("similarProducts")} items={products || []} />;
}

export default RelativeProducts;
