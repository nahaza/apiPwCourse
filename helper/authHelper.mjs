import { request } from "@playwright/test";
import { config } from "dotenv";
import { writeFileSync } from "fs";

config({ path: ".env" });

async function getAndSaveToken() {
  const context = await request.newContext();

  const response = await context.post(
    "https://accounts.spotify.com/api/token",
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(
            `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
          ).toString("base64"),
      },
      params: {
        grant_type: "authorization_code",
        code: process.env.AUTHORIZATION_CODE,
        redirect_uri: process.env.REDIRECT_URL,
      },
    }
  );

  const fullTokens = await response.json();

  writeFileSync("tokens.json", JSON.stringify(fullTokens));

  console.log(fullTokens);

  return fullTokens;
}

getAndSaveToken();
