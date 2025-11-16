import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly loginLink: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly nextButton: Locator;

  constructor(page: Page) {
    super(page);
    this.loginLink = this.locator("[href*='//auth.monday.com/login']").first();
    this.usernameInput = this.locator("#user_email").first();
    this.passwordInput = this.locator("#user_password").first();
    this.nextButton = this.getByTestId('button');
  }

  async navigate(): Promise<void> {
    await this.goto('https://monday.com/lang/es');
  }

  async clickLoginLink(): Promise<void> {
    await this.click(this.loginLink);
  }

  async enterUsername(email: string): Promise<void> {
    await this.fill(this.usernameInput, email);
  }

  async clickNextButton(): Promise<void> {
    await this.click(this.nextButton);
  }

  async enterPassword(password: string): Promise<void> {
    await this.fill(this.passwordInput, password);
  }

  async login(email: string, password: string): Promise<void> {
    await this.navigate();
    await this.clickLoginLink();
    await this.enterUsername(email);
    await this.clickNextButton();
    await this.enterPassword(password);
    await this.clickNextButton();
  }

  async waitForSuccessfulLogin(expectedUrl: string): Promise<void> {
    await this.page.waitForURL(expectedUrl);
  }
}