import type { TRPCRouterRecord } from "@trpc/server";
import { getProducts } from "@/lib/product";
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
