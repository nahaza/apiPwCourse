import { expect } from "@playwright/test";
import { test } from "../../fixtures/fixtures";

test("get show, should be valid", async ({ request, tokens }) => {
  const response = await request.get("https://api.spotify.com/v1/shows/5L2ON33kXa2b7laBpCAgOI");

  expect(response.status()).toBe(200);
  const json = await response.json();
});

test("get show by name, should be in a list", async ({ request, tokens }) => {
  const response = await request.get("https://api.spotify.com/v1/search", {
    params: {
      q: "qa балачки",
      type: "show",
    },
  });

  expect(response.status()).toBe(200);
  const json = await response.json();

  console.log(json.shows.items[0].id);
});
