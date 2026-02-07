import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Logger } from '../utils/logger';

export class TodoMVCPage extends BasePage {
  readonly inputField: Locator;
  readonly todoList: Locator;
  readonly todoItems: Locator;
  readonly todoLabels: Locator;
  readonly todoCount: Locator;

  constructor(page: Page) {
    super(page);
    this.inputField = page.locator('.new-todo');
    this.todoList = page.locator('.todo-list');
    this.todoItems = page.locator('.todo-list li');
    this.todoLabels = page.locator('.todo-list li label');
    this.todoCount = page.locator('.todo-count');
  }

  async navigateToApp(): Promise<void> {
    Logger.info('Navigating to TodoMVC application');
    await this.goto('https://demo.playwright.dev/todomvc');
  }

  async addTodo(text: string): Promise<void> {
    Logger.info(`Adding todo: ${text}`);
    await this.inputField.waitFor({ state: 'visible' });
    await this.inputField.fill(text);
    await this.inputField.press('Enter');
  }

  async getTodoItems(): Promise<string[]> {
    Logger.info('Getting all todo items');
    const count = await this.todoLabels.count();
    const items: string[] = [];

    for (let i = 0; i < count; i++) {
      const text = await this.todoLabels.nth(i).textContent();
      if (text) {
        items.push(text);
      }
    }

    return items;
  }

  async getTodoCount(): Promise<number> {
    Logger.info('Getting todo count');
    const count = await this.todoItems.count();
    return count;
  }

  async isTodoVisible(text: string): Promise<boolean> {
    Logger.info(`Checking if todo is visible: ${text}`);
    const todoLocator = this.page.locator('.todo-list li label', { hasText: text });
    return await todoLocator.isVisible();
  }

  async clearInput(): Promise<void> {
    Logger.info('Clearing input field');
    await this.inputField.clear();
  }

  async getInputValue(): Promise<string> {
    Logger.info('Getting input field value');
    return await this.inputField.inputValue();
  }

  async takeScreenshotWithName(name: string): Promise<void> {
    const timestamp = new Date().toISOString().replace(/:/g, '-').replace(/\..+/, '');
    await this.takeScreenshot(`todomvc/${name}-${timestamp}`);
  }
}
