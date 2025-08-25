import type { Metadata } from "next";
import BlogDetail from "./_components/BlogDetail";

const fetchBlogDetail = async (id: number) => {
  const res = await fetch(`${process.env.SERVER_HOST}/blogs/${id}`);
  if (!res.ok) {
    return null;
  }
  return await res.json();
};

export async function generateMetaData({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const blog = await fetchBlogDetail(Number(params.id));
  if (!blog) {
    return {
      title: "Blog Not Found",
      description: "The requested blog could not be found.",
    };
  }
  return {
    title: blog.title || "Blog Detail",
    description: blog.content || "",
  };
}

async function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <BlogDetail id={id} />
}

export default BlogDetailPage;
