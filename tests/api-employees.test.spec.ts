import { test, expect } from "@playwright/test";
import { getApiContext } from "../utils/apiContext";
import { STATUS_CODES } from "../utils/constants/values";

test("GET /api/employees returns 200", async () => {
  const api = await getApiContext();
  const response = await api.get("/api/employees");

  console.log("Response status:", response.status());
  console.log("Response body:", await response.text());

  expect(response.status()).toBe(STATUS_CODES.OK);
});
