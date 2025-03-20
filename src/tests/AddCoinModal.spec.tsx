import { test, expect } from '@playwright/test';
import { url } from './url';

test('AddCoinModal component works correctly', async ({ page }) => {
  // Откроем Story с SearchInput
  await page.goto(url);

  page.locator('table tbody tr:nth-child(1) td:nth-child(6) button').click();
  const modal = page.locator('#addcoinmodal');
  
  await expect(modal).toBeVisible();
});
