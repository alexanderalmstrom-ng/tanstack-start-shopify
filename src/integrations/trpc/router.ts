import type { TRPCRouterRecord } from "@trpc/server";
import { getProducts } from "@/integrations/shopify/lib/product/products.query";
import { createTRPCRouter, publicProcedure } from "./init";

const shopifyRouter = {
  products: publicProcedure.query(() => {
    return getProducts();
  }),
} satisfies TRPCRouterRecord;

export const trpcRouter = createTRPCRouter({
  shopify: shopifyRouter,
});

export type TRPCRouter = typeof trpcRouter;
