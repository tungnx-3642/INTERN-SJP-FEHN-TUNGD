import Image from "next/image";
import Link from "next/link";
import { Blog } from "@/api";
import { routes } from "@/lib/routes";

function BlogCard({ blog }: { blog: Blog }) {
  return (
    <div>
      <div className="flex flex-col items-center space-y-4 rounded-lg max-md:p-6">
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
          Đăng bởi {blog.user} | 30/6/2015 | 60 bình luận
        </p>
        <p className="text-gray-600 text-left mb-1 line-clamp-3">
          {blog.content}
        </p>
        <Link
          href={routes.blogs.detail(blog.id)}
          className="text-left w-full text-gray-400 hover:underline"
        >
          Read More
        </Link>
      </div>
    </div>
  );
}

export default BlogCard;
