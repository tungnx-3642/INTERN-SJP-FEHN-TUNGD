import React from "react";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { routes } from "@/lib/routes";
import { Category } from "@/api";

export function CategoriesList({
  categories,
  selectedCategoryId,
}: {
  categories: Category[];
  selectedCategoryId?: string | null;
}) {
  if (!categories || categories.length === 0) {
    return <p>Loading categories...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl uppercase tracking-wider">Danh mục sản phẩm</h1>
      <Image
        src="/titleleft-dark.png"
        alt="title-left"
        width={600}
        height={100}
        className="w-20 h-1.5 mt-2 mb-6"
      />

      <div className="space-y-2">
        {categories.map((category) => (
          <div key={category.id}>
            <h1 className="font-semibold mb-2 uppercase tracking-wide">
              {category.name}
            </h1>
            {category.subcategories && category.subcategories.length > 0 && (
              <ul className="mt-1 ml-4 space-y-1 font-normal">
                {category.subcategories.map((subcategory) => (
                  <li
                    key={subcategory.id}
                    className={cn(
                      "cursor-pointer hover:underline flex justify-between",
                      selectedCategoryId === String(subcategory.id) &&
                        "text-yellow-400 font-semibold"
                    )}
                  >
                    <Link
                      href={{
                        pathname: routes.products.list,
                        query: { categoryId: subcategory.id },
                      }}
                    >
                      {subcategory.name}
                    </Link>
                    {selectedCategoryId === String(subcategory.id) && (
                      <Link href={routes.products.list}>
                        <X size={20} />
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
