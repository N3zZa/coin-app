import { test, expect } from '@playwright/test';
import { url } from './url';

test('SearchInput component works correctly', async ({ page }) => {
  // Откроем Story с SearchInput
  await page.goto(url);

  const input = page.locator('input[placeholder="Search by name or symbol..."]');

  // Проверим, что input виден
  await expect(input).toBeVisible();

  // Вводим текст в поле
  await input.fill('Bitcoin');

  // Проверяем, что введенное значение корректное
  await expect(input).toHaveValue('Bitcoin');

  const assetItem = page.locator('table tbody tr:nth-child(2) td div p:has-text("Bitcoin")');
  await expect(assetItem).toBeVisible();
});
