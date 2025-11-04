import { test } from '../fixtures/fixtures'
import { Logger } from '../helper/logger/Logger';

// campo telefono 

/**
 * TC001 Agregar un numero de telefono valido.
 * @param campo - The Playwright Page object.
 * @param valor - The Playwright Browser object.
 */

test('TC001 - agregar un numero de telefono valido', async ({page, profilePage}) => {
    Logger.initTest('agregar un numero de telefono valido');
    Logger.step('Ingresando a la url');
    await profilePage.goto('https://srfgsdrges-team.monday.com/');
    Logger.step('Actualizando campo telefono')
    await profilePage.updateField('Teléfono', '77968051');
    Logger.termTest('test terminado exitosamente');
});

/**
 * TC001 Agregar un numero de telefono vacio.
 * @param campo - The Playwright Page object.
 * @param valor - The Playwright Browser object.
 */

test('TC002 - agregar un numero de telefono vacio', async ({page, profilePage}) => {
    Logger.initTest('agregar un numero de telefono vacio');
    Logger.step('Ingresando a la url');
    await profilePage.goto('https://srfgsdrges-team.monday.com/');
    Logger.step('Actualizando campo telefono')
    await profilePage.updateField('Teléfono', '');
    Logger.termTest('test terminado exitosamente');
});

/**
 * TC003 Agregar un numero de telefono con 1 digito.
 * @param campo - The Playwright Page object.
 * @param valor - The Playwright Browser object.
 */

test('TC003 - agregar un numero de telefono con 1 digito', async ({page, profilePage}) => {
    Logger.initTest('agregar un numero de telefono con 1 digito');
    Logger.step('Ingresando a la url');
    await profilePage.goto('https://srfgsdrges-team.monday.com/');
    Logger.step('Actualizando campo telefono')
    await profilePage.updateField('Teléfono', '1');
    Logger.termTest('test terminado exitosamente');
});

/**
 * TC004 Agregar un numero de telefono valido.
 * @param campo - The Playwright Page object.
 * @param valor - The Playwright Browser object.
 */

test('TC004 - agregar un numero de telefono con caracteres', async ({page, profilePage}) => {
    Logger.initTest('agregar un numero de telefono con caracteres');
    Logger.step('Ingresando a la url');
    await profilePage.goto('https://srfgsdrges-team.monday.com/');
    Logger.step('Actualizando campo telefono')
    await profilePage.updateField('Teléfono', 'a');
    Logger.termTest('test terminado exitosamente');
});

/**
 * TC005 Agregar un numero de telefono valido.
 * @param campo - The Playwright Page object.
 * @param valor - The Playwright Browser object.
 */

test('TC005 - agregar un numero de telefono con caracteres especiales', async ({page, profilePage}) => {
    Logger.initTest('agregar un numero de telefono con caracteres especiales');
    Logger.step('Ingresando a la url');
    await profilePage.goto('https://srfgsdrges-team.monday.com/');
    Logger.step('Actualizando campo telefono')
    await profilePage.updateField('Teléfono', '%');
    Logger.termTest('test terminado exitosamente');
});

/**
 * TC006 Agregar un numero de telefono valido.
 * @param campo - The Playwright Page object.
 * @param valor - The Playwright Browser object.
 */

test('TC006 - agregar un numero de telefono negativo', async ({page, profilePage}) => {
    Logger.initTest('agregar un numero de telefono negativo');
    Logger.step('Ingresando a la url');
    await profilePage.goto('https://srfgsdrges-team.monday.com/');
    Logger.step('Actualizando campo telefono')
    await profilePage.updateField('Teléfono', '-77968051');
    Logger.termTest('test terminado exitosamente');
});

/**
 * TC007 Agregar un numero de telefono valido.
 * @param campo - The Playwright Page object.
 * @param valor - The Playwright Browser object.
 */

test('TC007 - agregar un numero de telefono con muchos digitos', async ({page, profilePage}) => {
    Logger.initTest('agregar un numero de telefono con muchos digitos');
    Logger.step('Ingresando a la url');
    await profilePage.goto('https://srfgsdrges-team.monday.com/');
    Logger.step('Actualizando campo telefono')
    await profilePage.updateField('Teléfono', '777777777777777777777777777777777777777777777777');
    Logger.termTest('test terminado exitosamente');
});

// Ubicacion 

/**
 * TC008 Agregar un numero de telefono valido.
 * @param campo - The Playwright Page object.
 * @param valor - The Playwright Browser object.
 */

test('TC008 - agregar una ubicacion valida', async ({page, profilePage}) => {
    Logger.initTest('agregar agregar una ubicacion valida');
    Logger.step('Ingresando a la url');
    await profilePage.goto('https://srfgsdrges-team.monday.com/');
    Logger.step('Actualizando campo ubicacion')
    await profilePage.updateField('Ubicación', 'ladislao cabrera');
    Logger.termTest('test terminado exitosamente');
});

/**
 * TC009 Agregar un numero de telefono valido.
 * @param campo - The Playwright Page object.
 * @param valor - The Playwright Browser object.
 */

test('TC009 - agregar una ubicacion vacia', async ({page, profilePage}) => {
    Logger.initTest('agregar agregar una ubicacion vacia');
    Logger.step('Ingresando a la url');
    await profilePage.goto('https://srfgsdrges-team.monday.com/');
    Logger.step('Actualizando campo ubicacion')
    await profilePage.updateField('Ubicación', '');
    Logger.termTest('test terminado exitosamente');
});

/**
 * TC010 Agregar un numero de telefono valido.
 * @param campo - The Playwright Page object.
 * @param valor - The Playwright Browser object.
 */

test.fail('TC010 - agregar una ubicacion con espacios vacios', async ({page, profilePage}) => {
    Logger.initTest('agregar agregar una ubicacion con espacios vacios');
    Logger.step('Ingresando a la url');
    await profilePage.goto('https://srfgsdrges-team.monday.com/');
    Logger.step('Actualizando campo ubicacion')
    await profilePage.updateField('Ubicación', '       ');
    Logger.termTest('test terminado exitosamente');
});

// Telefono movil 

/**
 * TC011 Agregar un numero de telefono valido.
 * @param campo - The Playwright Page object.
 * @param valor - The Playwright Browser object.
 */

test('TC011 - agregar un numero de telefono movil valido', async ({page, profilePage}) => {
    Logger.initTest('agregar un numero de telefono movil valido');
    Logger.step('Ingresando a la url');
    await profilePage.goto('https://srfgsdrges-team.monday.com/');
    Logger.step('Actualizando campo telefono')
    await profilePage.updateField('Teléfono móvil', '77968051');
    Logger.termTest('test terminado exitosamente');
});

/**
 * TC012 Agregar un numero de telefono vacio.
 * @param campo - The Playwright Page object.
 * @param valor - The Playwright Browser object.
 */

test('TC012 - agregar un numero de telefono movil vacio', async ({page, profilePage}) => {
    Logger.initTest('agregar un numero de telefono movil vacio');
    Logger.step('Ingresando a la url');
    await profilePage.goto('https://srfgsdrges-team.monday.com/');
    Logger.step('Actualizando campo telefono')
    await profilePage.updateField('Teléfono móvil', '');
    Logger.termTest('test terminado exitosamente');
});

/**
 * TC014 Agregar un numero de telefono con 1 digito.
 * @param campo - The Playwright Page object.
 * @param valor - The Playwright Browser object.
 */

test('TC013 - agregar un numero de telefono movil con 1 digito', async ({page, profilePage}) => {
    Logger.initTest('agregar un numero de telefono movil con 1 digito');
    Logger.step('Ingresando a la url');
    await profilePage.goto('https://srfgsdrges-team.monday.com/');
    Logger.step('Actualizando campo telefono')
    await profilePage.updateField('Teléfono móvil', '1');
    Logger.termTest('test terminado exitosamente');
});

/**
 * TC015 Agregar un numero de telefono valido.
 * @param campo - The Playwright Page object.
 * @param valor - The Playwright Browser object.
 */

test('TC015 - agregar un numero de telefono movil con caracteres', async ({page, profilePage}) => {
    Logger.initTest('agregar un numero de telefono movil con caracteres');
    Logger.step('Ingresando a la url');
    await profilePage.goto('https://srfgsdrges-team.monday.com/');
    Logger.step('Actualizando campo telefono')
    await profilePage.updateField('Teléfono móvil', 'a');
    Logger.termTest('test terminado exitosamente');
});

/**
 * TC016 Agregar un numero de telefono valido.
 * @param campo - The Playwright Page object.
 * @param valor - The Playwright Browser object.
 */

test('TC016 - agregar un numero de telefono movil con caracteres especiales', async ({page, profilePage}) => {
    Logger.initTest('agregar un numero de telefono movil con caracteres especiales');
    Logger.step('Ingresando a la url');
    await profilePage.goto('https://srfgsdrges-team.monday.com/');
    Logger.step('Actualizando campo telefono')
    await profilePage.updateField('Teléfono móvil', '%');
    Logger.termTest('test terminado exitosamente');
});

/**
 * TC017 Agregar un numero de telefono valido.
 * @param campo - The Playwright Page object.
 * @param valor - The Playwright Browser object.
 */

test('TC017 - agregar un numero de telefono movil negativo', async ({page, profilePage}) => {
    Logger.initTest('agregar un numero de telefono movil negativo');
    Logger.step('Ingresando a la url');
    await profilePage.goto('https://srfgsdrges-team.monday.com/');
    Logger.step('Actualizando campo telefono')
    await profilePage.updateField('Teléfono móvil', '-77968051');
    Logger.termTest('test terminado exitosamente');
});

/**
 * TC018 Agregar un numero de telefono valido.
 * @param campo - The Playwright Page object.
 * @param valor - The Playwright Browser object.
 */

test('TC018 - agregar un numero de telefono movil con muchos digitos', async ({page, profilePage}) => {
    Logger.initTest('agregar un numero de telefono movil con muchos digitos');
    Logger.step('Ingresando a la url');
    await profilePage.goto('https://srfgsdrges-team.monday.com/');
    Logger.step('Actualizando campo telefono')
    await profilePage.updateField('Teléfono móvil', '777777777777777777777777777777777777777777777777');
    Logger.termTest('test terminado exitosamente');
});

// Correo electronico 

