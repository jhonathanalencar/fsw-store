import type { Product } from "@prisma/client";
import { PlainProduct, computeProductTotalPrice } from "@/helpers/product";

import { ProductItem } from "@/components/ui/product-item";

interface ProductListProps {
  products: PlainProduct[];
}

export const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className="flex w-full gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
      {products.map((product) => (
        <div key={product.id} className="w-[170px] max-w-[170px]">
          <ProductItem product={computeProductTotalPrice(product)} />
        </div>
      ))}
    </div>
  );
};
