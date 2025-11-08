import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { expect } from '@playwright/test';

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
    constructor(page: Page) {
        super(page);
        this.addElementBtn = page.getByRole('button', {name: 'Elemento nuevo'});
        this.titleField = page.locator('input[value="Agregar Tarea"]');
        this.createBtn = page.getByRole('button', {name: 'Crear Tarea'});
        this.dateField = page.locator('.cell-component').nth(3);
        this.dateDialog = page.getByTestId('dialog');
        this.statusField = page.locator('.pulse-card-cell-wrapper-component:has-text("No iniciado")');
        this.taskOptionBtn = page.locator(('button[aria-label="Más opciones para Agregar tarea xd"]'));
        this.addSubelementBtn = page.getByTestId('menu-item_7');
        this.taskContainer = page.locator('.nameCellContentContainer--A5D3x').filter({ hasText: 'Agregar tarea xd' });
        this.listSubelements = this.taskContainer.getByTestId('clickable');
        this.lastSubelement = page.locator('.pulse-item').last();
        this.titleFieldSubelement = page.locator('.ds-editable-component.pulse-attribute-value-text > .ds-text-component');
        this.titleInputSubelement = page.locator('input[value="Subelemento"]');
        this.warningMessageLongTitle = page.getByText('El título del elemento es muy extenso (máximo 255 caracteres)');
        this.counter = this.taskContainer.locator('.monday-subitems-counter-component__subitems-count');
        this.emptyTitleMessage = page.getByText('El nombre no puede estar vacío');
        this.statusFieldSubelement = page.locator('.cell-wrapper can-edit');
        this.editSubelementOptions = page.locator("button[aria-label='Editar celda']");
        this.deleteBtn = page.getByTestId('menu-item_1');
        this.succeddedMessage = page.getByText('Eliminamos 1 elemento correctamente');
        this.statusContainer = page.locator('.cell-wrapper.can-edit:has(.col-identifier-status)');
        this.numericalContainer = page.locator('.cell-wrapper.can-edit:has(.col-identifier-numeric_mkwsj9fj)');
        this.numericalInput = page.locator('input[inputmode="decimal"]');
    }

    async goto(url: string): Promise<void> {
        await super.goto(url);
    }

    async createElement(title?: string, date?: string, status?: string) {
        await this.goto('https://srfgsdrges-team.monday.com/my_work');
        await this.click(this.addElementBtn);
        if (title) {
            await this.fill(this.titleField, title);
        }
        if (date) {
            await this.click(this.dateField);
            await this.isVisible(this.dateDialog);
            const dateFormmated = new Date(date);
            const day = dateFormmated.getDay();
            console.log(`dia a seleccionar ${day}`);
            const dayBtn = await this.page.locator('button', {has: this.page.locator(`text=${day}`)});
            await this.click(dayBtn);
        }
        if (status) {
            await this.click(this.statusField);
            const statusOptionLocator = this.page.getByTestId('dialog').getByText(status); 
            await this.click(statusOptionLocator);
        }
        await this.click(this.createBtn);
        if (title) {
            await this.isVisible(this.page.getByText(title));
        }
    }

    async createSubelement(title?: string, status?: string, numerical?: any) {
        this.isVisible(this.taskOptionBtn);
        await this.taskOptionBtn.click({force: true});
        this.isVisible(this.addElementBtn);
        await this.addSubelementBtn.click({force: true});
        this.isVisible(this.counter);
        this.isVisible(this.listSubelements);
        this.click(this.listSubelements);
        this.isVisible(this.lastSubelement);
        await this.lastSubelement.click();
        if(title) {
            this.click(this.titleFieldSubelement);
            this.click(this.titleInputSubelement);
            this.fill(this.titleInputSubelement, title);
            await this.titleInputSubelement.press('Enter');
        }
        if(status) {
            this.click(this.statusContainer);
            const statusInput = this.page.locator(`.ds-text-component:has-text("${status}")`);
            this.click(statusInput);
        }
        if(numerical) {
            this.click(this.numericalContainer);
            this.click(this.numericalInput);
            await this.numericalInput.fill(numerical);
            await this.numericalInput.press('Enter');
        }

    }

    async deleteSubelement() {
        this.click(this.editSubelementOptions);
        this.click(this.deleteBtn);
    }
}