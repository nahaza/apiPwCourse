import { test as base, expect } from "@playwright/test";

type Fixtures = { token: string };

export const test = base.extend<Fixtures>({
  token: async ({ request }, use) => {
    const response = await request.post("https://accounts.spotify.com/api/token", {
      form: { grant_type: "client_credentials" },
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET).toString("base64"),
      },
    });

    expect(response.status()).toBe(200);
    const token = (await response.json()).access_token;
    expect(token).toBeDefined();

    await use(token);
  },
});
