import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Logger } from '../utils/logger';
import { config } from '../config/env.config';

export class contactPage extends BasePage {
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessageLogin: Locator;
    readonly errorMessageEmail: Locator;
    readonly errorMessagePassword: Locator;

    constructor(page: Page) {
        super(page);
        this.usernameInput = page.locator('input[data-test="email"]');
        this.passwordInput = page.locator('input[data-test="password"]');
        this.loginButton = page.locator('input[data-test="login-submit"]');
        this.errorMessageLogin = page.locator('//div[@data-test="login-error"]/child::div');
        this.errorMessageEmail = page.locator('//div[@data-test="email-error"]/child::div');
        this.errorMessagePassword = page.locator('//div[@data-test="password-error"]/child::div');
    }

    async navigate(): Promise<void> {
        await this.goto(config.web.baseUrl + `/auth/login`);
    }

    async login(username: string, password: string): Promise<void> {
        Logger.info(`Logging in as: ${username}`);
        await this.fill(this.usernameInput, username);
        await this.fill(this.passwordInput, password);
        await this.click(this.loginButton);
        await this.waitForLoadState();
    }

    async getErrorMessage(): Promise<string> {
        return await this.getText(this.errorMessageLogin);
    }

    async isLoginButtonVisible(): Promise<boolean> {
        return await this.loginButton.isVisible();
    }
}
