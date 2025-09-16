import { Metadata } from "next";
import { UserTable } from "./_components/UsersTable";

export const metadata: Metadata = {
  title: "Danh sách người dùng",
};

function AdminProductsPage() {
  return (
    <div className="max-w-10/12 mt-5 mx-auto">
      <UserTable />
    </div>
  );
}

export default AdminProductsPage;
