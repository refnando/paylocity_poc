import { expect, type Locator, type Page } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { NUMBERS, TIMEOUT } from "../../utils/constants/values";

export class DashboardPage {
  readonly page: Page;
  readonly dashboardTitle: Locator;
  readonly logoutLink: Locator;
  readonly tableRows: Locator;

  readonly addEmployeeButton: Locator;
  readonly firstNameTextFiled: Locator;
  readonly lastNameTextField: Locator;
  readonly dependentsTextField: Locator;
  readonly addButton: Locator;
  readonly updateButton: Locator;
  readonly deleteModalButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dashboardTitle = page.getByRole("link", {
      name: "Paylocity Benefits Dashboard",
    });
    this.logoutLink = page.getByRole("link", { name: "Log Out" });

    this.tableRows = page.locator("tbody > tr");

    this.addEmployeeButton = page.locator("#add");
    this.updateButton = page.locator("#updateEmployee");
    this.deleteModalButton = page.locator("#deleteEmployee");
    this.firstNameTextFiled = page.getByRole("textbox", {
      name: "First Name:",
    });
    this.lastNameTextField = page.getByRole("textbox", { name: "Last Name:" });
    this.dependentsTextField = page.getByRole("textbox", {
      name: "Dependents:",
    });
    this.addButton = page.getByRole("button", { name: "Add", exact: true });
    this.cancelButton = page.getByRole("button", { name: "Cancel" });
  }

  async waitUntilDashboardLoaded(): Promise<void> {
    await expect(this.dashboardTitle).toBeVisible({ timeout: TIMEOUT.FIVE_SECONDS });
    await expect(this.tableRows.nth(NUMBERS.ZERO)).toBeVisible({ timeout: TIMEOUT.TEN_SECONDS });
  }

  async recordsDisplayed(): Promise<boolean> {
    return (await this.tableRows.count()) > NUMBERS.ZERO;
  }

  async currentEmployeesQuantity(): Promise<number> {
    await this.waitUntilDashboardLoaded();
    return await this.tableRows.count();
  }

  async waitForRowIncrease(previousCount: number): Promise<void> {
    await expect(this.tableRows).toHaveCount(previousCount + NUMBERS.ONE, {
      timeout: TIMEOUT.FIVE_SECONDS,
    });
  }

  async addNewEmployee(): Promise<void> {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const dependents = faker.number.int({ min: NUMBERS.ZERO, max: NUMBERS.TEN }).toString();

    await this.waitUntilDashboardLoaded();

    await expect(this.addEmployeeButton).toBeVisible({ timeout: TIMEOUT.FIVE_SECONDS });
    await this.addEmployeeButton.click();

    await expect(this.firstNameTextFiled).toBeVisible({ timeout: TIMEOUT.FIVE_SECONDS });
    await this.firstNameTextFiled.fill(firstName);
    await this.lastNameTextField.fill(lastName);
    await this.dependentsTextField.fill(dependents);

    await this.addButton.click();
    await this.waitUntilDashboardLoaded();
  }

  async editEmployee(rowIndex = NUMBERS.ZERO) {
    const row = this.page.locator("tbody > tr").nth(rowIndex);
    const editButton = row.locator("i.fas.fa-edit");

    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const dependents = faker.number.int({ min: NUMBERS.ZERO, max: NUMBERS.TEN }).toString();

    await this.waitUntilDashboardLoaded();
    await expect(editButton).toBeVisible();
    await editButton.click();

    await this.clearTextField(this.firstNameTextFiled);
    await this.firstNameTextFiled.fill(firstName);
    await this.clearTextField(this.lastNameTextField);
    await this.lastNameTextField.fill(lastName);
    await this.clearTextField(this.dependentsTextField);
    await this.dependentsTextField.fill(dependents);

    await expect(this.updateButton).toBeVisible({ timeout: TIMEOUT.FIVE_SECONDS });
    await expect(this.updateButton).toBeEnabled();
    await this.updateButton.scrollIntoViewIfNeeded();
    await this.updateButton.click();

    await expect(this.updateButton).toBeHidden({ timeout: TIMEOUT.FIVE_SECONDS });
    await this.page.waitForTimeout(TIMEOUT.HALF_SECOND);
    await this.waitUntilDashboardLoaded();

    return { firstName, lastName, dependents };
  }

  async deleteFirstEmployee(): Promise<void> {
    const row = this.page.locator("tbody > tr").nth(NUMBERS.ZERO);
    const deleteButton = row.locator("i.fas.fa-times");

    const initialCount = await this.tableRows.count();
    await this.waitUntilDashboardLoaded();

    await expect(deleteButton).toBeVisible({ timeout: TIMEOUT.FIVE_SECONDS });
    await deleteButton.click();

    await expect(this.deleteModalButton).toBeVisible({ timeout: TIMEOUT.FIVE_SECONDS });
    await this.deleteModalButton.click();

    await this.waitUntilDashboardLoaded();
    await expect(this.tableRows).toHaveCount(initialCount - NUMBERS.ONE, {
      timeout: TIMEOUT.FIVE_SECONDS,
    });
  }

  async clearTextField(field: Locator): Promise<void> {
    await field.click({ clickCount: NUMBERS.THREE });
    await field.press("Backspace");
  }

  async assertFirstRowMatches(data: {
    firstName: string;
    lastName: string;
    dependents: string;
  }) {
    const rowCells = this.page.locator("tbody > tr:first-child td");

    await expect(rowCells.nth(NUMBERS.ONE)).toHaveText(data.firstName, {
      timeout: TIMEOUT.FIVE_SECONDS,
    });
    await expect(rowCells.nth(NUMBERS.TWO)).toHaveText(data.lastName, {
      timeout: TIMEOUT.FIVE_SECONDS,
    });
    await expect(rowCells.nth(NUMBERS.THREE)).toHaveText(data.dependents, {
      timeout: TIMEOUT.FIVE_SECONDS,
    });
  }

  async getFirstRowValues(): Promise<{
    firstName: string;
    lastName: string;
    dependents: string;
  }> {
    const tds = this.page.locator("tbody > tr:first-child td");
    await expect(this.tableRows.nth(NUMBERS.ZERO)).toBeVisible({ timeout: TIMEOUT.FIVE_SECONDS });

    return {
      lastName: await tds.nth(NUMBERS.ONE).innerText(),
      firstName: await tds.nth(NUMBERS.TWO).innerText(),
      dependents: await tds.nth(NUMBERS.THREE).innerText(),
    };
  }

  async getRowValues(rowIndex = NUMBERS.ZERO): Promise<{
    firstName: string;
    lastName: string;
    dependents: string;
  }> {
    const row = this.page.locator("tbody > tr").nth(rowIndex);
    const tds = row.locator("td");

    await expect(tds.nth(NUMBERS.ONE)).toBeVisible();

    return {
      firstName: await tds.nth(NUMBERS.ONE).innerText(),
      lastName: await tds.nth(NUMBERS.TWO).innerText(),
      dependents: await tds.nth(NUMBERS.THREE).innerText(),
    };
  }
}