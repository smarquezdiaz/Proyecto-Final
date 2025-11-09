import { Page, Locator } from '@playwright/test';
import { AssertionHelper } from '../helper/AssertionHelper'

export class BasePage {
  readonly page: Page;
  readonly assertions: AssertionHelper; 

  constructor(page: Page) {
    this.page = page;
    this.assertions = new AssertionHelper(page);
  }

  async goto(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async click(locator: Locator): Promise<void> {
    await locator.click();
  }

  async fill(locator: Locator, value: string): Promise<void> {
    await locator.fill(value);
  }

  async isVisible(locator: Locator): Promise<boolean> {
    return await locator.isVisible();
  }

  getByText(text: string | RegExp): Locator {
    return this.page.getByText(text);
  }

  getByRole(role: 'button' | 'heading' | 'dialog' | 'menuitem', options?: { name?: string | RegExp; level?: number }): Locator {
    return this.page.getByRole(role, options);
  }

  getByTestId(testId: string): Locator {
    return this.page.getByTestId(testId);
  }

  getByLabel(text: string | RegExp): Locator {
    return this.page.getByLabel(text);
  }

  locator(selector: string): Locator {
    return this.page.locator(selector);
  }
}