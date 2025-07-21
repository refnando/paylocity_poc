import { expect, type Locator, type Page } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { NUMBERS, TIMEOUT } from "../../utils/constants/values";


export class DashboardPage {
  readonly page: Page;
  readonly dashboardTitle: Locator;
  readonly logoutLink: Locator;
  readonly employeeResultsTable: Locator;
  readonly tableRows: Locator;
  readonly firstEditButton: Locator;
  readonly firstDeleteButton: Locator;

  readonly addEmployeeButton: Locator;
  readonly firstNameTextFiled: Locator;
  readonly lastNameTextField: Locator;
  readonly dependentsTextField: Locator;
  readonly addButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dashboardTitle = page.getByRole("link", {
      name: "Paylocity Benefits Dashboard",
    });
    this.logoutLink = page.getByRole("link", { name: "Log Out" });
    this.employeeResultsTable = page
      .getByRole("main")
      .locator("div")
      .filter({ hasText: "Id Last Name First Name" });

    this.tableRows = page.locator("tbody > tr");
    this.firstEditButton = page.locator("tbody > tr:first-child i.fas.fa-edit");
    this.firstDeleteButton = page.locator(
      "tbody > tr:first-child i.fas.fa-times"
    );

    this.addEmployeeButton = page.locator("#add");
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

  async recordsDisplayed(): Promise<boolean> {
    return (await this.tableRows.count()) > NUMBERS.ZERO;
  }

  async currentEmployeesQuantity(): Promise<number> {
    await expect(this.employeeResultsTable).toBeVisible( { timeout: TIMEOUT.FIVE_SECONDS});
    return await this.tableRows.count();
  }

  async waitForRowIncrease(previousCount: number): Promise<void> {
    await expect(this.tableRows).toHaveCount(previousCount + NUMBERS.ONE, {
      timeout: TIMEOUT.FIVE_SECONDS,
    });
  }

  async addNewEmployee() {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const dependents: string = faker.number.int({ min: NUMBERS.ZERO, max: NUMBERS.TEN }).toString();


    await expect(this.addEmployeeButton).toBeVisible({ timeout: TIMEOUT.FIVE_SECONDS });
    await this.addEmployeeButton.click();

    await expect(this.firstNameTextFiled).toBeVisible({ timeout: TIMEOUT.FIVE_SECONDS });
    await this.firstNameTextFiled.fill(firstName);
    await this.lastNameTextField.fill(lastName);
    await this.dependentsTextField.fill(dependents);

    await this.addButton.click();
  }
}
