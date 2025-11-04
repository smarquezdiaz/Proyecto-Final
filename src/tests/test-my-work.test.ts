import { Status } from '../enums/statusEnum';
import { test } from '../fixtures/fixtures'
import { Logger } from '../helper/logger/Logger';

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