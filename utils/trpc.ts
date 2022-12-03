import { httpBatchLink } from "@trpc/client";

import { createTRPCNext } from "@trpc/next";
import type { AppRouter } from "../pages/api/trpc/[trpc]";

function getBaseUrl() {
  // ブラウザかどうかの判断
  if (typeof window !== "undefined") {
    // ブラウザでは相対URLを返す
    return "";
  }
  // SSRの場合、絶対的なURLを返す
  // 例: vercelを利用している場合
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // 上記のURLが設定されていない場合localhostを返します。
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

// Next.jsで使うtRPCクライエント
export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      links: [
        httpBatchLink({
          url: getBaseUrl() + "/api/trpc",
        }),
      ],
    };
  },
});
