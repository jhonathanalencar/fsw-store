import { ComponentProps } from "react";

export const SectionTitle = ({ children, ...props }: ComponentProps<"p">) => {
  return (
    <p className="mb-3 pl-5 font-semibold uppercase" {...props}>
      {children}
    </p>
  );
};
