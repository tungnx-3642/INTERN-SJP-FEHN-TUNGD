import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReviewCard from "@/components/card/reviewCard";
import { Product } from "@/api/productApi";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function ProductTabs({ product }: { product: Product }) {
  const t = useTranslations("ProductTabs");
  return (
    <div className="flex w-full justify-between my-10 gap-5">
      <Tabs defaultValue="description" className="w-full">
        <TabsList className="mb-5 flex bg-transparent">
          <TabsTrigger
            value="description"
            className="rounded-none uppercase text-gray-500 text-xl data-[state=active]:text-white data-[state=active]:bg-yellow-500 py-3 px-4"
          >
            {t("highlights")}
          </TabsTrigger>
          <TabsTrigger
            value="additional"
            className="rounded-none uppercase text-gray-500 text-xl data-[state=active]:text-white data-[state=active]:bg-yellow-500 py-3 px-4"
          >
            {t("additionalInfo")}
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="rounded-none uppercase text-gray-500 text-xl data-[state=active]:text-white data-[state=active]:bg-yellow-500 py-3 px-4"
          >
            {t("reviews")} ({product.reviews?.length || 0})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="description">
          <div className="max-w-3xl text-justify">{product.description}</div>
        </TabsContent>

        <TabsContent value="additional">
          <div className="max-w-3xl text-justify">{t("noInfo")}</div>
        </TabsContent>

        <TabsContent value="reviews">
          <div className="max-w-3xl text-justify flex flex-col gap-7">
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))
            ) : (
              <p>{t("noReviews")}</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
      <div className="w-1/2 max-md:hidden">
        <Image
          src="/dropdown.jpg"
          alt="banner"
          width={400}
          height={400}
          className="w-full h-60 object-cover"
        />
      </div>
    </div>
  );
}
