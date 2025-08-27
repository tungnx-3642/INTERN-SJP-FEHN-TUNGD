import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Product } from "@/api";
import Image from "next/image";
import WineCard from "./card/wineCard";
import Autoplay from "embla-carousel-autoplay";

function WineCarousel({ title, items }: { title: string; items: Product[] }) {
  return (
    <div className="text-foreground flex flex-col space-y-2 mb-20">
      <h1 className="text-center text-4xl uppercase">{title}</h1>
      <Image
        alt="title-dark"
        src="/title-dark.png"
        width={150}
        height={20}
        className="mx-auto"
      />
      {items && items.length > 0 && (
        <Carousel
          opts={{
            align: "start",
          }}
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
          className="w-full max-w-5xl mx-auto my-10"
        >
          <CarouselContent>
            {items.map((item) => (
              <CarouselItem
                key={item.id}
                className="md:basis-1/2 lg:basis-1/4"
              >
                <WineCard product={item} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}
    </div>
  );
}

export default WineCarousel;
