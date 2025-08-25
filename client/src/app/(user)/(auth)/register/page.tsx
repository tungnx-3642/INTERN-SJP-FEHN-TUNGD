import type { Metadata } from "next";
import { DynamicBreadcrumb } from "@/app/(user)/_components/DynamicBreadcrumb";
import { routes } from "@/lib/routes";
import Link from "next/link";
import Image from "next/image";
import RegisterForm from "./_components/registerForm";

export const metadata: Metadata = {
  title: "Đăng nhập",
};

function RegisterPage() {
  const breadcrumbItems = [
    { label: "Trang chủ", href: routes.home },
    { label: "Đăng ký", href: routes.auth.register },
  ];

  return (
    <div className="max-md:p-4 max-w-7xl mx-auto my-10">
      <DynamicBreadcrumb items={breadcrumbItems} />
      <div className="flex justify-between mt-5">
        <div>
          <h1 className="text-2xl uppercase">Đăng ký</h1>
          <Image
            src="/titleleft-dark.png"
            alt="title-left"
            width={600}
            height={100}
            className="w-20 h-1.5 mt-4 mb-6"
          />
        </div>
        <Link
          href={routes.auth.login}
          className="bg-foreground text-white px-7 h-12 flex justify-center items-center hover:bg-background hover:text-foreground"
        >
          Đăng nhập
        </Link>
      </div>
      <RegisterForm />
    </div>
  );
}

export default RegisterPage;
