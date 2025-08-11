import { test, expect } from "@playwright/test";
import Joi from "joi";

const expectedHeaders = {
    "content-length": "196",
    "content-type": "application/json; charset=utf-8",
    date: "Mon, 11 Aug 2025 17:42:22 GMT",
    etag: 'W/"c4-I7xOw4G7gM4dGHKexg/muK7tR60"',
    nel: '{"report_to":"heroku-nel","response_headers":["Via"],"max_age":3600,"success_fraction":0.01,"failure_fraction":0.1}',
    "report-to":
        '{"group":"heroku-nel","endpoints":[{"url":"https://nel.heroku.com/reports?s=fmmZHG8QuHAVRjbASiGErEQfhF%2FW5w7vTuqsv%2Fq4EC0%3D\\u0026sid=c46efe9b-d3d2-4a0c-8c76-bfafa16c5add\\u0026ts=1754934142"}],"max_age":3600}',
    "reporting-endpoints":
        'heroku-nel="https://nel.heroku.com/reports?s=fmmZHG8QuHAVRjbASiGErEQfhF%2FW5w7vTuqsv%2Fq4EC0%3D&sid=c46efe9b-d3d2-4a0c-8c76-bfafa16c5add&ts=1754934142"',
    server: "Heroku",
    via: "1.1 heroku-router",
    "x-powered-by": "Express",
};
const dataCreate = {
    firstname: "Jim",
    lastname: "Brown",
    totalprice: 111,
    depositpaid: true,
    bookingdates: {
        checkin: "2018-01-01",
        checkout: "2019-01-01",
    },
    additionalneeds: "Breakfast",
}

const bookingSchema = Joi.object({
    additionalneeds: Joi.string().required(),
    totalprice: Joi.number().required(),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    depositpaid: Joi.boolean().required(),
    bookingdates: Joi.object({
        checkin: Joi.date().required(),
        checkout: Joi.date().required(),
    }),
});

const schema = Joi.object({
    bookingid: Joi.number().required(),
    booking: bookingSchema,
});
let token

test.beforeAll(async ({ request }) => {
    const response = await request.post('auth', {
        data: {
            username: 'admin',
            password: 'password123'
        },
        failOnStatusCode: true
    })

    token = (await response.json()).token
    expect(token).toBeDefined();
})

test("create booking, json schema and headers should be valid", async ({ request }) => {
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

test("get existing booking, json schema and headers should be valid", async ({ request }) => {
    const result = await request.post("/booking", {
        data: dataCreate,
        failOnStatusCode: true,
    });

    const bookingid = (await result.json()).bookingid;
    expect(bookingid).toBeDefined();

    const updateResult = await request.get(`/booking/${bookingid}`, {
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
        headers: {
            Cookie: `token=${token}`,
        },
    });

    const json = await updateResult.json();
    const headers = updateResult.headers();

    const validationResult = bookingSchema.validate(json);
    expect(validationResult.error).toBeUndefined();

    for (const key in expectedHeaders) {
        expect(headers[key]).toBeDefined();
    }
});

test("update existing booking, json schema and headers should be valid", async ({ request }) => {
    const result = await request.post("/booking", {
        data: dataCreate,
        failOnStatusCode: true,
    });

    const bookingid = (await result.json()).bookingid;
    expect(bookingid).toBeDefined();

    const updateResult = await request.put(`/booking/${bookingid}`, {
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
        headers: {
            Cookie: `token=${token}`,
        },
    });

    const json = await updateResult.json();
    const headers = updateResult.headers();

    const validationResult = bookingSchema.validate(json);
    expect(validationResult.error).toBeUndefined();

    for (const key in expectedHeaders) {
        expect(headers[key]).toBeDefined();
    }
});

test("partial update existing booking, json schema and headers should be valid", async ({ request }) => {
    const result = await request.post("/booking", {
        data: dataCreate,
        failOnStatusCode: true,
    });

    const bookingid = (await result.json()).bookingid;
    expect(bookingid).toBeDefined();

    const updateResult = await request.patch(`/booking/${bookingid}`, {
        data: {
            firstname: "Jim1",
            lastname: "Brown1",
        },
        failOnStatusCode: true,
        headers: {
            Cookie: `token=${token}`,
        },
    });

    const json = await updateResult.json();
    const headers = updateResult.headers();

    const validationResult = bookingSchema.validate(json);
    expect(validationResult.error).toBeUndefined();

    for (const key in expectedHeaders) {
        expect(headers[key]).toBeDefined();
    }
});

test("delete existing booking, json schema and headers should be valid", async ({ request }) => {
    const result = await request.post("/booking", {
        data: dataCreate,
        failOnStatusCode: true,
    });

    const bookingid = (await result.json()).bookingid;
    expect(bookingid).toBeDefined();

    const deleteResult = await request.delete(`/booking/${bookingid}`, {
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
        headers: {
            Cookie: `token=${token}`,
        },
    });

    const headers = deleteResult.headers();

    expect(await deleteResult.text()).toBeTruthy;

    for (const key in expectedHeaders) {
        expect(headers[key]).toBeDefined();
    }
});
