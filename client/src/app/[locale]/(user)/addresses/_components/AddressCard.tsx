import { Address } from "@/api";
import { Button } from "@/components/ui/button";

function AddressCard({
  address,
  onEdit,
  onDelete,
}: {
  address: Address;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const fields: { label: string; value: string | undefined }[] = [
    { label: "Tên", value: address.firstName },
    { label: "Họ và tên đệm", value: address.lastName },
    { label: "Địa chỉ", value: address.address },
    { label: "Thành phố", value: address.city },
    { label: "Quốc tịch", value: address.nationality },
    { label: "Zip code", value: address.zipCode },
    { label: "Số điện thoại", value: address.phone },
  ];

  return (
    <div className="flex flex-col gap-5 p-4 border rounded-xl text-lg dark:bg-accent">
      {fields.map((field, idx) => (
        <div key={idx} className="flex items-start">
          <p className="w-40">{field.label}</p>
          <p>{field.value}</p>
        </div>
      ))}
      <div className="flex gap-2 mt-auto items-center justify-end">
        <Button onClick={onEdit}>Chỉnh sửa</Button>
        <Button variant="destructive" onClick={onDelete}>
          Xóa
        </Button>
      </div>
    </div>
  );
}

export default AddressCard;
