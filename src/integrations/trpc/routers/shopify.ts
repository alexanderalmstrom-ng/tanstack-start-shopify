import type { TRPCRouterRecord } from "@trpc/server";
import { getProducts } from "@/integrations/shopify/lib/product/products.query";
import { publicProcedure } from "../init";

export const shopifyRouter = {
  products: publicProcedure.query(() => {
    return getProducts();
  }),
} satisfies TRPCRouterRecord;
