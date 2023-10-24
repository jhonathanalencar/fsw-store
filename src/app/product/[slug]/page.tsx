import { prismaClient } from "@/lib/prisma";

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

  return <div>{product.name}</div>;
}
