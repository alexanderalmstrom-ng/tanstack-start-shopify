import type { ReactNode } from "react";
import ProductCardLink from "./ProductCardLink";

type ProductCardProps = {
  children?: ReactNode;
  slug: string;
};

export default function ProductCard({ children, slug }: ProductCardProps) {
  return (
    <ProductCardLink className="flex flex-col" slug={slug}>
      {children}
    </ProductCardLink>
  );
}
