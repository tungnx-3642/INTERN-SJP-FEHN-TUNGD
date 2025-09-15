import { Metadata } from "next";
import OrderList from "./_components/OrdersList";

export const metadata: Metadata = {
  title: "Danh sách đơn hàng",
};

function AdminOrdersPage() {
  return (
    <div className="max-w-10/12 mt-5 mx-auto">
      <OrderList />
    </div>
  );
}

export default AdminOrdersPage;
