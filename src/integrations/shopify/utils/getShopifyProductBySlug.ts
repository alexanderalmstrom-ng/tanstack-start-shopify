import shopifyClient from "../client";
import productBySlugQuery from "../lib/product/productBySlug.query";

export async function getShopifyProductBySlug(slug: string) {
  const response = await shopifyClient(productBySlugQuery, { slug });

  return response.data?.product;
}
