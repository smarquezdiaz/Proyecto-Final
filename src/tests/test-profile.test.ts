import { expect } from '@playwright/test';
import { test } from '../fixtures/fixtures'
import { Logger } from '../helper/logger/Logger';
import randomstring from 'randomstring';
import { dateFormatted } from "../utils/utils"

/**
 * TC001 Agregar un numero de telefono valido.
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

test('TC036 - agregar una fecha de cumpleanos valida', async ({page, profilePage}) => {
    Logger.initTest('agregar una fecha de cumpleanos valida');
    Logger.step('Ingresando a la url');
    await profilePage.goto('https://srfgsdrges-team.monday.com/');
    Logger.step('Actualizando fecha de cumpleanos')
    const date = '27042001';
    await profilePage.updateDateField('Cumpleaños', date);
    const expectedDisplayDate = dateFormatted(date);
    await expect(page.getByText(expectedDisplayDate)).toBeVisible();
    Logger.termTest('test terminado exitosamente');
});

test.fail('TC037 - verificar que no permitar agregar una fecha de cumpleanos con fecha futura', async ({page, profilePage}) => {
    Logger.initTest('agregar una fecha de cumpleanos con fecha futura');
    Logger.step('Ingresando a la url');  
    await profilePage.goto('https://srfgsdrges-team.monday.com/');
    Logger.step('Actualizando fecha de cumpleanos')
    const date = '23112025';
    const type = 'Cumpleaños';
    await profilePage.updateDateField('Cumpleaños', date);
    await profilePage.assertInvalidDateMessage(type);
    Logger.termTest('test terminado exitosamente');
});

test.fail('TC038 - agregar una fecha de cumpleanos con año inválido', async ({page, profilePage}) => {
    Logger.initTest('agregar una fecha de cumpleanos con año inválido');
    Logger.step('Ingresando a la url');
    await profilePage.goto('https://srfgsdrges-team.monday.com/');
    Logger.step('Actualizando fecha de cumpleanos')
    const date = '231112345';
    const type = 'Cumpleaños';
    await profilePage.updateDateField('Cumpleaños', date);
    await profilePage.assertInvalidDateMessage(type);
    Logger.termTest('test terminado exitosamente');
});

test('TC039 - agregar una fecha de cumpleanos con mes inválido', async ({page, profilePage}) => {
    Logger.initTest('agregar una fecha de cumpleanos con mes inválido');
    Logger.step('Ingresando a la url');
    await profilePage.goto('https://srfgsdrges-team.monday.com/');
    Logger.step('Actualizando fecha de cumpleanos')
    const date = '01152025'
    const type = 'Cumpleaños';
    const dateModified = 'Dec 1, 2025';
    await profilePage.updateDateField(type, date);
    await expect(page.getByText(dateModified)).toBeVisible();
    Logger.termTest('test terminado exitosamente');
});

test('TC040 - agregar una fecha de cumpleanos con día inválido', async ({page, profilePage}) => {
    Logger.initTest('agregar una fecha de cumpleanos con día inválido');
    Logger.step('Ingresando a la url');
    await profilePage.goto('https://srfgsdrges-team.monday.com/');
    Logger.step('Actualizando fecha de cumpleanos');
    const date = '32112025';
    const type = 'Cumpleaños';
    await profilePage.updateDateField(type, date);
    await profilePage.assertInvalidDateMessage(type);
    Logger.termTest('test terminado exitosamente');
});

test('TC041 - agregar una fecha de Aniversario de trabajo valida', async ({page, profilePage}) => {
    Logger.initTest('agregar una fecha de Aniversario de trabajo valida');
    Logger.step('Ingresando a la url');
    await profilePage.goto('https://srfgsdrges-team.monday.com/');
    Logger.step('Actualizando fecha de Aniversario de trabajo')
    const date = '27042001';
    await profilePage.updateDateField('Aniversario de trabajo', date);
    const expectedDisplayDate = dateFormatted(date);
    await expect(page.getByText(expectedDisplayDate)).toBeVisible();
    Logger.termTest('test terminado exitosamente');
});

test.fail('TC042 - verificar que no permitar agregar una fecha de Aniversario de trabajo con fecha futura', async ({page, profilePage}) => {
    Logger.initTest('agregar una fecha de Aniversario de trabajo con fecha futura');
    Logger.step('Ingresando a la url');  
    await profilePage.goto('https://srfgsdrges-team.monday.com/');
    Logger.step('Actualizando fecha de Aniversario de trabajo')
    const date = '23112025';
    const type = 'Aniversario de trabajo';
    await profilePage.updateDateField(type, date);
    await profilePage.assertInvalidDateMessage(type);
    Logger.termTest('test terminado exitosamente');
});

test.fail('TC043 - agregar una fecha de Aniversario de trabajo con año inválido', async ({page, profilePage}) => {
    Logger.initTest('agregar una fecha de Aniversario de trabajo con año inválido');
    Logger.step('Ingresando a la url');
    await profilePage.goto('https://srfgsdrges-team.monday.com/');
    Logger.step('Actualizando fecha de Aniversario de trabajo')
    const date = '231112345';
    const type = 'Aniversario de trabajo';
    await profilePage.updateDateField(type, date);
    await profilePage.assertInvalidDateMessage(type);
    Logger.termTest('test terminado exitosamente');
});

test('TC044 - agregar una fecha de Aniversario de trabajo con mes inválido', async ({page, profilePage}) => {
    Logger.initTest('agregar una fecha de Aniversario de trabajo con mes inválido');
    Logger.step('Ingresando a la url');
    await profilePage.goto('https://srfgsdrges-team.monday.com/');
    Logger.step('Actualizando fecha de Aniversario de trabajo')
    const date = '01152025'
    const type = 'Aniversario de trabajo';
    const dateModified = 'Dec 1, 2025';
    await profilePage.updateDateField(type, date);
    await expect(page.getByText(dateModified)).toBeVisible();
    Logger.termTest('test terminado exitosamente');
});

test('TC045 - agregar una fecha de Aniversario de trabajo con día inválido', async ({page, profilePage}) => {
    Logger.initTest('agregar una fecha de Aniversario de trabajo con día inválido');
    Logger.step('Ingresando a la url');
    await profilePage.goto('https://srfgsdrges-team.monday.com/');
    Logger.step('Actualizando fecha de Aniversario de trabajo');
    const date = '32112025';
    const type = 'Aniversario de trabajo';
    await profilePage.updateDateField(type, date);
    await profilePage.assertInvalidDateMessage(type);
    Logger.termTest('test terminado exitosamente');
});


test('TC029 - cambiar a una contraseña válida', async ({page, profilePage}) => {
    Logger.initTest('cambiar a una contraseña válida');
    Logger.step('Ingresando a la url');
    await page.goto('https://srfgsdrges-team.monday.com/');
    Logger.step('Actualizando contrasena')
    await profilePage.updatePassword('chocomei7v7', 'contrasena123', 'contrasena123');
    await expect(profilePage.succeededMessage).toBeVisible();
    Logger.termTest('test terminado exitosamente');
});

test('TC030 - cambiar a una contraseña válida con la contrasena actual incorrecta', async ({page, profilePage}) => {
    Logger.initTest('cambiar a una contraseña válida con la contrasena actual incorrecta');
    Logger.step('Ingresando a la url');
    await page.goto('https://srfgsdrges-team.monday.com/');
    Logger.step('Actualizando contrasena')
    await profilePage.updatePassword('a', 'contrasena123', 'contrasena123');
    await expect(profilePage.errorMessage).toBeVisible();
    Logger.termTest('test terminado exitosamente');
});

test('TC031 - cambiar a una contraseña con menos de 8 caracteres', async ({page, profilePage}) => {
    Logger.initTest('cambiar a una contraseña con menos de 8 caracteres');
    Logger.step('Ingresando a la url');
    await page.goto('https://srfgsdrges-team.monday.com/');
    Logger.step('Actualizando contrasena')
    await profilePage.updatePasswordDisabled('contrasena123', '123', '123');
    await expect(profilePage.passwordErrorMessage).toBeVisible();
    Logger.termTest('test terminado exitosamente');
});

test('TC032 - cambiar a una contraseña con caracter repetido', async ({page, profilePage}) => {
    Logger.initTest('cambiar a una contraseña con caracter repetido');
    Logger.step('Ingresando a la url');
    await page.goto('https://srfgsdrges-team.monday.com/');
    Logger.step('Actualizando contrasena')
    await profilePage.updatePasswordDisabled('contrasena123', 'aaaaaaaa', 'aaaaaaaa');
    await expect(profilePage.passwordRepeatedErrorMessage).toBeVisible();
    Logger.termTest('test terminado exitosamente');
});

test('TC033 - cambiar a una contraseña con 256 caracteres', async ({page, profilePage}) => {
    Logger.initTest('cambiar a una contraseña con 256 caracteres');
    Logger.step('Ingresando a la url');
    await page.goto('https://srfgsdrges-team.monday.com/');
    Logger.step('Actualizando contrasena');
    const longInvalidPassword = randomstring.generate({length: 260, charset: 'alphanumeric'});
    await profilePage.updatePassword('contrasena123', longInvalidPassword, longInvalidPassword);
    await expect(profilePage.errorMessage).toBeVisible();
    Logger.termTest('test terminado exitosamente');
});

test('TC034 - cambiar a una contraseña diferente a la contraseña de confirmacion', async ({page, profilePage}) => {
    Logger.initTest('cambiar a una contraseña diferente a la contraseña de confirmacion');
    Logger.step('Ingresando a la url');
    await page.goto('https://srfgsdrges-team.monday.com/');
    Logger.step('Actualizando contrasena');
    await profilePage.updatePasswordDisabled('contrasena123', 'contrasena123','contrasena1234' );
    await expect(profilePage.passwordMissmatchErrorMessage).toBeVisible();
    Logger.termTest('test terminado exitosamente');
});

test.fail('TC035 - cambiar a una contraseña con espacios vacios', async ({page, profilePage}) => {
    Logger.initTest('cambiar a una contraseña con espacios vacios');
    Logger.step('Ingresando a la url');
    await page.goto('https://srfgsdrges-team.monday.com/');
    Logger.step('Actualizando contrasena');
    await profilePage.updatePassword('contrasena123', '        A','        A' );
    await expect(profilePage.errorMessage).toBeVisible();
    Logger.termTest('test terminado exitosamente');
});
