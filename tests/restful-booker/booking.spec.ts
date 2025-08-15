import { expect } from "@playwright/test";
import { test } from "./booker-fixture.ts";
import { bookingSchema, schemaHeaders } from "./test-data";

test("RB-0003 get existing booking, json schema and headers should be valid", async ({ request, bookingId }) => {
  const result = await request.get(`/booking/${bookingId}`, { failOnStatusCode: true });

  const json = await result.json();
  const headers = result.headers();

  const validationResult = bookingSchema.validate(json);
  expect(validationResult.error).toBeUndefined();

  const validationHeadersResult = schemaHeaders.validate(headers);
  expect(validationHeadersResult.error).toBeUndefined();
});

test("RB-0004 update existing booking, json schema and headers should be valid", async ({ request, bookingId }) => {
  const updateResult = await request.put(`/booking/${bookingId}`, {
    data: {
      firstname: "Jim",
      lastname: "Brown",
      totalprice: 111,
      depositpaid: true,
      bookingdates: {
        checkin: "2018-01-01",
        checkout: "2019-01-01",
      },
      additionalneeds: "Breakfast",
    },
    failOnStatusCode: true,
  });

  const json = await updateResult.json();
  const headers = updateResult.headers();

  const validationResult = bookingSchema.validate(json);
  expect(validationResult.error).toBeUndefined();

  const validationHeadersResult = schemaHeaders.validate(headers);
  expect(validationHeadersResult.error).toBeUndefined();
});

test("RB-0005 partial update existing booking, json schema and headers should be valid", async ({
  request,
  bookingId,
}) => {
  const updateResult = await request.patch(`/booking/${bookingId}`, {
    data: {
      firstname: "Jim1",
      lastname: "Brown1",
    },
    failOnStatusCode: true,
  });

  const json = await updateResult.json();
  const headers = updateResult.headers();

  const validationResult = bookingSchema.validate(json);
  expect(validationResult.error).toBeUndefined();

  const validationHeadersResult = schemaHeaders.validate(headers);
  expect(validationHeadersResult.error).toBeUndefined();
});

test("RB-0006 delete existing booking, json schema and headers should be valid", async ({ request, bookingId }) => {
  const deleteResult = await request.delete(`/booking/${bookingId}`, { failOnStatusCode: true });
  expect(await deleteResult.text()).toBeTruthy;

  const headers = deleteResult.headers();
  const validationHeadersResult = schemaHeaders.validate(headers);
  expect(validationHeadersResult.error).toBeUndefined();
});
