import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Status } from '../enums/statusEnum'
import { stat } from "fs";

export class MyWorkPage extends BasePage {
    addElementBtn: any;
    titleField: any;
    createBtn: any;
    dateField: any;
    dateDialog: any;
    statusField: any;
    constructor(page: Page) {
        super(page);
        this.addElementBtn = page.getByRole('button', {name: 'Elemento nuevo'});
        this.titleField = page.locator('input[value="Agregar Tarea"]');
        this.createBtn = page.getByRole('button', {name: 'Crear Tarea'});
        this.dateField = page.locator('.cell-component').nth(3);
        this.dateDialog = page.getByTestId('dialog');
        this.statusField = page.locator('.pulse-card-cell-wrapper-component:has-text("No iniciado")');
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
}