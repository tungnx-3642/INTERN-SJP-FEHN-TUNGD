import Image from "next/image";
import { DynamicBreadcrumb } from "../_components/DynamicBreadcrumb";
import { routes } from "@/lib/routes";
import FavoritesList from "./_components/FavoritesList";

const breadCrumbItems = [
  { label: "Trang chủ", href: routes.home },
  { label: "Yêu thích", href: routes.favorites },
];

export const metadata = {
  title: "Danh sách yêu thích",
};

function FavortiesPage() {
  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
      <DynamicBreadcrumb items={breadCrumbItems} />
      <div className="flex flex-col gap-3 my-10">
        <h1 className="uppercase text-2xl">Danh sách yêu thích</h1>
        <Image
          src="/titleleft-dark.png"
          alt="title-left"
          width={600}
          height={100}
          className="w-20 h-1.5 mb-6"
        />
      </div>
      <FavoritesList />
    </div>
  );
}

export default FavortiesPage;
