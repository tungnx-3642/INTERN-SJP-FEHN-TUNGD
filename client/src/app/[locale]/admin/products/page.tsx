import { productColumns } from "./_components/table/ProductsColumns";
import { ProductTable } from "./_components/table/ProductTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Danh sách sản phẩm",
};

function AdminProductsPage() {
  return (
    <div className="max-w-10/12 mt-5 mx-auto">
      <ProductTable columns={productColumns} />
    </div>
  );
}

export default AdminProductsPage;
