import { Link } from "@tanstack/react-router";

type ProductCardProps = {
  productName: string;
  productImageUrl?: string;
  productImageAltText?: string | null;
  productHandle: string;
};

export default function ProductCard({
  productName,
  productImageUrl,
  productImageAltText,
  productHandle,
}: ProductCardProps) {
  return (
    <Link to={`/product/$slug`} params={{ slug: productHandle }}>
      {productImageUrl && (
        <img src={productImageUrl} alt={productImageAltText ?? productName} />
      )}
      <h3>{productName}</h3>
    </Link>
  );
}
