import { expect } from "playwright/test";
import { test } from "../../fixtures/fixtures";

//for premium account only
test.skip("GET audiobook by id, should return it", async ({ request, tokens }) => {
  const response = await request.get("https://api.spotify.com/v1/audiobooks/7iHfbu1YPACw6oZPAFJtqe", {
    headers: {
      Authorization: `Bearer ${tokens.access_token}`,
    },
  });

  expect(response.status()).toBe(200);
});
