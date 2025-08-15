import Joi from "joi";

export const expectedHeaders = {
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

export const schemaHeaders = Joi.object({
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

export const dataCreate = {
  firstname: "Jim",
  lastname: "Brown",
  totalprice: 111,
  depositpaid: true,
  bookingdates: {
    checkin: "2018-01-01",
    checkout: "2019-01-01",
  },
  additionalneeds: "Breakfast",
};

export const bookingSchema = Joi.object({
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

export const schema = Joi.object({
  bookingid: Joi.number().required(),
  booking: bookingSchema,
});
