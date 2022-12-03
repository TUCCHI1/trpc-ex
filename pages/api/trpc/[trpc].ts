// サーバー側

import { initTRPC } from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { z } from "zod";

const t = initTRPC.create();

const appRouter = t.router({
  greering: t.procedure
    .input(
      z
        .object({
          name: z.string().nullish(),
        })
        .nullish()
    )
    .query(({ input }) => {
      // これをクライエントに返す
      return {
        text: `hello ${input?.name ?? "world"}`,
      };
    }),
});

// APIの型定義のみエクスポート
// 実際の実装は一切クライエントに公開されません
export type AppRouter = typeof appRouter;

// エクスポートAPIハンドラ
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
});
