import { test, expect } from '../../fixtures/testFixtures';

test.describe('TodoMVC - Add Todo Flow', () => {
  test.beforeEach(async ({ todoMVCPage }) => {
    // Navigate to TodoMVC and take initial screenshot
    await todoMVCPage.navigateToApp();
    await todoMVCPage.takeScreenshotWithName('initial-state');
  });

  test('Successful - Add a single valid todo item', async ({ todoMVCPage }) => {
    // Add a single todo
    await todoMVCPage.addTodo('Buy groceries');

    // Verify it appears in the list
    const isVisible = await todoMVCPage.isTodoVisible('Buy groceries');
    expect(isVisible).toBeTruthy();

    // Verify count is 1
    const count = await todoMVCPage.getTodoCount();
    expect(count).toBe(1);

    // Get all todos and verify
    const todos = await todoMVCPage.getTodoItems();
    expect(todos).toContain('Buy groceries');

    // Take screenshot of success
    await todoMVCPage.takeScreenshotWithName('single-todo-added-success');
  });

  test('Successful - Add multiple todos', async ({ todoMVCPage }) => {
    // Add multiple todos
    await todoMVCPage.addTodo('Buy groceries');
    await todoMVCPage.addTodo('Walk the dog');
    await todoMVCPage.addTodo('Read a book');

    // Verify all 3 items appear
    const todos = await todoMVCPage.getTodoItems();
    expect(todos).toContain('Buy groceries');
    expect(todos).toContain('Walk the dog');
    expect(todos).toContain('Read a book');

    // Verify count shows 3 items
    const count = await todoMVCPage.getTodoCount();
    expect(count).toBe(3);

    // Take screenshot showing all todos
    await todoMVCPage.takeScreenshotWithName('multiple-todos-added-success');
  });

  test('Failing - Empty todo (edge case)', async ({ todoMVCPage }) => {
    // Try to add an empty todo (just press Enter without typing)
    await todoMVCPage.addTodo('');

    // Verify no todo is added
    const count = await todoMVCPage.getTodoCount();
    expect(count).toBe(0);

    // Verify the todo list is empty
    const todos = await todoMVCPage.getTodoItems();
    expect(todos).toHaveLength(0);

    // Take screenshot showing empty state
    await todoMVCPage.takeScreenshotWithName('empty-todo-rejected');
  });

  test('Edge case - Todo with special characters', async ({ todoMVCPage }) => {
    const specialCharTodo = 'Test @#$% & <tags>';

    // Add a todo with special characters
    await todoMVCPage.addTodo(specialCharTodo);

    // Verify it appears correctly with special chars
    const isVisible = await todoMVCPage.isTodoVisible(specialCharTodo);
    expect(isVisible).toBeTruthy();

    // Verify it's in the list
    const todos = await todoMVCPage.getTodoItems();
    expect(todos).toContain(specialCharTodo);

    // Verify count is 1
    const count = await todoMVCPage.getTodoCount();
    expect(count).toBe(1);

    // Take screenshot
    await todoMVCPage.takeScreenshotWithName('special-characters-todo-success');
  });

  test('Edge case - Todo with very long text', async ({ todoMVCPage }) => {
    // Create a todo with 200+ characters
    const longTodo = 'A'.repeat(250) + ' - This is a very long todo item that tests how the application handles extremely long text inputs and whether it truncates or displays them correctly in the user interface';

    // Add the long todo
    await todoMVCPage.addTodo(longTodo);

    // Verify it's added (the app should accept it)
    const count = await todoMVCPage.getTodoCount();
    expect(count).toBe(1);

    // Verify the todo is visible (might be truncated in display)
    const todos = await todoMVCPage.getTodoItems();
    expect(todos.length).toBe(1);
    expect(todos[0]).toBeTruthy();

    // Take screenshot to see how it's displayed
    await todoMVCPage.takeScreenshotWithName('long-text-todo-success');
  });
});
