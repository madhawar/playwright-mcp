import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ContactPage } from '../pages/ContactPage';
import { UsersAPI } from '../api/UsersAPI';
import { TodoMVCPage } from '../pages/TodoMVCPage';

type TestFixtures = {
  loginPage: LoginPage;
  contactPage: ContactPage;
  usersAPI: UsersAPI;
  todoMVCPage: TodoMVCPage;
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
  todoMVCPage: async ({ page }, use) => {
    const todoMVCPage = new TodoMVCPage(page);
    await use(todoMVCPage);
  },
});

export { expect } from '@playwright/test';