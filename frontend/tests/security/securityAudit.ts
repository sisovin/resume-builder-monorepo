import { test, expect } from '@playwright/test';

test.describe('Security Audit', () => {
  test('should check for SQL Injection vulnerability', async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[name="email"]', 'user@example.com');
    await page.fill('input[name="password"]', "' OR '1'='1");
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/login');
  });

  test('should check for XSS vulnerability', async ({ page }) => {
    await page.goto('/register');
    await page.fill('input[name="email"]', 'xss@example.com');
    await page.fill('input[name="password"]', 'password123');
    await page.fill('input[name="confirmPassword"]', 'password123');
    await page.fill('input[name="username"]', '<script>alert("XSS")</script>');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/register');
  });

  test('should check for CSRF vulnerability', async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[name="email"]', 'user@example.com');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/dashboard');

    const response = await page.request.post('/api/auth/logout', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    expect(response.status()).toBe(403);
  });

  test('should check for open redirect vulnerability', async ({ page }) => {
    await page.goto('/login?redirect=http://malicious.com');
    await page.fill('input[name="email"]', 'user@example.com');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/dashboard');
  });
});
