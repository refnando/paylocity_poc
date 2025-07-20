import { type Locator, type Page } from "@playwright/test";

export class LoginPage{
    readonly page: Page;
    readonly userNameTextField: Locator;
    readonly passwordTextField: Locator;
    readonly logInButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.userNameTextField = page.getByRole('textbox', { name: 'Username' });
        this.passwordTextField = page.getByRole('textbox', { name: 'Password' });
        this.logInButton = page.getByRole('button', { name: 'Log In' });
    }
}