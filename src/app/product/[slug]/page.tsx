import { prismaClient } from "@/lib/prisma";
import { ProductImages } from "./components/product-images";

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
  });

  if (!product) {
    return null;
  }

  return (
    <div>
      <ProductImages imageUrls={product.imageUrls} name={product.name} />
    </div>
  );
}
