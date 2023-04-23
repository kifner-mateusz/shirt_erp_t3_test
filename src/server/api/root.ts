import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { sessionRouter } from "./routers/session";
import { productRouter } from "./routers/products";
import { settingsRouter } from "./routers/settings";
import { clientRouter } from "./routers/client";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  session: sessionRouter,
  product: productRouter,
  settings: settingsRouter,
  client: clientRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
