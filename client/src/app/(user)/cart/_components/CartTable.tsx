"use client";
import { useCart, useAuth } from "@/context";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatToVND } from "@/utlis/formatData";
import { useProductsList, useCreateOrder } from "@/hooks";
import { useRouter } from "next/navigation";
import { routes } from "@/lib/routes";
import { toast } from "sonner";
import { Order, OrderStatus } from "@/api/orderApi";
import CartItemRow from "../../_components/ItemRow";
import { useMemo } from "react";

function CartTable() {
  const router = useRouter();
  const { user } = useAuth();
  const { cart, removeAll } = useCart();
  const productIds = cart.items.map((item) => Number(item.productId));
  const { data: products } = useProductsList(productIds);

  const { mutate: createOrder, isPending } = useCreateOrder({
    onSuccess: () => {
      toast.success("Đặt hàng thành công!");
      removeAll();
      router.push(routes.products.list);
    },
    onError: (error) => {
      toast.error("Có lỗi xảy ra khi đặt hàng: " + error.message);
    },
  });

  const enrichedItems = cart.items.map((cartItem) => {
    const product = products?.find((p) => p.id === Number(cartItem.productId));
    return {
      ...cartItem,
      product: product,
      price: product?.price || 0,
      name: product?.name || `#${cartItem.productId}`,
      imageUrl: product?.imageUrl,
      description: product?.description,
    };
  });

  const total = useMemo(() => {
    return enrichedItems.reduce(
      (sum, it) => sum + it.price * it.quantity,
      0
    );
  }, [enrichedItems]);

  const handleCreateOrder = () => {
    if (!user) {
      toast.error("Bạn cần đăng nhập để có thể đặt đơn");
      router.push(routes.auth.login);
      return;
    }

    if (!products || products.length === 0) {
      toast.error("Không có sản phẩm nào trong giỏ hàng");
      return;
    }

    const orderData: Order = {
      userId: user.id,
      items: cart.items,
      total: total,
      status: OrderStatus.Pending,
    };
    createOrder(orderData);
  };

  if (!cart.items.length) {
    return (
      <div className="w-full text-center py-10 text-muted-foreground">
        Giỏ hàng của bạn đang trống.
        <div className="mt-2">
          <Button onClick={() => router.push(routes.products.list)}>
            Tiếp tục mua hàng
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="max-md:text-center">Sản phẩm</TableHead>
            <TableHead className="text-center">Giá</TableHead>
            <TableHead className="text-center">Số lượng</TableHead>
            <TableHead className="text-center">Thành tiền</TableHead>
            <TableHead className="text-center">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {enrichedItems.map((item,index) => <CartItemRow key={index} item={item} isEditable />)}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3} className="text-right font-medium">
              Tổng cộng
            </TableCell>
            <TableCell className="font-bold">{formatToVND(total)}</TableCell>
            <TableCell />
          </TableRow>
        </TableFooter>
      </Table>
      <div className="mt-5 flex gap-5 justify-end">
        <Button onClick={() => router.push(routes.products.list)}>
          Tiếp tục mua hàng
        </Button>
        <Button onClick={() => removeAll()}>Xóa tất cả</Button>
        <Button onClick={handleCreateOrder} disabled={isPending}>
          {isPending ? "Đang xử lý..." : "Đặt đơn"}
        </Button>
      </div>
    </div>
  );
}

export default CartTable;
