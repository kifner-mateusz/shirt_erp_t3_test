import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { getIronSession } from "iron-session";
import { sessionOptions } from "~/lib/session";
import { prisma } from "~/server/db";

export async function createContext(opts: trpcNext.CreateNextContextOptions) {
  const session = await getIronSession(opts.req, opts.res, sessionOptions);

  return {
    prisma,
    session,
  };
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
