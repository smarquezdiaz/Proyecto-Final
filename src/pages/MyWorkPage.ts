import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

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

    constructor(page: Page) {
        super(page);
        this.tableContainer = this.locator('.table-component crossBoardOverviewSectionView_3');
        this.addElementBtn = this.getByRole('button', {name: 'Elemento nuevo'});
        this.titleField = this.locator('input[value="Agregar Tarea"]');
        this.createBtn = this.getByRole('button', {name: 'Crear Tarea'});
        this.dateField = this.locator('.cell-component').nth(3);
        this.dateDialog = this.getByTestId('dialog');
        this.statusField = this.locator('.pulse-card-cell-wrapper-component:has-text("No iniciado")');
        this.taskOptionBtn = this.locator('button[aria-label="Más opciones para Agregar tarea xd"]');
        this.addSubelementBtn = this.getByTestId('menu-item_7');
        this.taskContainer = this.locator('.nameCellContentContainer--A5D3x').filter({ hasText: 'Agregar tarea xd' });
        this.listSubelements = this.taskContainer.getByTestId('clickable');
        this.lastSubelement = this.locator('.pulse-item').last();
        this.titleFieldSubelement = this.locator('.ds-editable-component.pulse-attribute-value-text > .ds-text-component');
        this.titleInputSubelement = this.locator('input[value="Subelemento"]');
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
    }

    async createElement(title?: string, date?: string, status?: string) {
        await this.goto('https://srfgsdrges-team.monday.com/my_work');
        await this.isVisible(this.tableContainer);
        await this.click(this.addElementBtn);
        if (title) {
            await this.fill(this.titleField, title);
        }
        if (date) {
            await this.click(this.dateField);
            await this.isVisible(this.dateDialog);
            const dateFormmated = new Date(date);
            const day = dateFormmated.getDate();
            const dayBtn = this.page.locator('button', {has: this.page.locator(`text=${day}`)});
            await this.click(dayBtn);
        }
        if (status) {
            await this.click(this.statusField);
            const statusOptionLocator = this.dateDialog.getByText(status); 
            await this.click(statusOptionLocator);
        }
        await this.click(this.createBtn);
        if (title) {
            await this.isVisible(this.getByText(title));
        }
    }

    async createSubelement(title?: string, status?: string, numerical?: any) {
        await this.isVisible(this.taskOptionBtn);
        await this.taskOptionBtn.click({force: true});
        await this.isVisible(this.addSubelementBtn);
        await this.addSubelementBtn.click({force: true});
        await this.isVisible(this.counter);
        await this.isVisible(this.listSubelements);
        await this.click(this.listSubelements);
        await this.isVisible(this.lastSubelement);
        await this.lastSubelement.click();
        if(title) {
            await this.click(this.titleFieldSubelement);
            await this.click(this.titleInputSubelement);
            await this.fill(this.titleInputSubelement, title);
            await this.titleInputSubelement.press('Enter');
        }
        if(status) {
            await this.click(this.statusContainer);
            const statusInput = this.locator(`.ds-text-component:has-text("${status}")`);
            await this.click(statusInput);
        }
        if(numerical) {
            await this.click(this.numericalContainer);
            await this.click(this.numericalInput);
            await this.numericalInput.fill(numerical);
            await this.numericalInput.press('Enter');
        }
    }

    async deleteSubelement() {
        await this.click(this.editSubelementOptions);
        await this.click(this.deleteBtn);
    }

    async deleteElement(title: string) {
        const itemMenu = this.getByLabel(`Más opciones para ${title}`);
        await itemMenu.click();
        const deleteBtn = this.getByRole('menuitem', { name: 'Eliminar' });
        await deleteBtn.click();
        await this.getByRole('button', { name: 'Eliminar' }).click();
        await this.isVisible(this.getByText('Eliminamos 1 elemento correctamente'));
    }
}