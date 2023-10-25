import { prismaClient } from "@/lib/prisma";
import { computeProductTotalPrice } from "@/helpers/product";

import { ProductImages } from "./components/product-images";
import { ProductInfo } from "./components/product-info";
import { ProductList } from "@/components/ui/product-list";
import { SectionTitle } from "@/components/ui/section-title";
import { convertProductToPlainObject } from "@/helpers/convert-product-to-plain-object";

interface ProductDetailsPageProps {
  params: { slug: string };
}

export default async function ProductDetails({
  params: { slug },
}: ProductDetailsPageProps) {
  const product = await prismaClient.product.findFirst({
    where: {
      slug,
    },
    include: {
      category: {
        include: {
          products: {
            where: {
              slug: {
                not: slug,
              },
            },
          },
        },
      },
    },
  });

  if (!product) {
    return null;
  }

  const { category, ...rest } = product;

  return (
    <div className="flex flex-col gap-8 pb-8">
      <ProductImages imageUrls={rest.imageUrls} name={rest.name} />
      <ProductInfo
        product={computeProductTotalPrice(convertProductToPlainObject(rest))}
      />

      <div>
        <SectionTitle>Produtos Recomendados</SectionTitle>
        <ProductList
          products={category.products.map((product) =>
            convertProductToPlainObject(product),
          )}
        />
      </div>
    </div>
  );
}
