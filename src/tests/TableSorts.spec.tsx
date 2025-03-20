import { test, expect } from '@playwright/test';
import { url } from './url';
test('sorts table by Price, 24h%, and Market Cap correctly', async ({ page }) => {
  await page.goto(url); // Заменить на твой URL

  // Сортировка по Price
  const priceHeader = page.locator('th:has-text("Price")');
  await priceHeader.click();
  await expect(priceHeader).toHaveClass("cursor-pointer underline text-[#0326A9]");

  const firstPrice = await page.locator('table tbody tr:nth-child(1) td:nth-child(3)').textContent();
  const secondPrice = await page.locator('table tbody tr:nth-child(2) td:nth-child(3)').textContent();
  expect(Number(firstPrice?.replace(/[^0-9.]/g, ''))).toBeGreaterThanOrEqual(
    Number(secondPrice?.replace(/[^0-9.]/g, '')),
  );

  // Сортировка по 24h%
  const volumeHeader = page.locator('th:has-text("24h%")');
  await volumeHeader.click();
  await expect(volumeHeader).toHaveClass("cursor-pointer underline text-[#0326A9]");

  const firstChange = await page.locator('table tbody tr:nth-child(1) td:nth-child(4)').textContent();
  const secondChange = await page.locator('table tbody tr:nth-child(2) td:nth-child(4)').textContent();
  expect(Number(firstChange?.replace('%', ''))).toBeGreaterThanOrEqual(Number(secondChange?.replace('%', '')));

  // Сортировка по Market Cap
  const marketCapHeader = page.locator('th:has-text("Market Cap(USD)")');
  await marketCapHeader.click();
  await expect(marketCapHeader).toHaveClass("cursor-pointer underline text-[#0326A9]");

  const firstCap = await page.locator('table tbody tr:nth-child(1) td:nth-child(5)').textContent();
  const secondCap = await page.locator('table tbody tr:nth-child(2) td:nth-child(5)').textContent();
  expect(Number(firstCap?.replace(/[^0-9.]/g, ''))).toBeGreaterThanOrEqual(Number(secondCap?.replace(/[^0-9.]/g, '')));
});