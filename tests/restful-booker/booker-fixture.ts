import { test as base, request as newRequest } from "@playwright/test";
import fs from "fs";

type Fixtures = {
  token: string;
  bookingId: string;
};

export const test = base.extend<Fixtures>({
  token: "1",
  request: async ({ request, token }, use) => {
    if (fs.existsSync("tests/restful-booker/.token") === false) {
      const response = await request.post("/auth", {
        data: {
          username: "admin",
          password: "password123",
        },
        failOnStatusCode: true,
      });

      token = (await response.json()).token;
      fs.writeFileSync("tests/restful-booker/.token", token);
    } else {
      token = fs.readFileSync("tests/restful-booker/.token", { encoding: "utf-8" });
    }

    console.log("-- creating new context --- ");

    const requestWithToken = await newRequest.newContext({
      extraHTTPHeaders: { Cookie: `token=${token}` },
    });

    console.log("-- created new context --- ");

    await use(requestWithToken);

    console.log("-- token obtaining finished --- ");
  },
  bookingId: async ({ request }, use) => {
    const result = await request.post("/booking", {
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

    const bookingid = (await result.json()).bookingid;
    await use(bookingid);
  },
});
