import Image, { ImageProps } from "next/image";

export const PromoBanner = ({ src, alt, ...props }: ImageProps) => {
  return (
    <Image
      src={src}
      alt={alt}
      height={0}
      width={0}
      sizes="100vw"
      className="h-auto w-full px-5"
      {...props}
    />
  );
};
