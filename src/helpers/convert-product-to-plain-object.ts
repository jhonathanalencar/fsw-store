import { Product } from "@prisma/client";

export function convertProductToPlainObject(product: Product): PlainProduct {
  const { basePrice, ...rest } = product;

  return {
    ...rest,
    basePrice: Number(basePrice),
  };
}
