import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProfilePage extends BasePage {
    menu: Locator;
    profileMenu: Locator;

    constructor(page: Page) {
        super(page);
        this.menu = page.getByTestId('topbar-avatar-menu');
        this.profileMenu = page.locator('text="Mi perfil"');
    }

    async goto(url: string): Promise<void> {
        await super.goto(url);
    }

    async updateField(campo: string, valor: string) {
        await this.click(this.menu);
        await this.click(this.profileMenu);
        const textLocator = this.page.locator(`text="${campo}"`);
        const phoneContainer = textLocator.locator('..').locator('..');
        await phoneContainer.getByTestId('editable-text').click();
        const actualInput = phoneContainer.locator('input'); 
        await actualInput.fill(`${valor}`);
        await actualInput.press('Enter');
        await this.isVisible(this.page.getByText(`${valor}`));
    }
}