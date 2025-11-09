import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { expect } from '@playwright/test';
import { Config } from '../utils/config';

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
        this.profileMenu = this.getByText('Mi perfil');
        this.passwordMenu = this.getByTestId('menu-item_4');
        this.currentPasswordField = this.getByTestId('text-field_current-password');
        this.newPasswordField = this.getByTestId('text-field_new-password');
        this.confirmPasswordField = this.getByTestId('text-field_password-confirmation');
        this.submitBtn = this.getByText('Guardar');
        this.succeededMessage = this.getByText('Password successfully changed');
        this.errorMessage = this.getByText('Unknown error in the server');
        this.passwordErrorMessage = this.getByText('The password has to contain at least 8 characters');
        this.passwordRepeatedErrorMessage = this.getByText('The password cannot have only one letter');
        this.passwordMissmatchErrorMessage = this.getByText('La confirmación de contraseña no coincide con la contraseña nueva');
    }

    async updateField(campo: string, valor: string) {
        await this.goto(Config.BASE_URL);
        await this.click(this.menu);
        await this.click(this.profileMenu);
        const textLocator = this.locator(`text="${campo}"`);
        const phoneContainer = textLocator.locator('..').locator('..');
        const editableText = phoneContainer.getByTestId('editable-text');
        await this.click(editableText);
        const actualInput = phoneContainer.locator('input'); 
        await this.fill(actualInput, valor);
        await actualInput.press('Enter');
        await this.assertions.expectToHaveText(editableText, valor);
    }

    async updateDateField(campo: string, valor: string) {
        await this.goto(Config.BASE_URL);
        await this.click(this.menu);
        await this.click(this.profileMenu);
        const textLocator = this.locator(`text="${campo}"`);
        const fieldContainer = textLocator.locator('..').locator('..');
        const clickableField = fieldContainer.getByTestId('clickable');
        await this.click(clickableField);
        const actualInput = fieldContainer.locator('input, [role="textbox"]').first();
        await actualInput.pressSequentially(valor, { delay: 50 });
        await actualInput.press('Enter');
    }

    async updatePasswordDisabled(currentPassword: string, newPassword: string, confirmPassword: string) {
        await this.goToProfileDialog();
        await this.passwordMenu.hover();
        await this.passwordMenu.click({ force: true });
        await this.fill(this.currentPasswordField, currentPassword);
        await this.fill(this.newPasswordField, newPassword);
        await this.fill(this.confirmPasswordField, confirmPassword);
    }

    async updatePassword(currentPassword: string, newPassword: string, confirmPassword: string) {
        await this.goToProfileDialog();
        await this.passwordMenu.hover();
        await this.passwordMenu.click({ force: true });
        await this.fill(this.currentPasswordField, currentPassword);
        await this.fill(this.newPasswordField, newPassword);
        await this.fill(this.confirmPasswordField, confirmPassword);
        await this.click(this.submitBtn);
    }

    async goToProfileDialog() {
        await this.goto(Config.BASE_URL);
        await this.click(this.menu);
        await this.click(this.profileMenu);
    }

    async assertInvalidDateMessage(campo: string) {
        await expect(this.getByText(`Agregar un ${campo.toLowerCase()}`)).toBeVisible();
    }
}