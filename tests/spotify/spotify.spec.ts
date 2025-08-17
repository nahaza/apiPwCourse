import { test } from "./spotify-fixture";
import { expect } from "@playwright/test";
import { schema, schemaHeaders } from "./test-data";

test("SP-0001 get user playlists, json schema and headers should be valid", async ({ request }) => {
  const result = await request.get(`https://api.spotify.com/v1/users/${process.env.SPOTIFY_USER_ID}/playlists`);

  expect(result.status()).toBe(200);

  const json = await result.json();
  const headers = result.headers();

  const validationResult = schema.validate(json);
  expect(validationResult.error).toBeUndefined();

  const validationHeadersResult = schemaHeaders.validate(headers);
  expect(validationHeadersResult.error).toBeUndefined();
});
