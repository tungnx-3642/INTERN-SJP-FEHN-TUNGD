import Image from "next/image";
import { DynamicBreadcrumb } from "../_components/DynamicBreadcrumb";
import { routes } from "@/lib/routes";

const breadCrumbItems = [
  { label: "Trang chủ", href: routes.home },
  { label: "Thông tin", href: routes.infor },
];

export const metadata = {
  title: "Thông tin",
};

function InforPage() {
  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
      <DynamicBreadcrumb items={breadCrumbItems} />
      <div className="flex flex-col gap-3 my-10">
        <h1 className="uppercase text-2xl">Giới thiệu</h1>
        <Image
          src="/titleleft-dark.png"
          alt="title-left"
          width={600}
          height={100}
          className="w-20 h-1.5 mb-6"
        />
        <div className="flex justify-between">
          <Image
            src="/wine-background.jpg"
            alt="wine-background"
            width={1000}
            height={1000}
            className="z-0 w-2/5 h-80 object-cover"
          />
          <div className="w-3/5 pl-10 flex flex-col gap-5">
            <h1 className="uppercase text-3xl">Chào mừng đến với Wine Horse</h1>
            <p className="text-gray-500">
              Wine Horse là nhà sản xuất rượu vang với niềm đam mê và tâm huyết
              dành cho từng chai rượu. Chúng tôi kết hợp giữa truyền thống lâu
              đời và công nghệ hiện đại để tạo ra những sản phẩm chất lượng cao,
              mang đậm dấu ấn riêng biệt.
            </p>
            <p className="text-gray-500">
              Các dòng rượu vang của Wine Horse được tuyển chọn từ những giống
              nho tốt nhất, trải qua quá trình lên men và ủ kỹ lưỡng. Sản phẩm
              của chúng tôi không chỉ mang đến hương vị tinh tế mà còn là trải
              nghiệm tuyệt vời cho những ai yêu thích nghệ thuật thưởng thức
              rượu vang.
            </p>
            <p className="text-gray-500">
              Sản phẩm được đóng chai dung tích 750ml...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InforPage;
