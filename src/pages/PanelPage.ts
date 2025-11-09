import { Locator, Page } from "@playwright/test";
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
        const sections =  this.locator(`h2.headingComponent_fa18550a3c:has-text("${cardTitle}")`);
        const count = await sections.count();
      
        if (index >= count) {
            throw new Error(`Indice fuera de limites"`);
        }

        const optionsBtn =  this.locator('.overview-section')
                .filter({ has: this.locator(`h2:has-text("${cardTitle}")`) })
                .locator('.overview-section-menu.main button[data-testid="button"]')
                .nth(index);
        
        await optionsBtn.waitFor({ state: 'visible' });
        await optionsBtn.click();
   
        let menuItem: Locator;
        if (action === 'Duplicar') {
            menuItem = this.duplicateMenuItem;
        } else {
            menuItem = this.deleteMenuItem;
        }
        
        await menuItem.waitFor({ state: 'visible'});
        await menuItem.click();
        
        if (action === 'Eliminar') {
            const confirmDeleteBtn = this.getByRole('button', { name: 'Eliminar'});
            await confirmDeleteBtn.waitFor({ state: 'visible', timeout: 10000 });
            await confirmDeleteBtn.click();
        }
    }

    async getCardCount(cardTitle: string): Promise<number> {
        const sections =  this.locator(`h2.headingComponent_fa18550a3c:has-text("${cardTitle}")`);
        return await sections.count();
    }
}