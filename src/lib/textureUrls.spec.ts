import { describe, expect, test } from "vitest";

import { TEXTURE_SOURCES } from "./textures";

const shouldRun = process.env.RUN_TEXTURE_TESTS === "1";

const describeIf = shouldRun ? describe : describe.skip;

async function fetchTextureHeaders(url: string): Promise<Response> {
  const headResponse = await fetch(url, { method: "HEAD" });
  if (headResponse.ok) {
    return headResponse;
  }

  return fetch(url, { method: "GET" });
}

describeIf("Texture URL availability", () => {
  for (const [preset, source] of Object.entries(TEXTURE_SOURCES)) {
    const url = source.url;

    test(
      `${preset} texture is reachable`,
      { timeout: 15000 },
      async () => {
        const response = await fetchTextureHeaders(url);

        expect(response.ok).toBe(true);

        const contentType = response.headers.get("content-type") ?? "";
        expect(contentType).toMatch(/^image\//);
      },
    );
  }
});
