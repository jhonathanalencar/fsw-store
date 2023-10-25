import { Product } from "@prisma/client";
import { PlainProduct } from "./product";

export function convertProductToPlainObject(product: Product): PlainProduct {
  const { basePrice, ...rest } = product;

  return {
    ...rest,
    basePrice: Number(basePrice),
  };
}
