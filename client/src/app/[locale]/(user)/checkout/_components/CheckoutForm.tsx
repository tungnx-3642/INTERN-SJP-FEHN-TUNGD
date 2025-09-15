"use client";

import { useAddressesByUser } from "@/hooks/useAddress";
import { useAuth } from "@/context";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Address } from "@/api";

interface CheckoutFormProps {
  selectedId: number | null;
  setSelectedId: (id: number | null) => void;
}


function CheckoutForm({ selectedId, setSelectedId }: CheckoutFormProps) {
  const { user } = useAuth();
  const { data: addresses } = useAddressesByUser(user?.id);

  const selectedAddress = addresses?.find((a: Address) => a.id === selectedId);

  return (
    <div className="space-y-6 min-h-96 min-w-1/2 lg:border-r lg:pr-5">
      <div className="space-y-2 min-w-80">
        <Label htmlFor="address" className="font-semibold mb-5 text-2xl">Chọn địa chỉ</Label>
        <Select
          onValueChange={(val) => setSelectedId(Number(val))}
          value={selectedId?.toString() || ""}
        >
          <SelectTrigger id="address" className="w-full">
            <SelectValue placeholder="Chọn địa chỉ" />
          </SelectTrigger>
          <SelectContent>
            {addresses?.map((addr: Address) => (
              <SelectItem key={addr.id} value={addr.id?.toString() || ""}>
                {addr.firstName} {addr.lastName} — {addr.city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedAddress && (
        <Card className="shadow-md rounded-2xl">
          <CardHeader>
            <CardTitle>Shipping Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>
              <span className="font-medium">Name:</span>{" "}
              {selectedAddress.firstName} {selectedAddress.lastName}
            </p>
            <p>
              <span className="font-medium">Address:</span>{" "}
              {selectedAddress.address}, {selectedAddress.city},{" "}
              {selectedAddress.zipCode}
            </p>
            <p>
              <span className="font-medium">Nationality:</span>{" "}
              {selectedAddress.nationality}
            </p>
            <p>
              <span className="font-medium">Phone:</span>{" "}
              {selectedAddress.phone}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default CheckoutForm;
