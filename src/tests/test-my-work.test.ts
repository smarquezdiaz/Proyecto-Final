import { Status } from '../enums/statusEnum';
import { test } from '../fixtures/fixtures'
import { Logger } from '../helper/logger/Logger';
import { expect } from '@playwright/test';

/**
 * TC019 crear una tarea exitosa
 * @param campo - The Playwright Page object.
 * @param valor - The Playwright Browser object.
 */

test('TC019 - crear una tarea exitosa',async ({page, myWorkPage}) => {
    Logger.initTest('rear una tarea exitosa');
    Logger.step('Creando tarea')
    await myWorkPage.createElement();
    Logger.termTest('tarea creada exitosamente');
});

// TITULO

/**
 * TC020 Crear una tarea con un titulo valido
 * @param campo - The Playwright Page object.
 * @param valor - The Playwright Browser object.
 */

test('TC020 - crear una tarea con un titulo valido', async ({page, myWorkPage}) => {
    Logger.initTest('crear una tarea con un titulo valido');
    Logger.step('Creando tarea')
    await myWorkPage.createElement('titulo bueno');
    Logger.termTest('tarea creada exitosamente');
});

/**
 * TC021 Crear una tarea con un titulo de mas de 255 caracteres
 * @param campo - The Playwright Page object.
 * @param valor - The Playwright Browser object.
 */

test('TC021 - crear una tarea con un titulo de mas de 255 caracteres', async ({page, myWorkPage}) => {
    Logger.initTest('crear una tarea con un titulo de mas de 255 caracteres');
    Logger.step('Creando tarea')
    await myWorkPage.createElement('a'.repeat(256));
    Logger.termTest('tarea creada exitosamente');
});

/**
 * TC022 Crear una tarea con un titulo vacio
 * @param campo - The Playwright Page object.
 * @param valor - The Playwright Browser object.
 */

test('TC022 - crear una tarea con un titulo vacio', async ({page, myWorkPage}) => {
    Logger.initTest('crear una tarea con un titulo vacio');
    Logger.step('Creando tarea')
    await myWorkPage.createElement('');
    Logger.termTest('tarea creada exitosamente');
});

/**
 * TC023 Crear una tarea con un titulo con 255 caracteres
 * @param campo - The Playwright Page object.
 * @param valor - The Playwright Browser object.
 */

test('TC023 - crear una tarea con un titulo con 255 caracteres', async ({page, myWorkPage}) => {
    Logger.initTest('crear una tarea con un titulo con 255 caracteres');
    Logger.step('Creando tarea')
    await myWorkPage.createElement('a'.repeat(255));
    Logger.termTest('tarea creada exitosamente');
});

/**
 * TC024 Crear una tarea con un titulo con 1 caractere
 * @param campo - The Playwright Page object.
 * @param valor - The Playwright Browser object.
 */

test('TC024 - crear una tarea con un titulo con 1 caracter', async ({page, myWorkPage}) => {
    Logger.initTest('crear una tarea con un titulo con 1 caracter');
    Logger.step('Creando tarea')
    await myWorkPage.createElement('a');
    Logger.termTest('tarea creada exitosamente');
});


// Vencimiento 

/**
 * TC025 crear una tarea con fecha en el pasado
 * @param campo - The Playwright Page object.
 * @param valor - The Playwright Browser object.
 */

test('TC025 - crear una tarea con fecha en el pasado', async ({page, myWorkPage}) => {
    Logger.initTest('crear una tarea con fecha en el pasado');
    Logger.step('Creando tarea')
    await myWorkPage.createElement('fecha pasada', '2025-10-04');
    Logger.termTest('tarea creada exitosamente');
});

// Estado

/**
 * TC026 crear una tarea con estado en curso'
 * @param campo - The Playwright Page object.
 * @param valor - The Playwright Browser object.
 */

test('TC026 - crear una tarea con estado en curso',async ({page, myWorkPage}) => {
    Logger.initTest('crear una tarea con estado en curso');
    Logger.step('Creando tarea')
    await myWorkPage.createElement('estado en curso', undefined, Status.InProgress);
    Logger.termTest('tarea creada exitosamente');
});

/**
 * TC027 crear una tarea con estado listo'
 * @param campo - The Playwright Page object.
 * @param valor - The Playwright Browser object.
 */

test('TC027 - crear una tarea con estado listo',async ({page, myWorkPage}) => {
    Logger.initTest('crear una tarea con estado listo');
    Logger.step('Creando tarea')
    await myWorkPage.createElement('estado listo', undefined, Status.Done);
    Logger.termTest('tarea creada exitosamente');
});

/**
 * TC028 crear una tarea con estado detenido'
 * @param campo - The Playwright Page object.
 * @param valor - The Playwright Browser object.
 */

test('TC028 - crear una tarea con estado detenido',async ({page, myWorkPage}) => {
    Logger.initTest('crear una tarea con estado detenido');
    Logger.step('Creando tarea')
    await myWorkPage.createElement('estado detenido', undefined, Status.Stopped);
    Logger.termTest('tarea creada exitosamente');
});

// Validacion sub elemento de tarea

// titulo 

test('TC046 - crear una subelemento de tarea con titulo valido',async ({page, myWorkPage}) => {
    Logger.initTest('crear un subelemento');
    Logger.step('Creando subelemento')
    await myWorkPage.goto('https://srfgsdrges-team.monday.com/my_work');
    await myWorkPage.createSubelement();
    Logger.termTest('tarea creada exitosamente');
});

test('TC047 - editar el titulo de un subelemento',async ({page, myWorkPage}) => {
    Logger.initTest('crear un subelemento');
    Logger.step('Creando subelemento')
    await myWorkPage.goto('https://srfgsdrges-team.monday.com/my_work');
    const title = 'soy un titulo xd';
    await myWorkPage.createSubelement(title);
    Logger.termTest('tarea creada exitosamente');
});

test('TC048 - crear un subelemento con titulo con 256 caracteres',async ({page, myWorkPage}) => {
    Logger.initTest('crear un subelemento');
    Logger.step('Creando subelemento')
    await myWorkPage.goto('https://srfgsdrges-team.monday.com/my_work');
    const title = 'a'.repeat(256);
    await myWorkPage.createSubelement(title);
    await expect(myWorkPage.warningMessageLongTitle).toBeVisible();
    Logger.termTest('tarea creada exitosamente');
});

test('TC049 - crear un subelemento con titulo vacio',async ({page, myWorkPage}) => {
    Logger.initTest('crear un subelemento');
    Logger.step('Creando subelemento')
    await myWorkPage.goto('https://srfgsdrges-team.monday.com/my_work');
    const title = '';
    await myWorkPage.createSubelement(title);
    await expect(myWorkPage.warningMessageLongTitle).toBeVisible();
    Logger.termTest('tarea creada exitosamente');
});

test('TC050 - crear un subelemento con titulo con espacios en blanco',async ({page, myWorkPage}) => {
    Logger.initTest('crear un subelemento');
    Logger.step('Creando subelemento')
    await myWorkPage.goto('https://srfgsdrges-team.monday.com/my_work');
    const title = '                   ';
    await myWorkPage.createSubelement(title);
    await expect(myWorkPage.warningMessageLongTitle).toBeVisible();
    Logger.termTest('tarea creada exitosamente');
});

test('TC051 - crear un subelemento estado en curso' ,async ({page, myWorkPage}) => {
    Logger.initTest('crear un subelemento');
    Logger.step('Creando subelemento')
    await myWorkPage.goto('https://srfgsdrges-team.monday.com/my_work');
    const status = Status.InProgress;
    await myWorkPage.createSubelement(undefined, status);
    await expect(page.getByText(`${status}`)).toBeVisible();
    // await myWorkPage.deleteSubelement();
    Logger.termTest('tarea creada exitosamente');
});

test('TC052 - crear un subelemento estado detenido' ,async ({page, myWorkPage}) => {
    Logger.initTest('crear un subelemento');
    Logger.step('Creando subelemento')
    await myWorkPage.goto('https://srfgsdrges-team.monday.com/my_work');
    const status = Status.Stopped;
    await myWorkPage.createSubelement(undefined, status);
    await expect(page.getByText(`${status}`)).toBeVisible();
    // await myWorkPage.deleteSubelement();
    Logger.termTest('tarea creada exitosamente');
});

test('TC053 - crear un subelemento estado Listo' ,async ({page, myWorkPage}) => {
    Logger.initTest('crear un subelemento');
    Logger.step('Creando subelemento')
    await myWorkPage.goto('https://srfgsdrges-team.monday.com/my_work');
    const status = Status.Done;
    await myWorkPage.createSubelement(undefined, status);
    await expect(page.getByText(`${status}`)).toBeVisible();
    // await myWorkPage.deleteSubelement();
    Logger.termTest('tarea creada exitosamente');
});

test('TC054 - crear un subelemento con campo numeros exitoso' ,async ({page, myWorkPage}) => {
    Logger.initTest('crear un subelemento');
    Logger.step('Creando subelemento')
    await myWorkPage.goto('https://srfgsdrges-team.monday.com/my_work');
    const numerical = '0.1';
    await myWorkPage.createSubelement(undefined, undefined, numerical);
    await expect(page.getByText(`%${numerical}`)).toBeVisible();
    Logger.termTest('tarea creada exitosamente');
});

test('TC055 - crear un subelemento con campo numeros con caracteres' ,async ({page, myWorkPage}) => {
    Logger.initTest('crear un subelemento');
    Logger.step('Creando subelemento')
    await myWorkPage.goto('https://srfgsdrges-team.monday.com/my_work');
    const numerical = 'e';
    await myWorkPage.createSubelement(undefined, undefined, numerical);
    // await expect(page.getByText(`%${numerical}`)).toBeVisible();
    Logger.termTest('tarea creada exitosamente');
});

test('TC056 - crear un subelemento con campo numeros con caracteres especiales' ,async ({page, myWorkPage}) => {
    Logger.initTest('crear un subelemento');
    Logger.step('Creando subelemento')
    await myWorkPage.goto('https://srfgsdrges-team.monday.com/my_work');
    const numerical = '*';
    await myWorkPage.createSubelement(undefined, undefined, numerical);
    // await expect(page.getByText(`%${numerical}`)).toBeVisible();
    Logger.termTest('tarea creada exitosamente');
});

test('TC057 - crear un subelemento con campo numeros con espacios en blanco' ,async ({page, myWorkPage}) => {
    Logger.initTest('crear un subelemento');
    Logger.step('Creando subelemento')
    await myWorkPage.goto('https://srfgsdrges-team.monday.com/my_work');
    const numerical = '     ';
    await myWorkPage.createSubelement(undefined, undefined, numerical);
    // await expect(page.getByText(`%${numerical}`)).toBeVisible();
    Logger.termTest('tarea creada exitosamente');
});

test('TC058 - verificar que al elimina exitosamente' ,async ({page, myWorkPage}) => {
    Logger.initTest('crear un subelemento');
    Logger.step('Creando subelemento')
    await myWorkPage.goto('https://srfgsdrges-team.monday.com/my_work');
    await myWorkPage.createSubelement();
    await myWorkPage.deleteSubelement();
    await expect(myWorkPage.succeddedMessage).toBeVisible(); 
    Logger.termTest('tarea creada exitosamente');
});

test.fail('TC059 - verificar que al eliminar un subelemento cambia el total' ,async ({page, myWorkPage}) => {
    Logger.initTest('crear un subelemento');
    Logger.step('Creando subelemento')
    await myWorkPage.goto('https://srfgsdrges-team.monday.com/my_work');
    await myWorkPage.createSubelement();
    await myWorkPage.deleteSubelement();
    await expect(myWorkPage.counter).toHaveCount(0); 
    Logger.termTest('tarea creada exitosamente');
});



// bug fechas manuales 1800
// bug grupo completado pero estado no iniciado
// probar combinaciones de grupos y estados
// al crear una tarea me lleva al 28 de marzo xd

/* test('test moviendo slots', async ({ page }) => {
    const tarea = await page.locator('.rbc-event-content:has-text(“Tarea 1”)');
    const areaFecha = await page.locator('rbc-day-bg').locator('nth=0');
    tarea.dragTo(areaFecha);
    await page.waitForTimeout(3000);
}); */