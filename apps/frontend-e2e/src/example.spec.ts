import { test, expect } from '@playwright/test';

test('should display chat container', async ({ page }) => {
  await page.goto('/');

  // Check if the chat container is visible
  await expect(page.locator('[data-testid="chat-container"]')).toBeVisible();
});
