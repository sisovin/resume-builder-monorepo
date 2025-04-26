import { AxePuppeteer } from 'axe-puppeteer';
import { chromium } from 'playwright';

describe('Accessibility Audit', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await chromium.launch();
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  it('should pass accessibility audit', async () => {
    await page.goto('http://localhost:3000');
    const results = await new AxePuppeteer(page).analyze();
    expect(results.violations).toHaveLength(0);
  });
});
