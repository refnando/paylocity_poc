import { test, expect } from "@playwright/test";
import { DashboardPage } from "../pages/DashboardPage/DashboardPage";
import { LoginPage } from "../pages/LoginPage/LoginPage";
import { NUMBERS } from "../utils/constants/values";

const user = process.env.USER_NAME as string;
const pwd = process.env.PASSWORD as string;

test.beforeEach(async ({ page }) => {
  const loginpage = new LoginPage(page);
  await loginpage.validLogin(user, pwd);
});

test("Dashboard validations", async ({ page }) => {
  await test.step("When they are in dashboard page, they are able to add a new employee", async () => {
    const dashboard = new DashboardPage(page);

    const employeesBeforeAdding = await dashboard.currentEmployeesQuantity();

    await dashboard.addNewEmployee();
    await dashboard.waitForRowIncrease(employeesBeforeAdding);

    const employeesAfterAdding = await dashboard.currentEmployeesQuantity();

    expect(employeesAfterAdding).toBe(employeesBeforeAdding + 1);
  });
});
