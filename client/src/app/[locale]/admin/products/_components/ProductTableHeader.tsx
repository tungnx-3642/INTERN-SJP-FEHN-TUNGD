"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter, Search, Box, Check, Plus } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatToVND } from "@/utlis/formatData";
import { ProductDialogForm } from "./ProductFormDialog";
import { useTranslations } from "next-intl";

interface ProductTableHeaderProps {
  total: number;
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
  onSubmitFilter: (
    price: [number, number],
    year: string,
    category: string
  ) => void;
}

export function ProductTableHeader({
  total,
  globalFilter,
  setGlobalFilter,
  onSubmitFilter,
}: ProductTableHeaderProps) {
  const t = useTranslations("AdminProducts");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [openDialog, setopenDialog] = useState(false);
  const [price, setPrice] = useState<[number, number]>([0, 4000]);
  const [year, setYear] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  const handleSubmit = () => {
    onSubmitFilter(price, year, category);
    setIsFilterOpen(false);
  };

  return (
    <Collapsible open={isFilterOpen} onOpenChange={setIsFilterOpen}>
      <Card className="shadow-none rounded-b-none py-5">
        <CardContent className="flex flex-col gap-4">
          <div className="flex gap-4 items-center">
            <div>
              <p className="text-gray-500 dark:text-gray-300">
                {t("totalProducts")}
              </p>
              <p className="text-2xl flex gap-1 items-center text-gray-700 dark:text-white">
                {total}
                <Box />
              </p>
            </div>
            <div className="ml-auto flex gap-3">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t("searchPlaceholder")}
                  value={globalFilter}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                  className="pl-8"
                />
              </div>
              <CollapsibleTrigger asChild>
                <Button
                  variant={isFilterOpen ? "default" : "ghost"}
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                  <Filter />
                  {t("filter")}
                </Button>
              </CollapsibleTrigger>
              <Button className="ml-auto" onClick={() => setopenDialog(true)}>
                <Plus className="mr-2 h-4 w-4" /> {t("addProduct")}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <CollapsibleContent>
        <div className="p-4 border rounded-b-lg bg-gray-50 flex gap-5">
          <div className="flex gap-2 items-center">
            <p className="text-sm font-medium text-gray-600 w-40">
              {t("priceRange")}
            </p>
            <Slider
              value={price}
              onValueChange={(val) => setPrice(val as [number, number])}
              max={4000}
              step={10}
              className="w-full"
            />
            <p className="text-sm text-gray-500 w-80">
              {formatToVND(price[0] * 1000)} - {formatToVND(price[1] * 1000)}
            </p>
          </div>

          <div className="flex gap-2 items-center">
            <p className="text-sm font-medium text-gray-600">{t("year")}</p>
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger>
                <SelectValue placeholder={t("chooseYear")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="before2000">{t("before2000")}</SelectItem>
                <SelectItem value="before2010">{t("before2010")}</SelectItem>
                <SelectItem value="before2020">{t("before2020")}</SelectItem>
                <SelectItem value="recent">{t("recent")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 items-center">
            <p className="text-sm font-medium text-gray-600">{t("category")}</p>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder={t("chooseCategory")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">{t("wine")}</SelectItem>
                <SelectItem value="2">{t("strongLiquor")}</SelectItem>
                <SelectItem value="3">{t("other")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button className="ml-auto" onClick={handleSubmit}>
            <Check className="mr-2 h-4 w-4" /> {t("apply")}
          </Button>
        </div>
      </CollapsibleContent>
      <ProductDialogForm
        open={openDialog}
        onClose={() => setopenDialog(false)}
      />
    </Collapsible>
  );
}
