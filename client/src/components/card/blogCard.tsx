import Image from "next/image";
import Link from "next/link";

function BlogCard() {
  return ( 
  <div>
    <div className="flex flex-col items-center space-y-4 rounded-lg p-6">
      <Image
        src="/slide/slide-6.jpg"
        alt="Blog Image"
        width={300}
        height={200}
        className="w-full h-48 object-cover"
      />
      <h1 className="text-xl w-full text-left mb-1 uppercase">Vang thăng long classic</h1>
      <p className="text-left w-full text-gray-600 text-sm mb-2">Đăng bởi Google | 30/6/2015 | 60 bình luận</p>
      <p className="text-gray-600 text-left mb-1">This is a summary of the blog post. It provides a brief overview of the content.</p>
      <Link href="#" className="text-left w-full text-gray-400 hover:underline">Read More</Link>
    </div>
  </div> );
}

export default BlogCard;
