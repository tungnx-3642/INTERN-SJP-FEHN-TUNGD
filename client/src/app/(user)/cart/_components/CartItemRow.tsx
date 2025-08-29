import { TableCell, TableRow } from "@/components/ui/table";
import Image from "next/image";
import { formatToVND } from "@/utlis/formatData";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context";

interface CartItemRowProps {
  item: {
    productId: number | string;
    quantity: number;
    price: number;
    name: string;
    imageUrl?: string;
    description?: string;
  };
}

function CartItemRow({ item }: CartItemRowProps) {
  const { removeItem } = useCart();
  const subtotal = item.price * item.quantity;
  return (
    <TableRow key={String(item.productId)}>
      <TableCell className="flex items-center gap-3">
        {item.imageUrl && (
          <Image
            src={item.imageUrl}
            alt={item.name}
            width={100}
            height={100}
            className="w-20 h-32 object-contain"
          />
        )}
        <div>
          <div className="font-medium">{item.name}</div>
          {item.description && (
            <div className="text-sm text-muted-foreground line-clamp-2">
              {item.description}
            </div>
          )}
        </div>
      </TableCell>
      <TableCell>{formatToVND(item.price)}</TableCell>
      <TableCell>{item.quantity}</TableCell>
      <TableCell className="font-medium">{formatToVND(subtotal)}</TableCell>
      <TableCell>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => removeItem(item.productId)}
          className="rounded-none"
        >
          Xóa
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default CartItemRow;
