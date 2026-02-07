import { test, expect } from '@playwright/test';

test('navigate to inputs and add a number', async ({ page }) => {
  // Go to the-internet.herokuapp.com
  await page.goto('https://the-internet.herokuapp.com/');

  // Click on the "Inputs" link
  await page.click('text=Inputs');

  // Verify we're on the inputs page
  await expect(page).toHaveURL(/.*inputs/);

  // Find the input field and enter a number
  await page.locator('input[type="number"]').fill('123');

  // Verify the number was entered
  await expect(page.locator('input[type="number"]')).toHaveValue('123');
});
