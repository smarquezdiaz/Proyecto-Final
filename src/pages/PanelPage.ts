import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Config } from '../utils/config';

export class PanelPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    async editCard() {
        this.goto(Config.PANEL_URL);
        
    }
}