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

test("Add new Employee", async ({ page }) => {
  const dashboard = new DashboardPage(page);

  const employeesBeforeAdding = await dashboard.currentEmployeesQuantity();

  await dashboard.addNewEmployee();
  await dashboard.waitForRowIncrease(employeesBeforeAdding);

  const employeesAfterAdding = await dashboard.currentEmployeesQuantity();

  expect(employeesAfterAdding).toBe(employeesBeforeAdding + 1);
});

test("Edit employee", async ({ page }) => {
  const dashboard = new DashboardPage(page);

  const hasRecords = await dashboard.recordsDisplayed();

  if (!hasRecords) {
    test.skip(true, "⏭ No hay registros para editar");
  }

  const rowIndex = -NUMBERS.ONE;
  const dataBefore = await dashboard.getRowValues(rowIndex);
  const dataEdited = await dashboard.editEmployee(rowIndex);
  const dataAfter = await dashboard.getRowValues(rowIndex);

  expect(dataAfter).not.toEqual(dataBefore);
  expect(dataAfter).toEqual(dataEdited);
});

test("Delete employee", async ({ page }) => {
  const dashboard = new DashboardPage(page);

  const initialCount = await dashboard.currentEmployeesQuantity();

  if (initialCount === NUMBERS.ZERO) {
    console.warn("No employee to delete. Adding one...");
    await dashboard.addNewEmployee();
    await dashboard.waitForRowIncrease(initialCount);
  }

  const countBeforeDelete = await dashboard.currentEmployeesQuantity();
  await dashboard.deleteFirstEmployee();
  const countAfterDelete = await dashboard.currentEmployeesQuantity();

  expect(countAfterDelete).toBe(countBeforeDelete - NUMBERS.ONE);
});
