import { test as base, expect, request as newRequest } from "@playwright/test";
import fs from "fs";

type Fixtures = { token: string };

export const test = base.extend<Fixtures>({
  token: "",
  request: async ({ request, token }, use) => {
    if (fs.existsSync("tests/spotify/.token") === false) {
      const response = await request.post("https://accounts.spotify.com/api/token", {
        form: { grant_type: "client_credentials" },
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET).toString("base64"),
        },
      });

      expect(response.status()).toBe(200);
      token = (await response.json()).access_token;

      fs.writeFileSync("tests/spotify/.token", token);
    } else {
      token = fs.readFileSync("tests/spotify/.token", { encoding: "utf-8" });
    }
    const requestWithToken = await newRequest.newContext({
      extraHTTPHeaders: { Authorization: `Bearer ${token}` },
    });

    await use(requestWithToken);
  },
});
