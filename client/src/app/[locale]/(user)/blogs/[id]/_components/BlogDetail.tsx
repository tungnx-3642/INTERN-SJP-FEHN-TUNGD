"use client";
import { routes } from "@/lib/routes";
import { DynamicBreadcrumb } from "../../../_components/DynamicBreadcrumb";
import { useBlog } from "@/hooks";
import Image from "next/image";
import { formatTimeToVietnamese } from "@/utlis/formatData";
import { Button } from "@/components/ui/button";
import CommentForm from "./CommentForm";
import CommentLists from "./CommentsList";
import RecommendBlogs from "./RecommendBlogs";
import { useTranslations } from "next-intl";

const tagsList = ["Rượu ngoại", "Rượu vang", "Anh", "Pháp", "Rượu mạnh"];

function BlogDetail({ id }: { id: string }) {
  const { data: blog } = useBlog(id);
  const t = useTranslations("BlogDetail");

  const breadcrumbItems = [
    { label: t("home"), href: routes.home },
    { label: t("blogs"), href: routes.blogs.list },
    { label: blog?.title || t("blogNotFound"), href: routes.blogs.detail(id) },
  ];

  return (
    <div className="max-w-7xl mt-10 mx-auto">
      <DynamicBreadcrumb items={breadcrumbItems} />
      <div className="flex max-md:flex-col-reverse gap-7 my-12">
        <div className="w-full lg:w-1/4 p-4 md:p-2 lg:p-0 flex flex-col gap-3">
          <RecommendBlogs />
          <h2 className="text-xl uppercase mt-5">{t("blogTags")}</h2>
          <div className="flex flex-wrap w-full gap-3">
            {tagsList.map((tag, index) => (
              <Button
                key={index}
                className="text-black bg-slate-200 hover:bg-yellow-400"
              >
                {tag}
              </Button>
            ))}
          </div>
          <Image
            src="/vertical-banner.jpg"
            alt="Banner"
            width={300}
            height={600}
            className="mt-10 w-full"
          />
        </div>
        <div className="w-full lg:w-3/4 p-4 md:p-2 lg:p-0">
          {blog ? (
            <>
              <Image
                src={blog.imageUrl}
                alt={blog.title || "Blog image"}
                width={1000}
                height={600}
                className="w-full h-[400px] object-cover"
              />
              <h1 className="text-4xl uppercase mt-7">{blog.title}</h1>
              <p className="text-gray-500 mt-5">
                {t("postedBy")} {blog.user} |{" "}
                {formatTimeToVietnamese(blog.createdAt)}
              </p>
              <p className="mt-2 text-gray-500 min-h-52">{blog.content}</p>
            </>
          ) : (
            <p>{t("loading")}</p>
          )}
          {blog && <CommentForm blogId={blog.id} />}
          {blog && <CommentLists comments={blog?.comments ?? []} />}
        </div>
      </div>
    </div>
  );
}

export default BlogDetail;
