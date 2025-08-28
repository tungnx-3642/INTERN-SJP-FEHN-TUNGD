import { useBlogs } from "@/hooks";
import Link from "next/link";
import Image from "next/image";
import { routes } from "@/lib/routes";
import { Clock } from "lucide-react";
import { formatTimeToVietnamese } from "@/utlis/formatData";

function RecommendBlogs() {
  const { data: recommendBlogs } = useBlogs();
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl uppercase">Bài viết mới nhất</h1>
      <Image
        src="/titleleft-dark.png"
        alt="title-left"
        width={600}
        height={100}
        className="w-20 h-1.5 mt-2 mb-6"
      />
      {recommendBlogs
        ?.sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map((item) => (
          <Link
            className="flex gap-2"
            href={routes.blogs.detail(item.id)}
            key={item.id}
          >
            <div className="relative w-1/3 h-20 overflow-hidden">
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-cover w-full"
              />
            </div>
            <div className="w-2/3 flex flex-col gap-2">
              <h2 className="line-clamp-2">{item.title}</h2>
              <p className="text-gray-500 text-xs flex gap-1 items-center">
                <Clock size={16} />
                {formatTimeToVietnamese(item.createdAt)}
              </p>
            </div>
          </Link>
        ))}
    </div>
  );
}

export default RecommendBlogs;
