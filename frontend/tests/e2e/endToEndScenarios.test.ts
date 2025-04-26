import { test, expect } from '@playwright/test';

test.describe('End-to-End Scenarios', () => {
  test('should complete the entire user journey', async ({ page }) => {
    // Register a new user
    await page.goto('/register');
    await page.fill('input[name="email"]', 'newuser@example.com');
    await page.fill('input[name="password"]', 'password123');
    await page.fill('input[name="confirmPassword"]', 'password123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/login');

    // Login with the new user
    await page.goto('/login');
    await page.fill('input[name="email"]', 'newuser@example.com');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/dashboard');

    // Create a new resume
    await page.click('button#create-resume');
    await page.fill('input#title', 'New Resume');
    await page.fill('textarea#content', 'This is a new resume.');
    await page.click('button[type="submit"]');
    await page.waitForSelector('.resume-card');
    const newResume = await page.$('.resume-card:has-text("New Resume")');
    expect(newResume).not.toBeNull();

    // Edit the resume
    await newResume.click();
    await page.fill('textarea#content', 'This is an updated resume.');
    await page.click('button[type="submit"]');
    await page.waitForSelector('.resume-card');
    const updatedResume = await page.$('.resume-card:has-text("This is an updated resume.")');
    expect(updatedResume).not.toBeNull();

    // Logout
    await page.click('button#logout');
    await expect(page).toHaveURL('/login');
  });
});
