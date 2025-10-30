import { test, expect } from '@playwright/test';
import { Logger } from '../helper/logger/Logger';

test('crear una tarea exitosa', async ({page}) => {
    await page.goto('https://srfgsdrges-team.monday.com/my_work');
    await page.getByRole('button', {name: 'Elemento nuevo'}).click();
    await expect(page.locator('#pulse-card-dialog-component')).toBeVisible();
    await page.getByRole('button', {name: 'Crear Tarea'}).click();
});

// TITULO

test('crear una tarea con titulo de mas de 255 caracteres', async ({page}) => {
    await page.goto('https://srfgsdrges-team.monday.com/my_work');
    await page.getByRole('button', {name: 'Elemento nuevo'}).click();
    // await page.locator('#v pulse-attribute-value-text').click();
    const campo = await page.locator('input[value="Agregar Tarea"]');
    await campo.fill('a'.repeat(256));
    await expect(page.locator('#pulse-card-dialog-component')).toBeVisible();
    await page.getByRole('button', {name: 'Crear Tarea'}).click();
});

test('crear una tarea con titulo vacio', async ({page}) => {
    await page.goto('https://srfgsdrges-team.monday.com/my_work');
    await page.getByRole('button', {name: 'Elemento nuevo'}).click();
    const campo = await page.locator('input[value="Agregar Tarea"]');
    await campo.fill('');
    await expect(page.locator('#pulse-card-dialog-component')).toBeVisible();
    await page.getByRole('button', {name: 'Crear Tarea'}).click();
});

// FECHA 

test('crear una tarea con fecha en el pasado', async ({page}) => {
    Logger.initTest('crear una tarea con fecha en el pasado');
    Logger.step(`Navegando a la página: https://srfgsdrges-team.monday.com/my_work`);
    await page.goto('https://srfgsdrges-team.monday.com/my_work');
    await page.getByRole('button', {name: 'Elemento nuevo'}).click();
     const campo = await page.locator('input[value="Agregar Tarea"]');
    await campo.fill('fecha pasada');
    await page.locator('.cell-component').nth(3).click();
    await expect(page.getByTestId('dialog')).toBeVisible();
    const today = new Date();
    const day = today.getDay();
    const dayForSelect = day - 1;
    await page.getByRole('button', {name: 'Crear Tarea'}).click();
});

test('crear una tarea con estado en curso',  { tag: ['@smoke'] },async ({page}) => {
    await page.goto('https://srfgsdrges-team.monday.com/my_work');
    await page.getByRole('button', {name: 'Elemento nuevo'}).click();
    const campo = await page.locator('input[value="Agregar Tarea"]');
    await campo.fill('estado curso');
    await page.locator('#pulse-card-wrapper-component-pulseCard_1').click();
    await page.getByRole('button', {name: 'Crear Tarea'}).click();
});



// aplicar limite superior? 

// bug fechas manuales 1800
// bug grupo completado pero estado no iniciado
// probar combinaciones de grupos y estados
// limite caracteres , titulo vacio, titulo largo, 
// al crear una tarea me lleva al 28 de marzo xd

/* test('test moviendo slots', async ({ page }) => {
    const tarea = await page.locator('.rbc-event-content:has-text(“Tarea 1”)');
    const areaFecha = await page.locator('rbc-day-bg').locator('nth=0');
    tarea.dragTo(areaFecha);
    await page.waitForTimeout(3000);
}); */

// test.fail() 