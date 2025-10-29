import { test, expect } from '@playwright/test';

test('crear una tarea exitosa', async ({page}) => {
    await page.goto('https://srfgsdrges-team.monday.com/my_work');
    await page.getByRole('button', {name: 'Elemento nuevo'}).click();
    await expect(page.locator('#pulse-card-dialog-component')).toBeVisible();
    await page.getByRole('button', {name: 'Crear Tarea'}).click();
});

// bug fechas manuales 1800
// bug grupo completado pero estado no iniciado
// probar combinaciones de grupos y estados
// limite caracteres , titulo vacio, titulo largo, 
// al crear una tarea me lleva al 28 de marzo xd

test('test moviendo slots', async ({ page }) => {
    const tarea = await page.locator('.rbc-event-content:has-text(“Tarea 1”)');
    const areaFecha = await page.locator('rbc-day-bg').locator('nth=0');
    tarea.dragTo(areaFecha);
    await page.waitForTimeout(3000);
});