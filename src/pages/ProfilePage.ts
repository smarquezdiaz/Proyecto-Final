import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { expect } from '@playwright/test';

export class ProfilePage extends BasePage {
    menu: Locator;
    profileMenu: Locator;
    passwordMenu: Locator;
    currentPasswordField: Locator;
    newPasswordField: Locator;
    confirmPasswordField: Locator;
    submitBtn: Locator;
    succeededMessage: Locator;
    errorMessage: Locator;
    passwordErrorMessage: Locator;
    passwordRepeatedErrorMessage: Locator;
    passwordMissmatchErrorMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.menu = this.getByTestId('topbar-avatar-menu');
        this.profileMenu = this.locator('text="Mi perfil"');
        this.passwordMenu = this.getByTestId('menu-item_4');
        this.currentPasswordField = this.getByTestId('text-field_current-password');
        this.newPasswordField = this.getByTestId('text-field_new-password');
        this.confirmPasswordField = this.getByTestId('text-field_password-confirmation');
        this.submitBtn = this.locator('button:has-text("Guardar")');
        this.succeededMessage = this.locator('text="Password successfully changed"');
        this.errorMessage = this.locator('text="Unknown error in the server"');
        this.passwordErrorMessage = this.locator('text="The password has to contain at least 8 characters"');
        this.passwordRepeatedErrorMessage = this.locator('text="The password cannot have only one letter"');
        this.passwordMissmatchErrorMessage = this.locator('text="La confirmación de contraseña no coincide con la contraseña nueva"');
    }

    async updateField(campo: string, valor: string) {
        await this.click(this.menu);
        await this.click(this.profileMenu);
        const textLocator = this.locator(`text="${campo}"`);
        const phoneContainer = textLocator.locator('..').locator('..');
        await phoneContainer.getByTestId('editable-text').click();
        const actualInput = phoneContainer.locator('input'); 
        await actualInput.fill(`${valor}`);
        await actualInput.press('Enter');
        await this.isVisible(this.getByText(`${valor}`));
    }

    async updateDateField(campo: string, valor: string) {
        await this.click(this.menu);
        await this.click(this.profileMenu);
        const textLocator = this.locator(`text="${campo}"`);
        const fieldContainer = textLocator.locator('..').locator('..');
        await fieldContainer.getByTestId('clickable').click();
        const actualInput = fieldContainer.locator('input, [role="textbox"]').first();
        // await actualInput.fill(`${valor}`);
        await actualInput.pressSequentially(`${valor}`, { delay: 50 });
        await actualInput.press('Enter');
    }

    async updatePasswordDisabled(currentPassword: string, newPassword: string, confirmPassword: string) {
        await this.goToProfileDialog();
        await this.passwordMenu.hover();
        await this.passwordMenu.click({ force: true });
        await this.currentPasswordField.fill(currentPassword);
        await this.newPasswordField.fill(newPassword);
        await this.confirmPasswordField.fill(confirmPassword);
    }

    async updatePassword(currentPassword: string, newPassword: string, confirmPassword: string) {
        await this.goToProfileDialog();
        await this.passwordMenu.hover();
        await this.passwordMenu.click({ force: true });
        await this.currentPasswordField.fill(currentPassword);
        await this.newPasswordField.fill(newPassword);
        await this.confirmPasswordField.fill(confirmPassword);
        await this.submitBtn.click();
    }

    async goToProfileDialog() {
        await this.click(this.menu);
        await this.click(this.profileMenu);
    }

    async assertInvalidDateMessage(campo: string) {
        await expect(this.getByText(`Agregar un ${campo.toLowerCase()}`)).toBeVisible();
    }
}