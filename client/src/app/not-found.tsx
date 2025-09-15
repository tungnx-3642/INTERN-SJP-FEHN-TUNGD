import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { routes } from "@/lib/routes";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative">
      <div className="bg-yellow-500 w-screen text-center flex max-md:flex-col justify-center items-center gap-10 relative">
        <Image
          src="/not-found.png"
          alt="notfound-image"
          width={350}
          height={1050}
          className="absolute left-1/6 top-1/2 -translate-y-1/2 max-md:hidden"
        />
        <h1 className="text-6xl lg:ml-20">Lỗi</h1>
        <div className="relative">
          <p className="text-4xl lg:text-[22rem] font-bold text-white lg:leading-[14rem]">404</p>
          <div className="mt-4 text-3xl text-gray-800 lg:absolute top-1/2 lg:-translate-y-2/3 pl-14 bg-yellow-500 text-justify">
            <p className="font-light">Đây không phải là</p>
            <p className="font-semibold text-black">Trang web bạn tìm kiếm</p>
          </div>
        </div>
      </div>
      <div className="flex mt-5 items-center gap-7">
        <Image
          src="/logo-removebg.png"
          alt="logo"
          width={150}
          height={150}
          className=""
        />
        <Link href="/en/" className="underline uppercase font-lg">
          Quay về trang chủ
        </Link>
        <ChevronRight />
        <Link href="/en/contact" className="underline uppercase font-lg">
           Liên hệ
        </Link>
      </div>
    </div>
  );
}
