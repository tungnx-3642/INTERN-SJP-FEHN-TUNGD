"use client";
import Image from "next/image";
import Link from "next/link";
import { useProducts } from "@/hooks";
import BlogCard from "@/components/card/blogCard";
import { ClientCarousel } from "./_components/clientCarousel";
import { formatToVND } from "@/utlis/formatData";
import { Button } from "@/components/ui/button";
import SaleCountDown from "./_components/saleCountDown";
import { routes } from "@/lib/routes";
import WineCarousel from "@/components/WineCarousel";


function HomePage() {
  const { data: products } = useProducts();

  return (
    <div className="bg-[url('/product.png')] bg-no-repeat bg-[length:150px_120px] md:bg-[length:210px_180px] lg:bg-[length:300px_250px] bg-top-left">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col gap-3 pt-20">
          <h1 className="text-4xl text-center uppercase">Giới thiệu</h1>
          <Image
            alt="title-dark"
            src="/title-dark.png"
            width={150}
            height={20}
            className="mx-auto"
          />
          <p className="text-center text-sm/8">
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
            faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi
            pretium tellus duis convallis. Tempus leo eu aenean sed diam urna
            tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.
            Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut
            hendrerit semper vel class aptent taciti sociosqu. Ad litora
            torquent per conubia nostra inceptos himenaeos. Lorem ipsum dolor
            sit amet consectetur adipiscing elit. Quisque faucibus ex sapien
            vitae pellentesque sem placerat. In id cursus mi pretium tellus duis
            convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar
            vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa
            nisl malesuada lacinia integer nunc posuere.
          </p>
          <Link
            className="bg-black px-4 py-2 text-white self-center hover:bg-white hover:text-black transition-colors"
            href={routes.infor}
          >
            Xem thêm
          </Link>
        </div>
      </div>
      <div className="my-20 max-w-7xl max-md:mx-5 mx-auto">
        <Image
          src="/wine-background.jpg"
          alt="wine-background"
          width={1000}
          height={1000}
          className="z-0 w-full h-160 object-cover"
        />
        <div className="bg-background w-5/6 flex items-center -mt-120 mx-auto z-10 relative">
          {products && products.length > 0 && (
            <div className="flex mx-auto max-md:flex-col py-15 items-center">
              <div className="w-full lg:w-1/2">
                <Image
                  src={products[0].imageUrl}
                  alt={products[0].name}
                  width={300}
                  height={300}
                  className="w-72 h-96 mx-auto md:h-120 lg:h-140 object-cover"
                />
              </div>
              <div className="w-full p-4 mt-5 lg:mt-0 lg:p-0 lg:w-1/2">
                <h1 className="uppercase text-2xl">{products[0].name}</h1>
                <Image
                  src="/titleleft-dark.png"
                  alt="title-left"
                  width={600}
                  height={100}
                  className="w-20 h-1.5 mt-2 mb-6"
                />
                <h2 className="text-3xl text-yellow-500 mb-6">
                  {formatToVND(products[0].price)}
                </h2>
                <Button className="rounded-none cursor-pointer mb-5 hover:bg-yellow-500 uppercase">
                  Add to Cart
                </Button>
                <p className="mb-10">{products[0].description}</p>
                <SaleCountDown />
              </div>
            </div>
          )}
        </div>
      </div>

      <WineCarousel title="Sản phẩm mới" items={products || []} />
      <div className="grid lg:grid-cols-4 md:grid-cols-2">
        {Array.from({ length: 8 }).map((_, index) => (
          <Image
            key={index}
            src={`/slide/slide-${index + 1}.jpg`}
            alt={`slide-${index + 1}`}
            width={300}
            height={300}
            className="w-full h-60 object-cover"
          />
        ))}
      </div>

      <div className="mt-10">
        <WineCarousel title="Sản phẩm bán chạy" items={products || []} />
      </div>

      <div className="flex max-md:flex-col max-w-7xl mb-20 mx-auto">
        <div className="w-full md:w-2/3 flex flex-col gap-2">
          <h1 className="text-center text-2xl uppercase">Tin tức & Blog</h1>
          <Image
            alt="title-dark"
            src="/title-dark.png"
            width={150}
            height={20}
            className="mx-auto"
          />
          <div className="flex max-sm:flex-col justify-between gap-4">
            <BlogCard />
            <BlogCard />
          </div>
        </div>

        <div className="w-full md:w-1/3 flex flex-col gap-2">
          <h1 className="text-center text-2xl uppercase">Khách hàng</h1>
          <Image
            alt="title-dark"
            src="/title-dark.png"
            width={150}
            height={20}
            className="mx-auto"
          />
          <ClientCarousel />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
