import { expect } from '@playwright/test';
import { test } from '../fixtures/fixtures'
import { Logger } from '../helper/logger/Logger';
import randomstring from 'randomstring';
import { dateFormatted } from "../utils/utils"
import { getTestData } from '../utils/utils';
import Config from '../utils/config';

const testData = getTestData();
const myProfileData = testData.profile;

/**
 * Módulo: Mi Perfil
 * Suite de pruebas para validar la funcionalidad de gestión de los datos y configuraciones del perfil
 */

test.describe('Suite: Validación del campo "Teléfono"', () => {
    Logger.initTestSuite('Iniciando Suite: Validación del campo "Teléfono"');

    /**
     * TC025 Verificar que permita agregar un número de teléfono válido
     * Verificar que se pueda agregar un número de teléfono válido (números enteros) en el perfil del usuario
     */
    test('TC025 - Verificar que permita agregar un número de teléfono válido', 
        {tag: ["@smoke", "@positive", "@regression"],}, async ({page, profilePage}) => {
        Logger.initTest('TC025 - Verificar que permita agregar un número de teléfono válido');
        Logger.step('Actualizando campo teléfono');
        await profilePage.updateField('Teléfono', myProfileData.phone.valid);
        Logger.termTest('TC025 - Teléfono válido agregado exitosamente');
    });

    /**
     * TC026 Verificar que no permita agregar un número de teléfono con 1 dígito
     * Verificar que el sistema muestre un mensaje de error al agregar un número de teléfono de 1 dígito en el perfil del usuario
     */
    test('TC026 - Verificar que no permita agregar un número de teléfono con 1 dígito', 
        {tag: ["@negative", "@regression"],}, async ({page, profilePage}) => {
        Logger.initTest('TC026 - Verificar que no permita agregar un número de teléfono con 1 dígito');
        Logger.step('Intentando agregar teléfono con 1 dígito');
        await profilePage.updateField('Teléfono', myProfileData.phone.invalidShort);
        await profilePage.assertions.expectToBeVisible(profilePage.errorFieldMessage);
        Logger.termTest('TC026 - Validación de teléfono corto completada');
    });

    /**
     * TC027 Verificar que no permita agregar un número de teléfono con caracteres
     * Verificar que el sistema muestre un mensaje de error al agregar un número de teléfono con caracteres en el perfil del usuario
     */
    test('TC027 - Verificar que no permita agregar un número de teléfono con caracteres', 
        {tag: ["@negative", "@regression"],}, async ({page, profilePage}) => {
        Logger.initTest('TC027 - Verificar que no permita agregar un número de teléfono con caracteres');
        Logger.step('Intentando agregar teléfono con caracteres alfabéticos');
        await profilePage.updateField('Teléfono', myProfileData.phone.invalidLetter);
        await profilePage.assertions.expectToBeVisible(profilePage.errorFieldMessage);
        Logger.termTest('TC027 - Validación de caracteres completada');
    });

    /**
     * TC028 Verificar que no permita agregar un número de teléfono con caracteres especiales
     * Verificar que el sistema muestre un mensaje de error al agregar un número de teléfono con caracteres especiales en el perfil del usuario
     */
    test('TC028 - Verificar que no permita agregar un número de teléfono con caracteres especiales', 
        {tag: ["@negative", "@regression"],}, async ({page, profilePage}) => {
        Logger.initTest('TC028 - Verificar que no permita agregar un número de teléfono con caracteres especiales');
        Logger.step('Intentando agregar teléfono con caracteres especiales');
        await profilePage.updateField('Teléfono', myProfileData.phone.invalidSpecialChar);
        await profilePage.assertions.expectToBeVisible(profilePage.errorFieldMessage);
        Logger.termTest('TC028 - Validación de caracteres especiales completada');
    });

    /**
     * TC029 Verificar que no permita agregar un número de teléfono negativo
     * Verificar que el sistema muestre un mensaje de error al agregar un número de teléfono negativo en el perfil del usuario
     */
    test('TC029 - Verificar que no permita agregar un número de teléfono negativo', 
        {tag: ["@negative", "@regression"],}, async ({page, profilePage}) => {
        Logger.initTest('TC029 - Verificar que no permita agregar un número de teléfono negativo');
        Logger.step('Intentando agregar teléfono negativo');
        await profilePage.updateField('Teléfono', myProfileData.phone.invalidNegative);
        await profilePage.assertions.expectToBeVisible(profilePage.errorFieldMessage);
        Logger.termTest('TC029 - Validación de número negativo completada');
    });

    /**
     * TC030 Verificar que no permita agregar un número de teléfono con muchos dígitos
     * Verificar que el sistema muestre un mensaje de error al agregar un número de teléfono excesivamente largo en el perfil del usuario
     */
    test('TC030 - Verificar que no permita agregar un número de teléfono con muchos dígitos', 
        {tag: ["@negative", "@regression"],}, async ({page, profilePage}) => {
        Logger.initTest('TC030 - Verificar que no permita agregar un número de teléfono con muchos dígitos');
        Logger.step('Intentando agregar teléfono con demasiados dígitos');
        await profilePage.updateField('Teléfono', myProfileData.phone.invalidLong);
        await profilePage.assertions.expectToBeVisible(profilePage.errorFieldMessage);
        Logger.termTest('TC030 - Validación de teléfono largo completada');
    });

    Logger.termTestSuite('Finalizando Suite: Validación del campo "Teléfono"');
});

test.describe('Suite: Validación del campo "Ubicación"', () => {
    Logger.initTestSuite('Iniciando Suite: Validación del campo "Ubicación"');

    /**
     * TC031 Verificar que permita agregar una ubicación válida
     * Verificar que se pueda agregar una ubicación válida en el perfil del usuario
     */
    test('TC031 - Verificar que permita agregar una ubicación válida', 
        {tag: ["@smoke", "@positive", "@regression"],}, async ({page, profilePage}) => {
        Logger.initTest('TC031 - Verificar que permita agregar una ubicación válida');
        Logger.step('Actualizando campo ubicación');
        await profilePage.updateField('Ubicación', myProfileData.location.valid);
        Logger.termTest('TC031 - Ubicación válida agregada exitosamente');
    });

    /**
     * TC032 Verificar que no permita agregar una ubicación vacía
     * Verificar que el sistema muestre un mensaje de error al intentar guardar una ubicación vacía en el perfil del usuario
     */
    test('TC032 - Verificar al agregar una ubicacion vacia permita volver a editar', 
        {tag: ["@negative", "@regression"],}, async ({page, profilePage}) => {
        Logger.initTest('TC032 - Verificar que no permita agregar una ubicación vacía');
        Logger.step('Intentando agregar ubicación vacía');
        await profilePage.updateField('Ubicación', myProfileData.location.invalid);
        await profilePage.assertions.expectToBeVisible(profilePage.errorFieldMessage);
        Logger.termTest('TC032 - Validación de ubicación vacía completada');
    });

    /**
     * TC033 Verificar que no permita agregar una ubicación con espacios vacíos
     * Verificar que el sistema muestre un mensaje de error al intentar guardar una ubicación que contiene solo espacios en blanco
     */
    test('TC033 - Verificar que no permita agregar una ubicación con espacios vacíos', 
        {tag: ["@negative", "@regression"],}, async ({page, profilePage}) => {
        Logger.initTest('TC033 - Verificar que no permita agregar una ubicación con espacios vacíos');
        Logger.step('Intentando agregar ubicación con solo espacios');
        await profilePage.updateField('Ubicación', myProfileData.location.invalidSpaces);
        await profilePage.assertions.expectToBeVisible(profilePage.errorFieldMessage);
        Logger.termTest('TC033 - Validación de espacios vacíos completada');
    });

    Logger.termTestSuite('Finalizando Suite: Validación del campo "Ubicación"');
});

test.describe('Suite: Validación del campo "Teléfono Móvil"', () => {
    Logger.initTestSuite('Iniciando Suite: Validación del campo "Teléfono Móvil"');

    /**
     * TC034 Verificar que permita agregar un número de teléfono móvil válido
     * Verificar que se pueda agregar un número de teléfono móvil válido en el perfil del usuario
     */
    test('TC034 - Verificar que permita agregar un número de teléfono móvil válido', 
        {tag: ["@smoke", "@positive", "@regression"],}, async ({page, profilePage}) => {
        Logger.initTest('TC034 - Verificar que permita agregar un número de teléfono móvil válido');
        Logger.step('Actualizando campo teléfono móvil');
        await profilePage.updateField('Teléfono móvil', myProfileData.phone.valid);
        Logger.termTest('TC034 - Teléfono móvil válido agregado exitosamente');
    });

    /**
     * TC035 Verificar que no permita agregar un número de teléfono móvil con 1 dígito
     * Verificar que el sistema muestre un mensaje de error al agregar un número de teléfono móvil de 1 dígito
     */
    test('TC035 - Verificar que no permita agregar un número de teléfono móvil con 1 dígito', 
        {tag: ["@negative", "@regression"],}, async ({page, profilePage}) => {
        Logger.initTest('TC035 - Verificar que no permita agregar un número de teléfono móvil con 1 dígito');
        Logger.step('Intentando agregar teléfono móvil con 1 dígito');
        await profilePage.updateField('Teléfono móvil', myProfileData.phone.invalidShort);
        await profilePage.assertions.expectToBeVisible(profilePage.errorFieldMessage);
        Logger.termTest('TC035 - Validación de teléfono móvil corto completada');
    });

    /**
     * TC036 Verificar que no permita agregar un número de teléfono móvil con caracteres
     * Verificar que el sistema muestre un mensaje de error al agregar un número de teléfono móvil con caracteres alfabéticos
     */
    test('TC036 - Verificar que no permita agregar un número de teléfono móvil con caracteres', 
        {tag: ["@negative", "@regression"],}, async ({page, profilePage}) => {
        Logger.initTest('TC036 - Verificar que no permita agregar un número de teléfono móvil con caracteres');
        Logger.step('Intentando agregar teléfono móvil con caracteres');
        await profilePage.updateField('Teléfono móvil', myProfileData.phone.invalidLetter);
        await profilePage.assertions.expectToBeVisible(profilePage.errorFieldMessage);
        Logger.termTest('TC036 - Validación de caracteres completada');
    });

    /**
     * TC037 Verificar que no permita agregar un número de teléfono móvil con caracteres especiales
     * Verificar que el sistema muestre un mensaje de error al agregar un número de teléfono móvil con caracteres especiales
     */
    test('TC037 - Verificar que no permita agregar un número de teléfono móvil con caracteres especiales', 
        {tag: ["@negative", "@regression"],}, async ({page, profilePage}) => {
        Logger.initTest('TC037 - Verificar que no permita agregar un número de teléfono móvil con caracteres especiales');
        Logger.step('Intentando agregar teléfono móvil con caracteres especiales');
        await profilePage.updateField('Teléfono móvil', myProfileData.phone.invalidSpecialChar);
        await profilePage.assertions.expectToBeVisible(profilePage.errorFieldMessage);
        Logger.termTest('TC037 - Validación de caracteres especiales completada');
    });

    /**
     * TC038 Verificar que no permita agregar un número de teléfono móvil negativo
     * Verificar que el sistema muestre un mensaje de error al agregar un número de teléfono móvil negativo
     */
    test('TC038 - Verificar que no permita agregar un número de teléfono móvil negativo', 
        {tag: ["@negative", "@regression"],}, async ({page, profilePage}) => {
        Logger.initTest('TC038 - Verificar que no permita agregar un número de teléfono móvil negativo');
        Logger.step('Intentando agregar teléfono móvil negativo');
        await profilePage.updateField('Teléfono móvil', myProfileData.phone.invalidNegative);
        await profilePage.assertions.expectToBeVisible(profilePage.errorFieldMessage);
        Logger.termTest('TC038 - Validación de número negativo completada');
    });

    /**
     * TC039 Verificar que no permita agregar un número de teléfono móvil con muchos dígitos
     * Verificar que el sistema muestre un mensaje de error al agregar un número de teléfono móvil excesivamente largo
     */
    test('TC039 - Verificar que no permita agregar un número de teléfono móvil con muchos dígitos', 
        {tag: ["@negative", "@regression"],}, async ({page, profilePage}) => {
        Logger.initTest('TC039 - Verificar que no permita agregar un número de teléfono móvil con muchos dígitos');
        Logger.step('Intentando agregar teléfono móvil con demasiados dígitos');
        await profilePage.updateField('Teléfono móvil', myProfileData.phone.invalidLong);
        await profilePage.assertions.expectToBeVisible(profilePage.errorFieldMessage);
        Logger.termTest('TC039 - Validación de teléfono móvil largo completada');
    });

    Logger.termTestSuite('Finalizando Suite: Validación del campo "Teléfono Móvil"');
});

test.describe('Suite: Validación del campo "Cumpleaños"', () => {
    Logger.initTestSuite('Iniciando Suite: Validación del campo "Cumpleaños"');

    /**
     * TC040 Verificar que permita agregar una fecha de cumpleaños válida
     * Verificar que se pueda agregar una fecha de cumpleaños válida en el perfil del usuario
     */
    test('TC040 - Verificar que permita agregar una fecha de cumpleaños válida', 
        {tag: ["@smoke", "@positive", "@regression"],}, async ({page, profilePage}) => {
        Logger.initTest('TC040 - Verificar que permita agregar una fecha de cumpleaños válida');
        Logger.step('Actualizando fecha de cumpleaños');
        await profilePage.updateDateField('Cumpleaños', myProfileData.dates.validBirthday);
        const expectedDisplayDate = dateFormatted(myProfileData.dates.validBirthday);
        await expect(page.getByText(expectedDisplayDate)).toBeVisible();
        Logger.termTest('TC040 - Fecha de cumpleaños válida agregada exitosamente');
    });

    /**
     * TC041 Verificar que no permita agregar una fecha de cumpleaños con fecha futura
     * Verificar que el sistema muestre un mensaje de error al intentar agregar una fecha de cumpleaños en el futuro
     */
    test('TC041 - Verificar que no permita agregar una fecha de cumpleaños con fecha futura', 
        {tag: ["@negative", "@regression"],}, async ({page, profilePage}) => {
        Logger.initTest('TC041 - Verificar que no permita agregar una fecha de cumpleaños con fecha futura');
        Logger.step('Intentando agregar fecha futura');
        await profilePage.updateDateField('Cumpleaños', myProfileData.dates.invalidFuture);
        await profilePage.assertInvalidDateMessage('Cumpleaños');
        Logger.termTest('TC041 - Validación de fecha futura completada');
    });

    /**
     * TC042 Verificar que no permita agregar una fecha de cumpleaños con año inválido
     * Verificar que el sistema muestre un mensaje de error al intentar agregar una fecha de cumpleaños con un año inválido
     */
    test('TC042 - Verificar que no permita agregar una fecha de cumpleaños con año inválido', 
        {tag: ["@negative", "@regression"],}, async ({page, profilePage}) => {
        Logger.initTest('TC042 - Verificar que no permita agregar una fecha de cumpleaños con año inválido');
        Logger.step('Intentando agregar fecha con año inválido');
        await profilePage.updateDateField('Cumpleaños', myProfileData.dates.invalidYear);
        await profilePage.assertInvalidDateMessage('Cumpleaños');
        Logger.termTest('TC042 - Validación de año inválido completada');
    });

    /**
     * TC043 Verificar que no permita agregar una fecha de cumpleaños con mes inválido
     * Verificar que el sistema corrija o rechace una fecha de cumpleaños con un mes inválido (mayor a 12)
     */
    test('TC043 - Verificar que no permita agregar una fecha de cumpleaños con mes inválido', 
        {tag: ["@negative", "@regression"],}, async ({page, profilePage}) => {
        Logger.initTest('TC043 - Verificar que no permita agregar una fecha de cumpleaños con mes inválido');
        Logger.step('Intentando agregar fecha con mes inválido');
        await profilePage.updateDateField('Cumpleaños', myProfileData.dates.invalidMonth);
        const dateModified = 'Dec 1, 2025';
        await expect(page.getByText(dateModified)).toBeVisible();
        Logger.termTest('TC043 - Validación de mes inválido completada');
    });

    /**
     * TC044 Verificar que no permita agregar una fecha de cumpleaños con día inválido
     * Verificar que el sistema muestre un mensaje de error al intentar agregar una fecha de cumpleaños con un día inválido
     */
    test('TC044 - Verificar que no permita agregar una fecha de cumpleaños con día inválido', 
        {tag: ["@negative", "@regression"],}, async ({page, profilePage}) => {
        Logger.initTest('TC044 - Verificar que no permita agregar una fecha de cumpleaños con día inválido');
        Logger.step('Intentando agregar fecha con día inválido');
        await profilePage.updateDateField('Cumpleaños', myProfileData.dates.invalidDay);
        await profilePage.assertInvalidDateMessage('Cumpleaños');
        Logger.termTest('TC044 - Validación de día inválido completada');
    });

    Logger.termTestSuite('Finalizando Suite: Validación del campo "Cumpleaños"');
});

test.describe('Suite: Validación del campo "Aniversario de trabajo"', () => {
    Logger.initTestSuite('Iniciando Suite: Validación del campo "Aniversario de trabajo"');

    /**
     * TC045 Verificar que permita agregar una fecha de aniversario de trabajo válida
     * Verificar que se pueda agregar una fecha de aniversario de trabajo válida en el perfil del usuario
     */
    test('TC045 - Verificar que permita agregar una fecha de aniversario de trabajo válida', 
        {tag: ["@smoke", "@positive", "@regression"],}, async ({page, profilePage}) => {
        Logger.initTest('TC045 - Verificar que permita agregar una fecha de aniversario de trabajo válida');
        Logger.step('Actualizando fecha de aniversario de trabajo');
        await profilePage.updateDateField('Aniversario de trabajo', myProfileData.dates.validBirthday);
        const expectedDisplayDate = dateFormatted(myProfileData.dates.validBirthday);
        await expect(page.getByText(expectedDisplayDate)).toBeVisible();
        Logger.termTest('TC045 - Fecha de aniversario válida agregada exitosamente');
    });

    /**
     * TC046 Verificar que no permita agregar una fecha de aniversario de trabajo con fecha futura
     * Verificar que el sistema muestre un mensaje de error al intentar agregar una fecha de aniversario en el futuro
     */
    test('TC046 - Verificar que no permita agregar una fecha de aniversario de trabajo con fecha futura', 
        {tag: ["@negative", "@regression"],}, async ({page, profilePage}) => {
        Logger.initTest('TC046 - Verificar que no permita agregar una fecha de aniversario de trabajo con fecha futura');
        Logger.step('Intentando agregar fecha futura');
        await profilePage.updateDateField('Aniversario de trabajo', myProfileData.dates.invalidFuture);
        await profilePage.assertInvalidDateMessage('Aniversario de trabajo');
        Logger.termTest('TC046 - Validación de fecha futura completada');
    });

    /**
     * TC047 Verificar que no permita agregar una fecha de aniversario de trabajo con año inválido
     * Verificar que el sistema muestre un mensaje de error al intentar agregar una fecha de aniversario con un año inválido
     */
    test('TC047 - Verificar que no permita agregar una fecha de aniversario de trabajo con año inválido', 
        {tag: ["@negative", "@regression"],}, async ({page, profilePage}) => {
        Logger.initTest('TC047 - Verificar que no permita agregar una fecha de aniversario de trabajo con año inválido');
        Logger.step('Intentando agregar fecha con año inválido');
        await profilePage.updateDateField('Aniversario de trabajo', myProfileData.dates.invalidYear);
        await profilePage.assertInvalidDateMessage('Aniversario de trabajo');
        Logger.termTest('TC047 - Validación de año inválido completada');
    });

    /**
     * TC048 Verificar que no permita agregar una fecha de aniversario de trabajo con mes inválido
     * Verificar que el sistema corrija o rechace una fecha de aniversario con un mes inválido (mayor a 12)
     */
    test('TC048 - Verificar que no permita agregar una fecha de aniversario de trabajo con mes inválido', 
        {tag: ["@negative", "@regression"],}, async ({page, profilePage}) => {
        Logger.initTest('TC048 - Verificar que no permita agregar una fecha de aniversario de trabajo con mes inválido');
        Logger.step('Intentando agregar fecha con mes inválido');
        await profilePage.updateDateField('Aniversario de trabajo', myProfileData.dates.invalidMonth);
        const dateModified = 'Dec 1, 2025';
        await expect(page.getByText(dateModified)).toBeVisible();
        Logger.termTest('TC048 - Validación de mes inválido completada');
    });

    /**
     * TC049 Verificar que no permita agregar una fecha de aniversario de trabajo con día inválido
     * Verificar que el sistema muestre un mensaje de error al intentar agregar una fecha de aniversario con un día inválido
     */
    test('TC049 - Verificar que no permita agregar una fecha de aniversario de trabajo con día inválido', 
        {tag: ["@negative", "@regression"],}, async ({page, profilePage}) => {
        Logger.initTest('TC049 - Verificar que no permita agregar una fecha de aniversario de trabajo con día inválido');
        Logger.step('Intentando agregar fecha con día inválido');
        await profilePage.updateDateField('Aniversario de trabajo', myProfileData.dates.invalidDay);
        await profilePage.assertInvalidDateMessage('Aniversario de trabajo');
        Logger.termTest('TC049 - Validación de día inválido completada');
    });

    Logger.termTestSuite('Finalizando Suite: Validación del campo "Aniversario de trabajo"');
});

test.describe('Suite: Validación del campo "Contraseña"', () => {
    Logger.initTestSuite('Iniciando Suite: Validación del campo "Contraseña"');

    /**
     * TC051 Verificar que no permita cambiar a una contraseña válida con la contraseña actual incorrecta
     * Verificar que el sistema muestre un mensaje de error cuando se intenta cambiar la contraseña pero la contraseña actual es incorrecta
     */
    test('TC051 - Verificar que no permita cambiar contraseña con contraseña actual incorrecta', 
        {tag: ["@negative", "@regression"],}, async ({page, profilePage}) => {
        Logger.initTest('TC051 - Verificar que no permita cambiar contraseña con contraseña actual incorrecta');
        Logger.step('Intentando cambiar contraseña con contraseña actual incorrecta');
        await profilePage.updatePassword(myProfileData.phone.invalidLetter, myProfileData.password.validNew, myProfileData.password.validNew);
        await expect(profilePage.errorMessage).toBeVisible();
        Logger.termTest('TC051 - Validación de contraseña actual incorrecta completada');
    });

    /**
     * TC052 Verificar que no permita cambiar a una contraseña con menos de 8 caracteres
     * Verificar que el sistema muestre un mensaje de error cuando se intenta establecer una contraseña con menos de 8 caracteres
     */
    test('TC052 - Verificar que no permita cambiar a una contraseña con menos de 8 caracteres', 
        {tag: ["@negative", "@regression"],}, async ({page, profilePage}) => {
        Logger.initTest('TC052 - Verificar que no permita cambiar a una contraseña con menos de 8 caracteres');
        Logger.step('Intentando cambiar a contraseña corta');
        await profilePage.updatePasswordDisabled(myProfileData.password.validNew, myProfileData.password.invalidShort, myProfileData.password.invalidShort);
        await expect(profilePage.passwordErrorMessage).toBeVisible();
        Logger.termTest('TC052 - Validación de contraseña corta completada');
    });

    /**
     * TC053 Verificar que no permita cambiar a una contraseña con carácter repetido
     * Verificar que el sistema muestre un mensaje de error cuando se intenta establecer una contraseña con un solo carácter repetido
     */
    test('TC053 - Verificar que no permita cambiar a una contraseña con carácter repetido', 
        {tag: ["@negative", "@regression"],}, async ({page, profilePage}) => {
        Logger.initTest('TC053 - Verificar que no permita cambiar a una contraseña con carácter repetido');
        Logger.step('Intentando cambiar a contraseña con carácter repetido');
        await profilePage.updatePasswordDisabled(myProfileData.password.validNew, myProfileData.password.invalidRepeated, myProfileData.password.invalidRepeated);
        await expect(profilePage.passwordRepeatedErrorMessage).toBeVisible();
        Logger.termTest('TC053 - Validación de carácter repetido completada');
    });

    /**
     * TC054 Verificar que no permita cambiar a una contraseña con 256 caracteres
     * Verificar que el sistema muestre un mensaje de error cuando se intenta establecer una contraseña excesivamente larga (256+ caracteres)
     */
    test('TC054 - Verificar que no permita cambiar a una contraseña con 256 caracteres', 
        {tag: ["@negative", "@regression"],}, async ({page, profilePage}) => {
        Logger.initTest('TC054 - Verificar que no permita cambiar a una contraseña con 256 caracteres');
        Logger.step('Intentando cambiar a contraseña muy larga');
        const longInvalidPassword = randomstring.generate({length: 260, charset: 'alphanumeric'});
        await profilePage.updatePassword(myProfileData.password.validNew, longInvalidPassword, longInvalidPassword);
        await expect(profilePage.errorMessage).toBeVisible();
        Logger.termTest('TC054 - Validación de contraseña larga completada');
    });

    /**
     * TC055 Verificar que no permita cambiar a una contraseña diferente a la contraseña de confirmación
     * Verificar que el sistema muestre un mensaje de error cuando la nueva contraseña y la confirmación no coinciden
     */
    test('TC055 - Verificar que no permita cambiar contraseña si no coincide con confirmación', 
        {tag: ["@negative", "@regression"],}, async ({page, profilePage}) => {
        Logger.initTest('TC055 - Verificar que no permita cambiar contraseña si no coincide con confirmación');
        Logger.step('Intentando cambiar contraseña con confirmación diferente');
        await profilePage.updatePasswordDisabled(myProfileData.password.validNew, myProfileData.password.validNew, 'contrasena1234');
        await expect(profilePage.passwordMissmatchErrorMessage).toBeVisible();
        Logger.termTest('TC055 - Validación de confirmación diferente completada');
    });

    /**
     * TC050 Verificar que permita cambiar a una contraseña válida
     * Verificar que el sistema permita cambiar la contraseña cuando se proporciona una contraseña válida y la contraseña actual correcta
     */
    test('TC050 - Verificar que permita cambiar a una contraseña válida', 
        {tag: ["@smoke", "@positive", "@regression"],}, async ({page, profilePage}) => {
        Logger.initTest('TC050 - Verificar que permita cambiar a una contraseña válida');
        Logger.step('Actualizando contraseña');
        await profilePage.updatePassword(myProfileData.password.current, myProfileData.password.validNew, myProfileData.password.validNew);
        await expect(profilePage.succeededMessage).toBeVisible();
        Logger.termTest('TC050 - Contraseña cambiada exitosamente');
    });

    /**
     * TC056 Verificar que no permita cambiar a una contraseña con espacios vacíos
     * Verificar que el sistema muestre un mensaje de error cuando se intenta establecer una contraseña que contiene espacios vacíos
     */
    test('TC056 - Verificar que no permita cambiar a una contraseña con espacios vacíos', 
        {tag: ["@negative", "@regression"],}, async ({page, profilePage, loginPage}) => {
        Logger.initTest('TC056 - Verificar que no permita cambiar a una contraseña con espacios vacíos');
        Logger.step('Logueando con nueva contraseña');
        const email = Config.MONDAY_EMAIL || 'srfgsdrge@gmail.com';
        const password = myProfileData.password.validNew;
        await loginPage.login(email, password);
        Logger.step('Intentando cambiar a contraseña con espacios vacíos');
        await profilePage.updatePassword(myProfileData.password.validNew, myProfileData.password.invalidSpaces, myProfileData.password.invalidSpaces);
        await expect(profilePage.errorMessage).toBeVisible();
        Logger.termTest('TC056 - Validación de espacios vacíos completada');
    });

    Logger.termTestSuite('Finalizando Suite: Validación del campo "Contraseña"');
});