import { test as base, expect, request } from "@playwright/test";
import fs from "fs";
import { APIClient } from "../apps/APIClient";

type Fixtures = {
  tokens: SpotifyTokenResponse;
  client: APIClient;
};

interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number;
  refresh_token: string;
}

export const test = base.extend<Fixtures>({
  tokens: async ({}, use) => {
    const tokens: SpotifyTokenResponse = JSON.parse(
      fs.readFileSync("tokens.json", {
        encoding: "utf8",
      })
    );

    await use(tokens);
  },
  request: async ({ tokens }, use) => {
    const newContext = await request.newContext({
      extraHTTPHeaders: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    });

    await use(newContext);
  },
  client: async ({ request }, use) => {
    const client = new APIClient(request);
    await use(client);
  },
});
