"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Quote } from "lucide-react";
import Image from "next/image";

export function ClientCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);

    const onSelect = () => {
      setSelectedIndex(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    onSelect();

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <div className="w-4/5 mx-auto max-sm:p-0 p-4">
      <Carousel setApi={setApi} className="relative">
        <CarouselContent>
          {Array.from({ length: 3 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex flex-col aspect-square items-center justify-center p-6">
                    <div className="flex flex-col items-center justify-center text-center p-4 rounded-full bg-yellow-400">
                      <Quote />
                    </div>
                    <p className="text-center text-sm mt-4 w-4/5">
                      Lorem ipsum dolor sit amet consectetur adipiscing elit.
                      Quisque faucibus ex sapien vitae pellentesque sem
                      placerat. In id cursus mi pretium tellus duis convallis.
                    </p>
                    <div className="text-center">
                      <Image
                        src="/client/client-1.jpg"
                        alt="avatar"
                        width={50}
                        height={50}
                        className="w-24 h-24 mt-4 object-cover mx-auto"
                      />
                      <p className="mt-2 uppercase">Nguyen Van A</p>
                      <p className="text-sm text-gray-500">Khach hang</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            onClick={() => api && api.scrollTo(index)}
            className={`h-3 w-3 rounded-full transition-all ${
              index === selectedIndex ? "bg-yellow-400" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
