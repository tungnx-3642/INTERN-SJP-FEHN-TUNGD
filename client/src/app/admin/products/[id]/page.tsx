import { Metadata } from "next";
import { productApi } from "@/api";
import AdminProductDetail from "./_components/AdminProductDetail";
import Link from "next/link";
import { routes } from "@/lib/routes";
import { ArrowLeft } from "lucide-react";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await productApi.getById(Number(params.id));

  return {
    title: product.name,
    description: product.description,
  };
}

function AdminProductPage({ params }: Props) {
  return (
    <div className="p-6 flex flex-col gap-5">
      <Link
        href={routes.admin.products.list}
        className="text-gray-700 text-sm flex items-center gap-1 px-4 py-2 rounded-lg w-fit hover:bg-accent"
      >
        <ArrowLeft />
        Quay lại danh sách sản phẩm
      </Link>
      <AdminProductDetail productId={Number(params.id)} />
    </div>
  );
}

export default AdminProductPage;
