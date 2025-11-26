import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { UsersAPI } from '../api/UsersAPI';

type TestFixtures = {
  loginPage: LoginPage;
  usersAPI: UsersAPI;
};

export const test = base.extend<TestFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  usersAPI: async ({ request }, use) => {
    const usersAPI = new UsersAPI(request);
    await use(usersAPI);
  },
});

export { expect } from '@playwright/test';