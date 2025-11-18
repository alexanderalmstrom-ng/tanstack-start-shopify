import { useSuspenseQuery } from "@tanstack/react-query";
import type { ProductsQuery } from "@/gql/graphql";
import { useTRPCClient } from "@/integrations/trpc/react";
import ProductCard from "./ProductCard";

type MediaNode =
  ProductsQuery["products"]["edges"][number]["node"]["media"]["nodes"][number];

function isMediaImage(
  node: MediaNode,
): node is Extract<MediaNode, { __typename?: "MediaImage" }> {
  return node.__typename === "MediaImage";
}

export default function ProductList() {
  const trpc = useTRPCClient();
  const { data: products } = useSuspenseQuery({
    queryKey: ["products"],
    queryFn: () => trpc.shopify.products.query(),
  });

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
