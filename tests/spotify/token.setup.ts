import { test } from "@playwright/test";
import { Auth } from "../../apps/controllers/Auth/Auth";

test("refresh token", async ({ request }) => {
  await new Auth(request).refreshAndSaveToken();
});
