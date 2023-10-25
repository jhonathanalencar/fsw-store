import { Prisma } from "@prisma/client";

type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrls: string[];
  categoryId: string;
  discountPercentage: number;
  createdAt: Date;
  updatedAt: Date;
  basePrice: Prisma.Decimal;
};

export type PlainProduct = Omit<Product, "basePrice"> & { basePrice: number };

export interface ProductWithTotalPrice extends PlainProduct {
  totalPrice: number;
}

export const computeProductTotalPrice = (
  product: Product,
): ProductWithTotalPrice => {
  if (product.discountPercentage === 0) {
    return {
      ...product,
      basePrice: Number(product.basePrice),
      totalPrice: Number(product.basePrice),
    };
  }

  const totalDiscount =
    Number(product.basePrice) * (product.discountPercentage / 100);

  return {
    ...product,
    basePrice: Number(product.basePrice),
    totalPrice: Number(product.basePrice) - totalDiscount,
  };
};
