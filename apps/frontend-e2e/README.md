# Frontend E2E Tests

E2E tests using Playwright.

## Running Tests

There are several ways to run the tests:

```bash
# Run all tests headlessly
npx playwright test

# Run tests with browser UI visible
npx playwright test --headed

# Run tests with UI mode
npx playwright test --ui

```

## Automatic Server Startup

The `playwright.config.ts` is configured to automatically start both the frontend and backend servers before running tests. This is done through the `webServer` configuration, which:

1. Starts the backend server at `http://localhost:3334`
2. Starts the frontend server at `http://localhost:4200`
3. Runs the tests
4. Shuts down the servers when tests complete

## Test Structure

- `example.spec.ts` - Basic tests for the chat container
- `chat.spec.ts` - Tests for chat functionality (username, messages, etc.)

## Mocking

Tests use mock data from the shared library to simulate API responses. To update the mocks, edit the route handlers in the test files.

## Debug

To debug tests, use the Playwright UI mode:

```bash
npx playwright test --ui
```
