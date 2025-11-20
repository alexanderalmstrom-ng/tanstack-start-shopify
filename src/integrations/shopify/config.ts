import z from "zod";
import { isServer } from "@/lib/utils";

const shopifyConfigSchemaBase = z.object({
  shopName: z.string().min(1, "VITE_SHOPIFY_SHOP_NAME is required"),
});

export const shopifyConfigSchemaServer = z.object({
  privateToken: z.string().min(1, "SHOPIFY_ACCESS_TOKEN is required"),
});

const shopifyConfigSchemaClient = z.object({
  publicToken: z.string().min(1, "VITE_SHOPIFY_ACCESS_TOKEN is required"),
});

function getShopifyConfig() {
  if (isServer()) {
    return shopifyConfigSchemaBase
      .extend(shopifyConfigSchemaServer.shape)
      .parse({
        shopName: process.env.VITE_SHOPIFY_SHOP_NAME,
        privateToken: process.env.SHOPIFY_ACCESS_TOKEN,
      });
  }

  return shopifyConfigSchemaBase.extend(shopifyConfigSchemaClient.shape).parse({
    shopName: import.meta.env.VITE_SHOPIFY_SHOP_NAME,
    publicToken: import.meta.env.VITE_SHOPIFY_ACCESS_TOKEN,
  });
}

export const shopifyConfig = getShopifyConfig();

export type ShopifyConfig = z.infer<typeof shopifyConfig>;
