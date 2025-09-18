import { Metadata } from "next";
import ProductSection from "./_components/ProductSection";
import RelativeProducts from "./_components/RelativeProducts";
import { productApi } from "@/api";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}): Promise<Metadata> {
  const { id, locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const product = await productApi.getById(Number(id));

  if (!product) {
    return {
      title: t("productNotFound"),
      description: t("productNotFoundDesc"),
      openGraph: { images: [] },
    };
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: { images: [product.imageUrl] },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ProductSection productId={Number(id)} />
      <RelativeProducts />
    </div>
  );
}
