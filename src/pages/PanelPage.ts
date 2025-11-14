import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Config } from '../utils/config';

export class PanelPage extends BasePage {
    cardTitleLocator: (title: string) => Locator;
    optionButton: (title: string) => Locator;

    editableInput: Locator;

    renameMenuItem: Locator;
    duplicateMenuItem: Locator;
    deleteMenuItem: Locator;
    
    warningMessageLongTitle: Locator;
    emptyTitleMessage: Locator;

    constructor(page: Page) {
        super(page);
        
        this.cardTitleLocator = (title: string) => 
            this.locator(`h2.headingComponent_fa18550a3c:has-text("${title}")`);
        
        this.optionButton = (title: string) => 
            this.locator('.overview-section')
                .filter({ has: this.locator(`h2:has-text("${title}")`) })
                .locator('.overview-section-menu.main button[data-testid="button"]')
                .first();
        
        this.editableInput = this.getByTestId('editable-input'); 
        this.renameMenuItem = this.getByRole('menuitem', { name: 'Renombrar' });
        this.duplicateMenuItem = this.getByRole('menuitem', { name: 'Duplicar' });
        this.deleteMenuItem = this.getByRole('menuitem', { name: 'Eliminar' });
        this.warningMessageLongTitle = this.getByText('El título del elemento es muy extenso (máximo 255 caracteres)');
        this.emptyTitleMessage = this.getByText('El nombre no puede estar vacío');
    }

    async goTo() {
        await this.goto(Config.PANEL_URL);
        await this.locator('.overview-section').first().waitFor({ state: 'visible', timeout: 30000 });
    }

    async editCardTitle(originalTitle: string, newTitle: string) {
        const card = this.cardTitleLocator(originalTitle);
        await card.waitFor({ state: 'visible' });
        
        await card.click();
        
        await this.editableInput.waitFor({ state: 'visible'});
        
        await this.editableInput.clear();
        await this.fill(this.editableInput, newTitle);
        await this.editableInput.press('Enter');
    }
    
    async executeCardAction(cardTitle: string, action: 'Duplicar' | 'Eliminar', index: number = 0) {
        const sections = this.locator('.overview-section')
            .filter({ has: this.locator(`h2.headingComponent_fa18550a3c:has-text("${cardTitle}")`) });
        
        await sections.first().waitFor({ state: 'visible', timeout: 15000 });
        
        const count = await sections.count();
        if (count === 0) {
            throw new Error(`No se encontró ninguna tarjeta con el título "${cardTitle}"`);
        }
        
        if (index >= count) {
            throw new Error(`Índice ${index} fuera de límites. Solo hay ${count} tarjeta(s) con el título "${cardTitle}"`);
        }


        const targetSection = sections.nth(index);
        const optionsBtn = targetSection.locator('.overview-section-menu.main button[data-testid="button"]');
        
        await optionsBtn.waitFor({ state: 'visible' });
        await optionsBtn.click();
        
        let menuItem: Locator;
        if (action === 'Duplicar') {
            menuItem = this.duplicateMenuItem;
        } else {
            menuItem = this.deleteMenuItem;
        }
        
        await menuItem.waitFor({ state: 'visible' });
        await menuItem.click();
        
        if (action === 'Eliminar') {
            await targetSection.waitFor({ state: 'detached' });
        }
    }

    async duplicateCardAndWait(cardTitle: string, sourceIndex: number = 0): Promise<number> {
        const initialCount = await this.getCardCount(cardTitle);
        await this.executeCardAction(cardTitle, 'Duplicar', sourceIndex);
        const sectionsLocator = this.locator('.overview-section')
            .filter({ has: this.locator(`h2.headingComponent_fa18550a3c:has-text("${cardTitle}")`) });
        await expect(sectionsLocator).toHaveCount(initialCount + 1, { timeout: 10000 });
        return initialCount;
    }


    async deleteCardAndWait(cardTitle: string, index: number = 0): Promise<void> {
        const initialCount = await this.getCardCount(cardTitle);
        
        if (initialCount === 0) {
            throw new Error(`No se encontró ninguna tarjeta con el título "${cardTitle}" para eliminar`);
        }
        
        if (index >= initialCount) {
            throw new Error(`Índice ${index} fuera de límites. Solo hay ${initialCount} tarjeta(s) con el título "${cardTitle}"`);
        }
        await this.executeCardAction(cardTitle, 'Eliminar', index);
        const sectionsLocator = this.locator('.overview-section')
            .filter({ has: this.locator(`h2.headingComponent_fa18550a3c:has-text("${cardTitle}")`) });
        await expect(sectionsLocator).toHaveCount(initialCount - 1, { timeout: 10000 });
    }

    async getCardCount(cardTitle: string): Promise<number> {
        const sections = this.locator('.overview-section')
            .filter({ has: this.locator(`h2.headingComponent_fa18550a3c:has-text("${cardTitle}")`) });
        
        try {
            await sections.first().waitFor({ state: 'attached', timeout: 5000 });
        } catch {
            return 0;
        }
        
        return await sections.count();
    }

    getCardSectionByIndex(cardTitle: string, index: number): Locator {
        return this.locator('.overview-section')
            .filter({ has: this.locator(`h2.headingComponent_fa18550a3c:has-text("${cardTitle}")`) })
            .nth(index);
    }

    async waitForCardToBeVisible(cardTitle: string, index: number = 0): Promise<void> {
        const cardSection = this.getCardSectionByIndex(cardTitle, index);
        await expect(cardSection).toBeVisible({ timeout: 10000 });
    }

    async waitForCardToBeHidden(cardTitle: string, index: number = 0): Promise<void> {
        const cardSection = this.getCardSectionByIndex(cardTitle, index);
        await expect(cardSection).toBeHidden({ timeout: 10000 });
    }
}