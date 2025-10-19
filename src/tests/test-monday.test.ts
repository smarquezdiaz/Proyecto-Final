import { test, expect } from '@playwright/test';

test('should login with valid credentials', async ({ page }) => {
  await page.goto('https://monday.com/lang/es');
  const loginLink = page.locator("[href*='//auth.monday.com/login']").first();
  await loginLink.click();
  const username = page.locator("#user_email").first();
  await username.fill('srfgsdrge@gmail.com');
  const nextBtn = page.locator("[data-testid='button']");
  await nextBtn.click();
  const password = page.locator("#user_password").first();
  await password.fill('ChocoMei7v7#');
  await nextBtn.click();
  await page.waitForURL('https://srfgsdrges-team.monday.com/');
});