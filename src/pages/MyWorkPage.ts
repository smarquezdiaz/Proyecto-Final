import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { expect } from '@playwright/test';

export class MyWorkPage extends BasePage {
    addElementBtn: any;
    titleField: any;
    createBtn: any;
    dateField: any;
    dateDialog: any;
    statusField: any;
    // taskOptionBtn: any;
    addSubelementBtn: any;
    taskContainer: any;
    listSubelements: any;
    lastSubelement: any;
    constructor(page: Page) {
        super(page);
        this.addElementBtn = page.getByRole('button', {name: 'Elemento nuevo'});
        this.titleField = page.locator('input[value="Agregar Tarea"]');
        this.createBtn = page.getByRole('button', {name: 'Crear Tarea'});
        this.dateField = page.locator('.cell-component').nth(3);
        this.dateDialog = page.getByTestId('dialog');
        this.statusField = page.locator('.pulse-card-cell-wrapper-component:has-text("No iniciado")');
        // this.taskOptionBtn = page.locator(('button[aria-label="Más opciones para Agregar tarea xd"]'));
        this.addSubelementBtn = page.getByTestId('menu-item_7');
        this.taskContainer = page.locator('.nameCellContentContainer--A5D3x').filter({ hasText: 'Agregar tarea xd' });
        this.listSubelements = this.taskContainer.getByTestId('clickable');
        this.lastSubelement = page.locator('.pulse-item').last();
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

    async createSubelement(title?: string) {
        await this.isVisible(this.page.locator(('button[aria-label="Más opciones para Agregar tarea xd"]')));
        const taskOptionBtn = this.page.locator(('button[aria-label="Más opciones para Agregar tarea xd"]'));
        this.click(taskOptionBtn);
        await this.page.getByTestId('menu-item_7').click();
        this.isVisible(this.listSubelements);
        this.click(this.listSubelements);
        this.isVisible(this.lastSubelement);
        this.lastSubelement.click({force: true});
        await this.lastSubelement.click();
    }
}