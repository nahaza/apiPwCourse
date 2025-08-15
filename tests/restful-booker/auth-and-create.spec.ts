import { test, request, expect } from "@playwright/test";
import Joi from "joi";
import { dataCreate, schema, expectedHeaders, schemaHeaders } from "./test-data";

test("RB-0001 get auth token", async () => {
  const context = await request.newContext({
    baseURL: "https://restful-booker.herokuapp.com",
  });
  const schemaBody = Joi.object({
    token: Joi.string().required(),
  });

  const result = await context.post("/auth", {
    data: {
      username: "admin",
      password: "password123",
    },
  });

  expect(result.status()).toBe(200);
  const json = await result.json();
  const headers = result.headers();

  const token = json.token;
  expect(token).toBeDefined();
  console.log(`Token: ${token}`);

  const validationBodyResult = schemaBody.validate(json);
  expect(validationBodyResult.error).toBeUndefined();

  const validationHeadersResult = schemaHeaders.validate(headers);
  expect(validationHeadersResult.error).toBeUndefined();
});

test("RB-0002 create booking, json schema and headers should be valid", async ({ request }) => {
  const result = await request.post("/booking", {
    data: dataCreate,
    failOnStatusCode: true,
  });

  const json = await result.json();
  const headers = result.headers();

  const validationResult = schema.validate(json);
  expect(validationResult.error).toBeUndefined();

  for (const key in expectedHeaders) {
    expect(headers[key]).toBeDefined();
  }
});
