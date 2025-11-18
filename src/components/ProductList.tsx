import { useSuspenseQuery } from "@tanstack/react-query";
import type { ProductsQuery } from "@/gql/graphql";
import { useTRPC } from "@/integrations/trpc/react";
import ProductCard from "./ProductCard";

type MediaNode =
  ProductsQuery["products"]["edges"][number]["node"]["media"]["nodes"][number];

function isMediaImage(
  node: MediaNode,
): node is Extract<MediaNode, { __typename?: "MediaImage" }> {
  return node.__typename === "MediaImage";
}

export default function ProductList() {
  const trpc = useTRPC();
  const { data: products } = useSuspenseQuery(
    trpc.shopify.products.queryOptions(),
  );

  if (!products) {
    return <div>No products</div>;
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4">
      {products.map((product) => {
        const mediaImage = product.media.nodes.filter(isMediaImage)[0];

        return (
          <ProductCard
            key={product.id}
            productName={product.title}
            productImageUrl={mediaImage?.image?.url}
            productImageAltText={mediaImage?.image?.altText}
            productHandle={product.handle}
          />
        );
      })}
    </div>
  );
}
