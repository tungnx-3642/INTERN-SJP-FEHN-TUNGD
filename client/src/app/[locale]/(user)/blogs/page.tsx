import { DynamicBreadcrumb } from "../_components/DynamicBreadcrumb";
import { routes } from "@/lib/routes";
import Image from "next/image";
import { Metadata } from "next";
import { Blog } from "@/api";
import BlogCard from "@/components/card/blogCard";

export const metadata: Metadata = {
  title: "Blogs",
  description: "Browse the latest blogs",
};

const fetchBlogs = async () => {
  const res = await fetch(`${process.env.SERVER_HOST}/blogs`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }

  return res.json();
};

const breadcrumbItems = [
  { label: "Trang chủ", href: routes.home },
  { label: "Blogs", href: routes.blogs.list },
];

async function BlogsPage() {
  const blogs: Blog[] = await fetchBlogs();

  return (
    <div className="max-w-7xl mx-auto px-5 my-10">
      <DynamicBreadcrumb items={breadcrumbItems} />

      <div>
        <h1 className="text-2xl mt-10 mb-2">Blogs</h1>
        <Image
          src="/titleleft-dark.png"
          alt="title-left"
          width={600}
          height={100}
          className="w-20 h-1.5 mb-6"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => <BlogCard blog={blog} key={blog.id} />)}
      </div>
    </div>
  );
}

export default BlogsPage;
