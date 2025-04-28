import { test, expect } from '@playwright/test';

test.describe('Chat functionality', () => {
  test('should allow setting username and typing a message', async ({
    page,
  }) => {
    await page.goto('/');

    // Wait for the chat container to be visible
    await expect(page.locator('[data-testid="chat-container"]')).toBeVisible();

    // Check that the connection indicator exists
    const connectionIndicator = page.locator(
      '[data-testid="connection-indicator"]'
    );
    await expect(connectionIndicator).toBeVisible();

    // Set username
    const usernameInput = page.locator('[data-testid="username-input"]');
    await expect(usernameInput).toBeVisible();
    await usernameInput.clear();
    await usernameInput.fill('Test User');
    await usernameInput.press('Enter');

    // Type a message in the chat input
    const messageInput = page.locator('[data-testid="message-textarea"]');
    await expect(messageInput).toBeVisible();
    await messageInput.fill('Hello, this is a test message!');

    // Check that the send button is enabled after typing
    const sendButton = page.locator('[data-testid="send-button"]');
    await expect(sendButton).toBeEnabled();

    // Send the message
    await sendButton.click();

    // Check that the message is displayed in the chat
    const message = page.locator('[data-testid^="message-bubble-"]');
    await expect(message).toBeVisible();
    await expect(message).toContainText('Hello, this is a test message!');
  });
});
