"use client";

import { useAuth } from "@/context";
import { useProductsList } from "@/hooks";
import FavoriteCard from "./FavoriteCard";

function FavoritesList() {
  const { getFavorites } = useAuth();
  const favoriteIds = getFavorites();
  const { data: products } = useProductsList(favoriteIds);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products?.length ? (
        products.map((product) => (
          <FavoriteCard key={product.id} product={product} />
        ))
      ) : (
        <p className="col-span-full text-center text-gray-500 mt-10">
          Không có sản phẩm yêu thích
        </p>
      )}
    </div>
  );
}

export default FavoritesList;
