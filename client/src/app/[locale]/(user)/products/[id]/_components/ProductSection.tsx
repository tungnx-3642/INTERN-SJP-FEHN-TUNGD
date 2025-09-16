"use client";
import Image from "next/image";
import { formatToVND } from "@/utlis/formatData";
import ReviewSection from "./ReviewSection";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, ChangeEvent } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Heart,
  ChartNoAxesColumn,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import ProductTabs from "./ProductTabs";
import { useAuth, useCart } from "@/context";
import { toast } from "sonner";
import { DynamicBreadcrumb } from "../../../_components/DynamicBreadcrumb";
import { routes } from "@/lib/routes";
import { useProduct } from "@/hooks";
import { useTranslations } from "next-intl";

function ProductSection({ productId }: { productId: number }) {
  const t = useTranslations("ProductSection");
  const { data: product } = useProduct(productId);
  const { like, dislike, getFavorites, user } = useAuth();
  const { addItem } = useCart();

  const colorList = [
    { name: t("red"), value: "#FF0000" },
    { name: t("yellow"), value: "#FFD700" },
    { name: t("black"), value: "#000000" },
    { name: t("white"), value: "#FFFFFF" },
  ];

  const sizesList = [
    { value: "small", label: t("small") },
    { value: "medium", label: t("medium") },
    { value: "large", label: t("large") },
  ];

  const [size, setSize] = useState("medium");
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(colorList[0].value);

  if (!product) {
    return <p>{t("productNotFound")}</p>;
  }

  const isFavorite = getFavorites().includes(product?.id);
  const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = Number(event.target.value);
    if (Number.isNaN(nextValue) || nextValue < 1) {
      setQuantity(1);
      return;
    }
    setQuantity(nextValue);
  };

  const handleAddToCart = () => {
    try {
      addItem({ productId: product.id, quantity: quantity });
      toast.success(t("productAddedToCart"));
    } catch {
      toast.error(t("cannotAddToCart"));
    }
  };

  const handleToggleFavorite = () => {
    if (!user) {
      toast.error(t("loginToLike"));
      return;
    }
    if (isFavorite) {
      dislike(product.id);
      toast(t("removedFromFavorites"));
    } else {
      like(product.id);
      toast.success(t("addedToFavorites"));
    }
  };

  const breadcrumbItems = [
    { label: t("home"), href: routes.home },
    { label: t("products"), href: routes.products.list },
    { label: product.name, href: routes.products.detail(product.id) },
  ];

  return (
    <div>
      <DynamicBreadcrumb items={breadcrumbItems} />
      <div className="flex items-center my-10">
        <div className="w-1/2">
          <div>
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={500}
              height={500}
              className="w-full h-180 object-contain"
            />
          </div>
        </div>
        <div>
          <h1 className="text-4xl uppercase">{product.name}</h1>
          <Image
            src="/titleleft-dark.png"
            alt="title-left"
            width={600}
            height={100}
            className="w-20 h-1.5 mt-2 mb-6"
          />
          <h2 className="text-3xl text-yellow-400 mb-5">
            {formatToVND(product.price)}
          </h2>
          <ReviewSection reviews={product.reviews || []} />

          <div className="flex flex-col gap-2 mt-5 text-gray-500 text-sm">
            <p>
              {t("productionYear")}:{" "}
              <span className="text-yellow-500 ml-1">{product.madeYear}</span>
            </p>
            <p>
              {t("origin")}:{" "}
              <span className="text-yellow-500 ml-1">{product.made_from}</span>
            </p>
          </div>

          <h1 className="uppercase tracking-wide text-2xl text-gray-500 mt-10">
            {t("color")}
          </h1>
          <div className="mb-5">
            <div className="flex gap-3">
              {colorList.map((color) => (
                <Button
                  key={color.value}
                  type="button"
                  className={`w-8 h-8 rounded border-2 transition-all ${
                    selectedColor === color.value
                      ? "border-yellow-500 scale-110"
                      : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color.value }}
                  aria-label={color.name}
                  onClick={() => setSelectedColor(color.value)}
                />
              ))}
            </div>
          </div>
          <h1 className="uppercase tracking-wide text-2xl text-gray-500 mt-10 mb-3">
            {t("size")}
          </h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                {sizesList.find((s) => s.value === size)?.label}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
              <DropdownMenuLabel>{t("size")}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={size} onValueChange={setSize}>
                {sizesList.map((sizeOption) => (
                  <DropdownMenuRadioItem
                    key={sizeOption.value}
                    value={sizeOption.value}
                  >
                    {sizeOption.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <h1 className="uppercase tracking-wide text-2xl text-gray-500 mt-10 mb-3">
            {t("quantity")}
          </h1>

          <div className="flex items-center gap-7 mt-2">
            <div className="flex">
              <Button
                className="px-4 py-2 bg-gray-500 rounded-none hover:bg-yellow-400"
                onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
              >
                <ChevronLeft />
              </Button>
              <Input
                type="number"
                value={quantity}
                className="w-14 no-spinner text-center rounded-none"
                onChange={handleQuantityChange}
              />
              <Button
                className="px-4 py-2 bg-gray-500 rounded-none hover:bg-yellow-400"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                <ChevronRight />
              </Button>
            </div>
            <Button
              className="px=+-4 py-2 bg-foreground rounded-none hover:bg-yellow-400"
              onClick={handleAddToCart}
            >
              {t("addToCart")}
            </Button>
          </div>

          <div className="flex mt-10 items-center gap-5">
            <Button variant="ghost" onClick={handleToggleFavorite}>
              <Heart
                className={isFavorite ? "fill-red-500 text-red-500" : ""}
              />
              {isFavorite ? t("favorited") : t("favorite")}
            </Button>

            <Button variant="ghost">
              <ChartNoAxesColumn />
              {t("compare")}
            </Button>
          </div>

          <div className="flex gap-4 mt-4 mb-5">
            <Facebook className="text-gray-500 text-xs cursor-pointer hover:text-yellow-400" />
            <Twitter className="text-gray-500 text-xs cursor-pointer hover:text-yellow-400" />
            <Instagram className="text-gray-500 text-xs cursor-pointer hover:text-yellow-400" />
          </div>
        </div>
      </div>
      <div className="flex justify-between my-10">
        <ProductTabs product={product} />
      </div>
    </div>
  );
}

export default ProductSection;
