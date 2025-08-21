import { test, expect, request } from "@playwright/test";
/*import { getApiContext } from "../utils/apiContext";
import { STATUS_CODES } from "../utils/constants/values";*/

/*test("GET /api/employees returns 200", async () => {
  const api = await getApiContext();
  const response = await api.get("/api/employees");

  console.log("Response status:", response.status());
  console.log("Response body:", await response.text());

  expect(response.status()).toBe(STATUS_CODES.OK);
}); */

test('GET /employees with Basic Auth', async () => {
  const apiContext = await request.newContext({
    //baseURL: 'https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod',
    baseURL: process.env.API_BASE_URL || '',
    extraHTTPHeaders: {
      'Authorization': 'Basic VGVzdFVzZXI3NjE6bVQ7YXtTYUQjVFFH',
      'accept': 'application/json',
      'content-type': 'application/json',
    }
  });

  const response = await apiContext.get('/api/employees');
  expect(response.status()).toBe(200);

  const data = await response.json();
  console.log('📦 Employees:', data);

  // Validation checks
  expect(Array.isArray(data)).toBe(true);
  expect(data[0]).toHaveProperty('username');
});
