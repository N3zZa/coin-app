import { test, expect } from '@playwright/test';
import { url } from './url';

test('PortfolioModal component works correctly', async ({ page }) => {
  // Откроем Story с SearchInput
  await page.goto(url);

  page.locator('#portfolioInfo').click();
  const modal = page.locator('#portfolioModal');
  
  await expect(modal).toBeVisible();
});
