import { createTRPCRouter } from "./init";
import { shopifyRouter } from "./routers/shopify";

export const trpcRouter = createTRPCRouter({
  shopify: shopifyRouter,
});

export type TRPCRouter = typeof trpcRouter;
