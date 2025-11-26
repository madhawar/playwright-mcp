import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ContactPage } from '../pages/ContactPage';
import { UsersAPI } from '../api/UsersAPI';

type TestFixtures = {
  loginPage: LoginPage;
  contactPage: ContactPage;
  usersAPI: UsersAPI;
};

export const test = base.extend<TestFixtures>({
  loginPage: async ({ page }, use) => {
    const _loginPage = new LoginPage(page);
    await use(_loginPage);
  },
  contactPage: async ({ page }, use) => {
    const contactPage = new ContactPage(page);
    await use(contactPage);
  },
  usersAPI: async ({ request }, use) => {
    const usersAPI = new UsersAPI(request);
    await use(usersAPI);
  },
});

export { expect } from '@playwright/test';