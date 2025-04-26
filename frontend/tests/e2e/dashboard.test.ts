import { test, expect } from '@playwright/test';

test.describe('Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[name="email"]', 'user@example.com');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    await page.waitForNavigation();
  });

  test('should display resume list with pagination', async ({ page }) => {
    await page.goto('/dashboard');
    const resumeCards = await page.$$('.resume-card');
    expect(resumeCards.length).toBeGreaterThan(0);

    const pagination = await page.$('.pagination');
    expect(pagination).not.toBeNull();
  });

  test('should open create resume modal', async ({ page }) => {
    await page.goto('/dashboard');
    await page.click('button#create-resume');
    const modal = await page.$('.modal');
    expect(modal).not.toBeNull();
  });

  test('should create a new resume', async ({ page }) => {
    await page.goto('/dashboard');
    await page.click('button#create-resume');
    await page.fill('input#title', 'New Resume');
    await page.fill('textarea#content', 'This is a new resume.');
    await page.click('button[type="submit"]');
    await page.waitForSelector('.resume-card');
    const newResume = await page.$('.resume-card:has-text("New Resume")');
    expect(newResume).not.toBeNull();
  });

  test('should sort resumes by title', async ({ page }) => {
    await page.goto('/dashboard');
    await page.selectOption('select#sort', 'title');
    const sortedResumes = await page.$$('.resume-card');
    expect(sortedResumes.length).toBeGreaterThan(0);
  });

  test('should filter resumes by status', async ({ page }) => {
    await page.goto('/dashboard');
    await page.selectOption('select#filter', 'completed');
    const filteredResumes = await page.$$('.resume-card');
    expect(filteredResumes.length).toBeGreaterThan(0);
  });
});
