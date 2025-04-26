import { test, expect } from '@playwright/test';

test.describe('Resume Editor', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/resume-editor');
  });

  test('should render resume editor', async ({ page }) => {
    await expect(page.locator('text=Template Selector')).toBeVisible();
    await expect(page.locator('text=Color Palette')).toBeVisible();
    await expect(page.locator('role=button[name="Export as PDF"]')).toBeVisible();
  });

  test('should handle form submission', async ({ page }) => {
    await page.click('role=button[name="Save"]');
    await expect(page.locator('text=Auto-saving resume data')).toBeVisible();
  });

  test('should handle color change', async ({ page }) => {
    await page.fill('label=Color Palette', '#ff0000');
    await expect(page.locator('label=Color Palette')).toHaveValue('#ff0000');
  });

  test('should handle template change', async ({ page }) => {
    await page.fill('label=Template Selector', 'template1');
    await expect(page.locator('label=Template Selector')).toHaveValue('template1');
  });

  test('should export PDF', async ({ page }) => {
    await page.click('role=button[name="Export as PDF"]');
    await expect(page.locator('text=Resume')).toBeVisible();
  });
});
