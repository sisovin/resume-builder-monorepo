import { test, expect } from '@playwright/test';

test.describe('Cross-Browser Testing', () => {
  const browsers = ['chromium', 'firefox', 'webkit'];

  browsers.forEach((browserName) => {
    test(`should work on ${browserName}`, async ({ playwright }) => {
      const browser = await playwright[browserName].launch();
      const context = await browser.newContext();
      const page = await context.newPage();

      await page.goto('http://localhost:3000');
      await expect(page).toHaveTitle(/Resume Builder/);

      await browser.close();
    });
  });
});
