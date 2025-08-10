import { test, expect } from '@playwright/test';

const api_key = 'JzaeM8dMrWZzUG3ZdpLQa2epUNbO13aSFosayUY4';
const endPoint = `/planetary/apod`;

function verifyResponseStatusCode(response: any, expectedStatus: number) {
  expect(response.status(), `Status code should be ${expectedStatus}`).toBe(expectedStatus);
}


function verifyResponseHeaderAge(responseHeaders: any, minAge: number = 0) {
  const age = Number(responseHeaders['age'])
  expect(age, `Response header Age ${age} should be greater or equal ${minAge}`).toBeGreaterThanOrEqual(minAge);
}

function verifyResponseBodyArrayLength(responseBody: any, length: number) {
  expect(responseBody.length, `Response body length should be ${length}`).toBe(length);
}

function verifyResponseBodyUrlIsLink(responseBody: any) {
  const url = responseBody.url;
  const urlPattern = /^(https?:\/\/|\/\/)[^\s$.?#].[^\s]*$/;
  expect(urlPattern.test(url), `Response body url should be a valid link ${url}`).toBe(true);
}

function verifyResponseBodyDateBetween(responseBody: any, startDate: string, endDate: string) {
  const date = new Date(responseBody.date);
  const start = new Date(startDate);
  const end = new Date(endDate);
  expect(date >= start && date <= end, `Response body date ${responseBody.date} should be between ${startDate} and ${endDate}`).toBe(true);
}


test('NASA-APOD-001 get default apod', { tag: ['@smoke', '@nasa', '@apod'] }, async ({ request }) => {
  const response = await request.get('/planetary/apod', { params: { api_key } });
  const responseBody = await response.json();

  verifyResponseStatusCode(response, 200);
  verifyResponseHeaderAge(response.headers())
  verifyResponseBodyUrlIsLink(responseBody)
  expect(responseBody, `Response body should have property date`).toHaveProperty('date');
});

test('NASA-APOD-002 get date apod - yesterday', { tag: ['@smoke', '@nasa', '@apod'] }, async ({ request }) => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const date = yesterday.toISOString().split('T')[0];

  const response = await request.get(endPoint, { params: { api_key, date } });
  const responseBody = await response.json();

  verifyResponseStatusCode(response, 200);
  verifyResponseHeaderAge(response.headers());
  verifyResponseBodyUrlIsLink(responseBody)
  expect(responseBody.date, `Response body date should be ${date}`).toBe(date);
});

test('NASA-APOD-003 get start date apod within random days - min 2 and max 11 days', { tag: ['@nasa', '@apod'] }, async ({ request, }) => {
  const minDays = 2, maxDays = 10
  const randomDaysBefore = Math.floor(Math.random() * maxDays) + minDays;
  const today = new Date();
  const dayBeforeToday = new Date(today);
  dayBeforeToday.setDate(today.getDate() - randomDaysBefore);
  const start_date = dayBeforeToday.toISOString().split('T')[0];

  const response = await request.get(endPoint, { params: { api_key, start_date }, });
  const responseBody = await response.json();

  verifyResponseStatusCode(response, 200);
  verifyResponseHeaderAge(response.headers());
  verifyResponseBodyArrayLength(responseBody, randomDaysBefore);
  for (const body of responseBody) {
    verifyResponseBodyDateBetween(body, start_date, today.toISOString().split('T')[0]);
    verifyResponseBodyUrlIsLink(body)
  }
});

test('NASA-APOD-004 get end date apod within random days before - min 2 and max 5 days ', { tag: ['@smoke', '@nasa', '@apod'] }, async ({ request }) => {
  const minDays = 2, maxDays = 5;
  const randomDaysBefore = Math.floor(Math.random() * maxDays) + minDays
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - randomDaysBefore);
  const start_date = yesterday.toISOString().split('T')[0];
  const end_date = today.toISOString().split('T')[0];

  const response = await request.get(endPoint, { params: { api_key, start_date, end_date }, });
  const responseBody = await response.json();

  verifyResponseStatusCode(response, 200);
  verifyResponseHeaderAge(response.headers());
  verifyResponseBodyArrayLength(responseBody, randomDaysBefore);
  for (const body of responseBody) {
    verifyResponseBodyDateBetween(body, start_date, today.toISOString().split('T')[0]);
    verifyResponseBodyUrlIsLink(body)
  }
});

test('NASA-APOD-005 get count apod', { tag: ['@smoke', '@nasa', '@apod'] }, async ({ request }) => {
  const count = Math.floor(Math.random() * 15) + 2;
  const response = await request.get(endPoint, { params: { api_key, count }, });
  const responseBody = await response.json();
  console.log(responseBody);

  verifyResponseStatusCode(response, 200);
  verifyResponseHeaderAge(response.headers());
  verifyResponseBodyArrayLength(responseBody, count);
  for (const body of responseBody) {
    verifyResponseBodyUrlIsLink(body)
  }
});

const thumbsTestData = [
  {
    testId: 'NASA-APOD-006',
    params: {
      api_key,
      thumbs: true,
    },
  },
  {
    testId: 'NASA-APOD-007',
    params: {
      api_key,
      thumbs: false,
    },
  },
];

for (const { testId, params } of thumbsTestData) {
  test(`${testId} get thumbs apod`, { tag: ['@nasa', '@apod'] }, async ({ request }) => {
    const response = await request.get(endPoint, { params });
    const responseBody = await response.json();

    verifyResponseStatusCode(response, 200);
    verifyResponseHeaderAge(response.headers());
    verifyResponseBodyUrlIsLink(responseBody)
    expect(responseBody, `Response body should have property date`).toHaveProperty('date');
  });
}

test('get no api key apod', { tag: ['@nasa', '@apod'] }, async ({ request }) => {
  const property = 'x-api-umbrella-request-id';
  const response = await request.get(endPoint);
  const responseBody = await response.json();

  verifyResponseStatusCode(response, 403);
  expect(response.headers(), `Response headers should have property: ${property}`).toHaveProperty(property);
  expect(responseBody.error.message, 'Response body error message').toBe('No api_key was supplied. Get one at https://api.nasa.gov:443');
});
