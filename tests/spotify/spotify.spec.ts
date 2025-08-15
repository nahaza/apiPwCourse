import { test } from "./spotify-fixture";
import { expect } from "@playwright/test";
import Joi from "joi";

test("SP-0001 create playlist, json schema and headers should be valid", async ({ request, token }) => {
  const result = await request.post(`https://api.spotify.com/v1/users/${process.env.SPOTIFY_USER_ID}/playlists`, {
    data: {
      name: `New Playlist ${Math.floor(Date.now() / 1000)}`,
      description: "New playlist description",
      public: false,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  expect(result.status()).toBe(201);

  const json = await result.json();
  const headers = result.headers();

  const schema = Joi.object({
    type: Joi.string().required(),
    id: Joi.string().required(),
    name: Joi.string().required(),
  });

  const validationResult = schema.validate(json);
  expect(validationResult.error).toBeUndefined();

  const schemaHeaders = Joi.object({
    "content-type": Joi.string().required(),
    "cache-control": Joi.string().required(),
  });

  const validationHeadersResult = schemaHeaders.validate(headers);
  expect(validationHeadersResult.error).toBeUndefined();
});
