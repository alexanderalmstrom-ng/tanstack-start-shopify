import { createFileRoute, notFound } from "@tanstack/react-router";
import { getProductBySlugServerFn } from "@/utils/product";

export const Route = createFileRoute("/product/$slug")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const product = await getProductBySlugServerFn({
      data: { slug: params.slug },
    });

    if (!product) {
      throw notFound();
    }

    return { product };
  },
});

function RouteComponent() {
  const { product } = Route.useLoaderData();

  return (
    <div>
      <h1>{product?.title}</h1>
      {product?.media.nodes.map((node) => {
        if (node.__typename === "MediaImage") {
          return (
            <img
              key={node.id}
              src={node.image?.url}
              alt={node.image?.altText ?? ""}
            />
          );
        }
        return null;
      })}
    </div>
  );
}
