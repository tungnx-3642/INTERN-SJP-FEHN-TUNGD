"use client";
import { useState } from "react";
import CheckoutForm from "./CheckoutForm";
import ReviewCart from "./ReviewCart";

function CheckoutSection() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  return (
    <div className="flex max-md:flex-col justify-between gap-5">
      <CheckoutForm selectedId={selectedId} setSelectedId={setSelectedId} />
      <ReviewCart selectedId={selectedId} />
    </div>
  );
}

export default CheckoutSection;
