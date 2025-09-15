import { TableCell, TableRow } from "@/components/ui/table";
import Image from "next/image";
import { formatToVND } from "@/utlis/formatData";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context";

interface ItemRowProps {
  item: {
    productId: number | string;
    quantity: number;
    price: number;
    name: string;
    imageUrl?: string;
    description?: string;
  };
  isEditable: boolean;
}

function ItemRow({ item, isEditable }: ItemRowProps) {
  const { removeItem } = useCart();
  const subtotal = item.price * item.quantity;
  return (
    <TableRow>
      <TableCell className="flex max-md:flex-col items-center gap-3">
        {item.imageUrl && (
          <Image
            src={item.imageUrl}
            alt={item.name}
            width={100}
            height={100}
            className="w-12 h-20 md:w-20 md:h-32 object-contain"
          />
        )}
        <div>
          <div className="font-medium">{item.name}</div>
          {item.description && (
            <div className="max-md:hidden text-sm text-muted-foreground line-clamp-2">
              {item.description}
            </div>
          )}
        </div>
      </TableCell>
      <TableCell className="text-center">{formatToVND(item.price)}</TableCell>
      <TableCell className="text-center">{item.quantity}</TableCell>
      <TableCell className="font-medium text-center">{formatToVND(subtotal)}</TableCell>
      {isEditable && (
        <TableCell className="text-center">
          <Button
            variant="destructive"
            size="sm"
            onClick={() => removeItem(item.productId)}
            className="rounded-none mx-auto"
          >
            Xóa
          </Button>
        </TableCell>
      )}
    </TableRow>
  );
}

export default ItemRow;
