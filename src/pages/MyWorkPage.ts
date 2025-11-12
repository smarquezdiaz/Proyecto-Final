import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Config } from '../utils/config';

export class MyWorkPage extends BasePage {
    addElementBtn: Locator;
    titleField: Locator;
    createBtn: Locator;
    dateField: Locator;
    dateDialog: Locator;
    statusField: Locator;
    taskOptionBtn: Locator;
    addSubelementBtn: Locator;
    taskContainer: Locator;
    listSubelements: Locator;
    lastSubelement: Locator;
    titleFieldSubelement: Locator;
    titleInputSubelement: Locator;
    warningMessageLongTitle: Locator;
    counter: Locator;
    emptyTitleMessage: Locator;
    statusFieldSubelement: Locator;
    editSubelementOptions: Locator;
    deleteBtn: Locator;
    succeddedMessage: Locator;
    statusContainer: Locator;
    numericalContainer: Locator;
    numericalInput: Locator;
    tableContainer: Locator;
    dateInput: Locator;
    errorTitleMessage: Locator;
    subelementsContainer: Locator;
    editSubelementDialog: Locator;
    closeBtn: Locator;

    constructor(page: Page) {
        super(page);
        this.tableContainer = this.locator('.table-component crossBoardOverviewSectionView_3');
        this.addElementBtn = this.getByRole('button', {name: 'Elemento nuevo'});
        this.titleField = this.locator('input[value="Agregar Tarea"]');
        this.createBtn = this.getByRole('button', {name: 'Crear Tarea'});
        this.dateField = this.locator('[data-column-id="date"]').locator('.cell-wrapper.can-edit');
        this.dateInput = this.locator("input[aria-label='Date']");
        this.dateDialog = this.getByTestId('dialog');
        this.statusField = this.locator('.pulse-card-cell-wrapper-component:has-text("No iniciado")');
        this.taskOptionBtn = this.locator('button[aria-label="Más opciones para Tarea con subelementos"]');
        this.addSubelementBtn = this.getByRole('menuitem', { name: 'Agregar subelemento' });
        this.taskContainer = this.locator('.nameCellContentContainer--A5D3x').filter({ hasText: 'Tarea con subelementos' });
        this.listSubelements = this.taskContainer.getByTestId('clickable');
        this.warningMessageLongTitle = this.getByText('El título del elemento es muy extenso (máximo 255 caracteres)');
        this.counter = this.taskContainer.locator('.monday-subitems-counter-component__subitems-count');
        this.emptyTitleMessage = this.getByText('El nombre no puede estar vacío');
        this.statusFieldSubelement = this.locator('.cell-wrapper can-edit');
        this.editSubelementOptions = this.locator("button[aria-label='Editar celda']");
        this.deleteBtn = this.getByTestId('menu-item_1');
        this.succeddedMessage = this.getByText('Eliminamos 1 elemento correctamente');
        this.statusContainer = this.locator('.cell-wrapper.can-edit:has(.col-identifier-status)');
        this.numericalContainer = this.locator('.cell-wrapper.can-edit:has(.col-identifier-numeric_mkwsj9fj)');
        this.numericalInput = this.locator('input[inputmode="decimal"]');
        this.errorTitleMessage = this.getByText('No pudimos agregar el elemento, el texto no puede incluir el signo “<”');
        this.subelementsContainer = this.locator('div[data-testid="dialog-content-container"]'); 
        this.editSubelementDialog = this.locator('#pulse-card-dialog-component');
        this.lastSubelement = this.subelementsContainer.locator('.pulse-item').last();
        this.titleFieldSubelement = this.editSubelementDialog.locator('.ds-editable-component.pulse-attribute-value-text > .ds-text-component');
        this.titleInputSubelement = this.locator('.ds-editable-component.pulse-attribute-value-text input');
        this.closeBtn = this.getByRole('button', { name: 'Close' });
    }

    async createElement(title?: string, date?: string, status?: string) {
        await this.goto(Config.WORK_URL);
        await this.isVisible(this.tableContainer);
        await this.click(this.addElementBtn);
        if (title) {
            await this.fill(this.titleField, title);
        }
        if (date) {
            await this.click(this.dateField);
            await this.isVisible(this.dateDialog);
            await this.dateInput.fill(`${date}`);
            await this.dateInput.press('Enter');
        }
        if (status) {
            await this.click(this.statusField);
            const statusOptionLocator = this.dateDialog.getByText(status); 
            await this.click(statusOptionLocator);
        }
        await this.click(this.createBtn);
        if (title && title != " ") {
            await this.isVisible(this.getByText(title));
        }
    }

    async createSubelement(title?: string, status?: string, numerical?: any) {
        await this.goto(Config.WORK_URL);
        await this.taskOptionBtn.waitFor({ state: 'attached' });
        await this.taskOptionBtn.click({ force: false });
        
        await this.waitForLocatorToBeVisible(this.addSubelementBtn);
        await this.addSubelementBtn.click();

        await this.waitForLocatorToBeVisible(this.counter);
        await this.waitForLocatorToBeVisible(this.listSubelements);
        await this.listSubelements.click();
        
        await this.waitForLocatorToBeVisible(this.subelementsContainer);
        await this.waitForLocatorToBeVisible(this.lastSubelement);
        await this.lastSubelement.click();
        
        await this.waitForLocatorToBeVisible(this.editSubelementDialog);
        
        if(title != undefined) {
            await this.titleInputSubelement.fill(title);
            await this.titleInputSubelement.press('Enter');
        }
        
        if(status) {
            await this.waitForLocatorToBeVisible(this.statusContainer);
            await this.statusContainer.click();
            const statusInput = this.locator(`.ds-text-component:has-text("${status}")`);
            await this.waitForLocatorToBeVisible(statusInput);
            await statusInput.click();
        }
        
        if(numerical) {
            await this.waitForLocatorToBeVisible(this.numericalContainer);
            await this.numericalContainer.click();
            await this.waitForLocatorToBeVisible(this.numericalInput);
            await this.numericalInput.clear();
            await this.numericalInput.fill(numerical);
            await this.numericalInput.press('Enter');
        }
    }

    async deleteSubelement() {
        await this.waitForLocatorToBeVisible(this.editSubelementDialog);
        await this.waitForLocatorToBeVisible(this.editSubelementOptions);
        await this.editSubelementOptions.click();
        await this.page.waitForTimeout(5000);
        await this.waitForLocatorToBeVisible(this.deleteBtn);
        await this.deleteBtn.hover();
        await this.page.waitForTimeout(5000);
        await this.deleteBtn.click({force: true});
        await this.page.waitForTimeout(5000);
        await this.waitForLocatorToBeVisible(this.succeddedMessage);
    }

    async deleteElement(title: string) {
        const taskText = this.getByText(title);
        await this.waitForLocatorToBeVisible(taskText);
        const itemMenu = this.getByLabel(`Más opciones para ${title}`);
        await this.waitForLocatorToBeVisible(itemMenu);
        await itemMenu.click();
        const deleteBtn = this.getByRole('menuitem', { name: 'Eliminar' });
        await this.waitForLocatorToBeVisible(deleteBtn);
        await deleteBtn.click();
        const confirmBtn = this.getByRole('button', { name: 'Eliminar' });
        await this.waitForLocatorToBeVisible(confirmBtn);
        await confirmBtn.click();
        const successMsg = this.getByText('Eliminamos 1 elemento correctamente');
        await this.waitForLocatorToBeVisible(successMsg);
    }
}