import type { TRPCRouterRecord } from "@trpc/server";
import { getProducts } from "@/utils/product";
import { createTRPCRouter, publicProcedure } from "./init";

const shopifyRouter = {
  products: publicProcedure.query(async () => {
    const products = await getProducts();
    return products;
  }),
} satisfies TRPCRouterRecord;

export const trpcRouter = createTRPCRouter({
  shopify: shopifyRouter,
});

export type TRPCRouter = typeof trpcRouter;
