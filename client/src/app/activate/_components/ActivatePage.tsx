"use client";
import { authApi } from "@/api";
import { routes } from "@/lib/routes";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ActivatePage() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("Đang xác thực...");

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      authApi
        .activateAccount(token)
        .then((res) => setStatus(res.message))
        .catch(() => setStatus("Lỗi khi kích hoạt"));
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex justify-center items-center">
      <p>{status}</p>
      <Link href={routes.home}>Quay về trang chủ</Link>
    </div>
  );
}
