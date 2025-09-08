import { Suspense } from "react";
import ProductsPage from "./_components/ProductsPage";

export default function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductsPage />
    </Suspense>
  );
}
