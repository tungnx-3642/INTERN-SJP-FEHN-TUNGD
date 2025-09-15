"use client";

import Image from "next/image";
import { useCategories } from "@/hooks";
import { Grid3x3, Rows3 } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { CustomPagination } from "@/components/CustomPagination";
import { useProductByCategory, useProducts } from "@/hooks";
import type { Product } from "@/api";
import WineCard from "@/components/card/wineCard";
import HorizonalWineCard from "@/components/card/horizonalWineCard";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DynamicBreadcrumb } from "../../_components/DynamicBreadcrumb";
import { CategoriesList } from "./CategoriesList";
import { useTranslations } from "next-intl";

export default function ProductsPage() {
  const t = useTranslations("ProductsPage");
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  const query = searchParams.get("q");
  const { data: categories } = useCategories();
  const isCategorySelected = !!categoryId;
  const { data: allProducts } = useProducts({ enabled: !isCategorySelected });
  const { data: categoryProducts } = useProductByCategory(Number(categoryId), {
    enabled: isCategorySelected,
  });

  function filterProductsByKeyword(products: Product[], keyword: string | null) {
    if (!keyword) return products;
    const lowerKeyword = keyword.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(lowerKeyword) ||
        (p.description && p.description.toLowerCase().includes(lowerKeyword))
    );
  }

  const products: Product[] = filterProductsByKeyword(
    categoryId ? categoryProducts || [] : allProducts || [],
    query
  );

  const [isGridView, setIsGridView] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [categoryId]);

  const breadcrumbItems = [
    { label: t("home"), href: "/" },
    { label: t("products"), href: "/products" },
  ];

  return (
    <div className="max-lg:p-2 my-10 max-w-7xl mx-auto">
      <DynamicBreadcrumb items={breadcrumbItems} />
      <Image
        src="/slide/slide-1.jpg"
        alt={t("banner")}
        width={1200}
        height={200}
        className="w-full h-64 my-8 object-cover"
      />
      <div className="flex max-md:flex-col-reverse max-md:gap-3">
        <div className="max-md:w-full">
          <CategoriesList categories={categories || []} selectedCategoryId={categoryId} />

          <div className="mt-10">
            <h1 className="text-2xl uppercase tracking-wider">{t("compareProducts")}</h1>
            <Image
              src="/titleleft-dark.png"
              alt="title-left"
              width={600}
              height={100}
              className="w-20 h-1.5 mt-2 mb-6"
            />
            <p>{t("noProductsToCompare")}</p>
          </div>

          <div className="mt-10">
            <h1 className="text-2xl uppercase tracking-wider">{t("productTags")}</h1>
            <Image
              src="/titleleft-dark.png"
              alt="title-left"
              width={600}
              height={100}
              className="w-20 h-1.5 mt-2 mb-6"
            />
            <p>{t("noProductsToCompare")}</p>
          </div>

          <Image
            src="/vertical-banner.jpg"
            alt={t("verticalBanner")}
            width={300}
            height={600}
            className="mt-10 max-md:w-full"
          />
        </div>

        <div className="flex-1 md:ml-10">
          <div className="border border-gray-400 p-2 flex justify-between items-center">
            <div className="flex items-center">
              <Button variant="ghost" onClick={() => setIsGridView(true)}>
                <Grid3x3
                  className={cn(
                    "inline cursor-pointer hover:text-yellow-400",
                    isGridView && "text-yellow-400"
                  )}
                />
              </Button>
              <Button variant="ghost" onClick={() => setIsGridView(false)}>
                <Rows3
                  className={cn(
                    "inline cursor-pointer hover:text-yellow-400",
                    !isGridView && "text-yellow-400"
                  )}
                />
              </Button>
            </div>

            <CustomPagination
              total={products.length}
              currentPage={currentPage}
              setPage={setCurrentPage}
              itemsPerPage={itemsPerPage}
              className="justify-end w-auto"
            />
          </div>

          {currentProducts.length ? (
            isGridView ? (
              <div className="mt-6 grid grid-cols-2 lg:grid-cols-3 gap-6">
                {currentProducts.map((product) => (
                  <WineCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="mt-6 space-y-6">
                {currentProducts.map((product) => (
                  <HorizonalWineCard key={product.id} product={product} />
                ))}
              </div>
            )
          ) : (
            <p className="text-center mt-10 italic">{t("noProducts")}</p>
          )}

          <div className="mt-6 flex justify-end">
            <CustomPagination
              total={products.length}
              currentPage={currentPage}
              setPage={setCurrentPage}
              itemsPerPage={itemsPerPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
