import { Metadata } from "next";
import { DynamicBreadcrumb } from "../../_components/DynamicBreadcrumb";
import ProductSection from "./_components/ProductSection";
import RelativeProducts from "./_components/RelativeProducts";
import { routes } from "@/lib/routes";
import { productApi } from "@/api";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await productApi.getById(Number(id));

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
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
  const product = await productApi.getById(Number(id));

  if (!product) {
    return (
      <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1>Product Not Found</h1>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: "Trang chủ", href: routes.home },
    { label: "Sản phẩm", href: routes.products.list },
    { label: product.name, href: routes.products.detail(product.id) },
  ];

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <DynamicBreadcrumb items={breadcrumbItems} />
      <ProductSection product={product} />
      <RelativeProducts />
    </div>
  );
}
