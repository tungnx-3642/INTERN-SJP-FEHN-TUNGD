"use client";

import { useCategories } from "@/hooks";
import CategoryCard from "./CategoryCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ManageCategories() {
  const t = useTranslations("AdminCategories");
  const { data: categories, isLoading } = useCategories();

  if (isLoading) return <div>{t("loading")}</div>;

  return (
    <div className="max-w-10/12 p-6 mx-auto">
      <div className="flex items-center mb-4">
        <h1 className="text-xl font-bold flex-1">{t("manageCategories")}</h1>
        <Button>
          <Plus className="w-4 h-4 mr-2" /> {t("addCategory")}
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories?.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
