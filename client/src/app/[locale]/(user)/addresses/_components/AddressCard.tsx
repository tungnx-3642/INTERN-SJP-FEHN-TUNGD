import { Address } from "@/api";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

function AddressCard({
  address,
  onEdit,
  onDelete,
}: {
  address: Address;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const t = useTranslations("AddressesPage");

  const fields: { label: string; value: string | undefined }[] = [
    { label: t("firstName"), value: address.firstName },
    { label: t("lastName"), value: address.lastName },
    { label: t("address"), value: address.address },
    { label: t("city"), value: address.city },
    { label: t("nationality"), value: address.nationality },
    { label: t("zipCode"), value: address.zipCode },
    { label: t("phone"), value: address.phone },
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
        <Button onClick={onEdit}>{t("edit")}</Button>
        <Button variant="destructive" onClick={onDelete}>
          {t("delete")}
        </Button>
      </div>
    </div>
  );
}

export default AddressCard;
