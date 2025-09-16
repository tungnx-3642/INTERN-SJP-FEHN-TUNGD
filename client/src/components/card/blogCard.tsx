"use client";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Blog } from "@/api";
import { routes } from "@/lib/routes";
import { useTranslations } from "next-intl";
import { formatTimeToVietnamese } from "@/utlis/formatData";

function BlogCard({ blog }: { blog: Blog }) {
  const t = useTranslations("BlogCard");
  const tBlogDetail = useTranslations("BlogDetail");

  return (
    <div>
      <div className="flex flex-col items-center space-y-4 rounded-lg">
        <Image
          src={blog.imageUrl}
          alt={blog.title}
          width={300}
          height={200}
          className="w-full h-48 object-cover"
        />
        <Link
          href={routes.blogs.detail(blog.id)}
          className="text-xl w-full text-left mb-1 uppercase hover:underline"
        >
          {blog.title}
        </Link>
        <p className="text-left w-full text-gray-600 text-sm mb-2">
          {tBlogDetail("postedBy")} {blog.user} |{" "}
          {formatTimeToVietnamese(blog.createdAt)} |{" "}
          {blog.comments?.length || 0} {t("comments")}
        </p>
        <p className="text-gray-600 text-left mb-1 line-clamp-3">
          {blog.content}
        </p>
        <Link
          href={routes.blogs.detail(blog.id)}
          className="text-left w-full text-gray-400 hover:underline"
        >
          {t("readMore")}
        </Link>
      </div>
    </div>
  );
}

export default BlogCard;
