import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReviewCard from "@/components/card/reviewCard";
import { Product } from "@/api/productApi";
import Image from "next/image";

export default function ProductTabs({ product }: { product: Product }) {
  return (
    <div className="flex w-full justify-between my-10 gap-5">
      <Tabs defaultValue="description" className="w-full">
        <TabsList className="mb-5 flex bg-transparent">
          <TabsTrigger
            value="description"
            className="rounded-none uppercase text-gray-500 text-xl data-[state=active]:text-white data-[state=active]:bg-yellow-500 py-3 px-4"
          >
            Đặc điểm nổi bật
          </TabsTrigger>
          <TabsTrigger
            value="additional"
            className="rounded-none uppercase text-gray-500 text-xl data-[state=active]:text-white data-[state=active]:bg-yellow-500 py-3 px-4"
          >
            Thông tin bổ sung
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="rounded-none uppercase text-gray-500 text-xl data-[state=active]:text-white data-[state=active]:bg-yellow-500 py-3 px-4"
          >
            Đánh giá ({product.reviews?.length || 0})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="description">
          <div className="max-w-3xl text-justify">{product.description}</div>
        </TabsContent>

        <TabsContent value="additional">
          <div className="max-w-3xl text-justify">Chưa có thông tin</div>
        </TabsContent>

        <TabsContent value="reviews">
          <div className="max-w-3xl text-justify flex flex-col gap-7">
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))
            ) : (
              <p>Chưa có đánh giá nào</p>
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
