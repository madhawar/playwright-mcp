import { test, expect } from '../../fixtures/testFixtures';
import { config } from '../../config/env.config';

test.describe('Login Functionality', () => {
    test.beforeEach(async ({ loginPage, contactPage }) => {
        await loginPage.navigate();
    });

    test('should login successfully with valid credentials', async ({ loginPage, contactPage, page }) => {
        await loginPage.login(
            config.users.admin.username,
            config.users.admin.password
        );

        await expect(page).toHaveURL(/.*login/);

        await contactPage.login(
            config.users.admin.username,
            config.users.admin.password
        );

        await expect(page).toHaveURL(/.*login/);
    });

    test('should show error with invalid credentials', async ({ loginPage }) => {
        await loginPage.login('invalid@example.com', 'wrongpass');

        const errorMsg = await loginPage.getErrorMessage();
        expect(errorMsg).toContain('Invalid email or password');
    });

    test('should display login button', async ({ loginPage }) => {
        const isVisible = await loginPage.isLoginButtonVisible();
        expect(isVisible).toBeTruthy();
    });
});