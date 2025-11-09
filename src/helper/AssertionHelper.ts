import { Page, Locator, expect } from '@playwright/test';

export class AssertionHelper {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async expectToBeVisible(locator: string | Locator): Promise<void> {
    const element = typeof locator === 'string' ? this.page.getByText(locator) : locator;
    await expect(element).toBeVisible();
  }

  async expectToHaveText(locator: string | Locator, expectedText: string | RegExp): Promise<void> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await expect(element).toHaveText(expectedText);
  }

  async expectToHaveCount(locator: string | Locator, expectedCount: number): Promise<void> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await expect(element).toHaveCount(expectedCount);
  }
}