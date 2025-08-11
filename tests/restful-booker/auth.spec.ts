import { test, request, expect } from "@playwright/test";
import Joi from "joi";

test("RB-0001 get auth token", async () => {
  const context = await request.newContext({
    baseURL: "https://restful-booker.herokuapp.com",
  });
  const schemaBody = Joi.object({
    token: Joi.string().required(),
  });
  const schemaHeaders = Joi.object({
    date: Joi.date().required(),
    etag: Joi.string().required(),
    nel: Joi.string().required(),
    "x-powered-by": Joi.string().required(),
    "content-type": Joi.string().required(),
    "content-length": Joi.string().required(),
    "report-to": Joi.string().required(),
    "reporting-endpoints": Joi.string().required(),
    server: Joi.string().required(),
    via: Joi.string().required(),
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

  const validationBodyResult = schemaBody.validate(json);
  expect(validationBodyResult.error).toBeUndefined();

  const validationHeadersResult = schemaHeaders.validate(headers);
  expect(validationHeadersResult.error).toBeUndefined();
});



