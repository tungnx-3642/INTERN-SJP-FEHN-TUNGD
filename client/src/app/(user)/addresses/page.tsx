import { Metadata } from "next";
import { DynamicBreadcrumb } from "../_components/DynamicBreadcrumb";
import { routes } from "@/lib/routes";
import AddressesList from "./_components/AddressesList";

export const metadata: Metadata = {
  title: "Danh sách địa chỉ",
};

function AddressesPage() {
  const breadcrumbItems = [
    { label: "Trang chủ", href: routes.home },
    { label: "Địa chỉ", href: routes.addresses },
  ];

  return (
    <div className="max-md:p-4 max-w-7xl mx-auto my-10">
      <DynamicBreadcrumb items={breadcrumbItems} />
      <AddressesList />
    </div>
  );
}

export default AddressesPage;
