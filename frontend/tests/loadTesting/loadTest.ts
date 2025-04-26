import { test, expect } from '@playwright/test';

test.describe('Load Testing', () => {
  test('should handle multiple concurrent requests', async ({ page }) => {
    const concurrentRequests = 100;
    const requests = [];

    for (let i = 0; i < concurrentRequests; i++) {
      requests.push(page.goto('/api/health'));
    }

    const responses = await Promise.all(requests);
    responses.forEach((response) => {
      expect(response.status()).toBe(200);
    });
  });

  test('should handle high load on login', async ({ page }) => {
    const concurrentLogins = 50;
    const logins = [];

    for (let i = 0; i < concurrentLogins; i++) {
      logins.push(
        page.goto('/login').then(async () => {
          await page.fill('input[name="email"]', `user${i}@example.com`);
          await page.fill('input[name="password"]', 'password123');
          await page.click('button[type="submit"]');
          await page.waitForNavigation();
          expect(page.url()).toBe('/dashboard');
        })
      );
    }

    await Promise.all(logins);
  });
});
