import { test } from '../fixtures/fixtures';
import { Logger } from '../helper/logger/Logger';
import { expect } from '@playwright/test';
import { getTestData } from '../utils/utils';

const testData = getTestData();
const myWorkData = testData.myWork;

/**
 * Módulo: Panel y generación de informes
 * Suite de pruebas para validar la funcionalidad y gestión del Panel y generación de informes
 */

test.describe('Suite: Validación de la tarjeta "Tareas Importantes"', () => {
    Logger.initTestSuite('Iniciando Suite: Validación de la tarjeta "Tareas Importantes"');

    const CARD_TITLE = 'Tareas Importantes';

    /**
     * TC057 Verificar que permita editar el título del card "Tareas Importantes"
     * Verificar que el sistema permita editar el título de la tarjeta "Tareas Importantes" con un título válido
     */
    test('TC057 - Verificar que permita editar el título del card "Tareas Importantes"', 
        {tag: ["@smoke", "@positive", "@regression"],}, async ({panelPage}) => {
        Logger.initTest('TC057 - Verificar que permita editar el título del card "Tareas Importantes"');
        Logger.step('Editando título de la tarjeta a un valor válido');
        await panelPage.goTo();
        await panelPage.editCardTitle(CARD_TITLE, myWorkData.tasks.title.valid);
        await expect(panelPage.cardTitleLocator(CARD_TITLE)).toBeHidden();
        await panelPage.assertions.expectToBeVisible(panelPage.cardTitleLocator(myWorkData.tasks.title.valid));
        Logger.step('Restaurando título original');
        await panelPage.editCardTitle(myWorkData.tasks.title.valid, CARD_TITLE);
        Logger.termTest('TC057 - Título editado exitosamente');
    });
    
    /**
     * TC058 Verificar que permita editar el título del card "Tareas Importantes" con 255 caracteres
     * Verificar que el sistema permita editar el título de la tarjeta con exactamente 255 caracteres (límite máximo)
     */
    test('TC058 - Verificar que permita editar el título del card "Tareas Importantes" con 255 caracteres', 
        {tag: ["@positive", "@regression"],}, async ({panelPage}) => {
        try {
            Logger.initTest('TC058 - Verificar que permita editar el título del card "Tareas Importantes" con 255 caracteres');
            Logger.step('Editando título a 255 caracteres');
            await panelPage.goTo();
            await panelPage.editCardTitle(CARD_TITLE, myWorkData.tasks.title.validMax);
            await expect(panelPage.cardTitleLocator(CARD_TITLE)).toBeHidden();
            await panelPage.assertions.expectToHaveText(panelPage.cardTitleLocator(myWorkData.tasks.title.validMax), myWorkData.tasks.title.validMax);
            Logger.step('Restaurando título original');
            await panelPage.editCardTitle(myWorkData.tasks.title.validMax, CARD_TITLE);
            Logger.termTest('TC058 - Título con 255 caracteres editado exitosamente');
        } catch (error) {
            Logger.step('Restaurando título original por error');
            await panelPage.editCardTitle(myWorkData.tasks.title.validMax, CARD_TITLE);
            throw error;
        }
    });

    /**
     * TC059 Verificar que se pueda duplicar la tarjeta "Tareas Importantes"
     * Verificar que el sistema permita duplicar la tarjeta "Tareas Importantes" correctamente
     */
    test('TC059 - Verificar que se pueda duplicar la tarjeta "Tareas Importantes"', 
        {tag: ["@positive", "@regression"],}, async ({panelPage}) => {
        Logger.initTest('TC059 - Verificar que se pueda duplicar la tarjeta "Tareas Importantes"');
        
        await panelPage.goTo();
        
        Logger.step('Verificando cantidad inicial de tarjetas');
        const initialCount = await panelPage.getCardCount(CARD_TITLE);
        Logger.step(`Cantidad inicial: ${initialCount}`);
        
        Logger.step('Duplicando tarjeta y esperando confirmación en el DOM');
        const newCardIndex = await panelPage.duplicateCardAndWait(CARD_TITLE, 0);
        
        Logger.step('Verificando que se haya duplicado correctamente');
        const finalCount = await panelPage.getCardCount(CARD_TITLE);
        Logger.step(`Cantidad final: ${finalCount}`);
        expect(finalCount).toBe(initialCount + 1);
        
        Logger.step(`Eliminando tarjeta duplicada (índice ${newCardIndex})`);
        await panelPage.deleteCardAndWait(CARD_TITLE, newCardIndex);
        
        Logger.step('Verificando que se eliminó correctamente');
        const countAfterDelete = await panelPage.getCardCount(CARD_TITLE);
        expect(countAfterDelete).toBe(initialCount);
        
        Logger.termTest('TC059 - Tarjeta duplicada y eliminada exitosamente');
    });
    
    /**
     * TC060 Verificar que no permita editar el título del card "Tareas Importantes" con más de 255 caracteres
     * Verificar que el sistema muestre un mensaje de error cuando se intenta editar el título con más de 255 caracteres
     */
    test('TC060 - Verificar que no permita editar el título del card "Tareas Importantes" con más de 255 caracteres', 
        {tag: ["@negative", "@regression"],}, async ({panelPage}) => {
        try {
            Logger.initTest('TC060 - Verificar que no permita editar el título del card "Tareas Importantes" con más de 255 caracteres');
            Logger.step('Intentando editar título con más de 255 caracteres');
            await panelPage.goTo();
            await panelPage.editCardTitle(CARD_TITLE, myWorkData.tasks.title.invalidLong);
            await panelPage.assertions.expectToBeVisible(panelPage.warningMessageLongTitle);
            Logger.termTest('TC060 - Validación de título largo completada');
        } catch (error) {
            Logger.step('Restaurando título original por error');
            await panelPage.editCardTitle(myWorkData.tasks.title.invalidLong, CARD_TITLE);
            throw error;
        }
    });

    /**
     * TC062 Verificar que se pueda eliminar una tarjeta duplicada "Tareas Importantes"
     * Verificar que el sistema permita eliminar correctamente una tarjeta que fue previamente duplicada
     */
    test('TC062 - Verificar que se pueda eliminar una tarjeta duplicada "Tareas Importantes"', 
        {tag: ["@positive", "@regression"],}, async ({panelPage}) => {
        Logger.initTest('TC062 - Verificar que se pueda eliminar una tarjeta duplicada "Tareas Importantes"');
        
        await panelPage.goTo();
        
        Logger.step('Obteniendo conteo inicial');
        const initialCount = await panelPage.getCardCount(CARD_TITLE);
        Logger.step(`Conteo inicial: ${initialCount}`);
        
        Logger.step('Duplicando tarjeta');
        const duplicatedIndex = await panelPage.duplicateCardAndWait(CARD_TITLE, 0);
        Logger.step(`Tarjeta duplicada en índice: ${duplicatedIndex}`);
        
        Logger.step('Verificando que la duplicación fue exitosa');
        const countAfterDuplicate = await panelPage.getCardCount(CARD_TITLE);
        Logger.step(`Conteo después de duplicar: ${countAfterDuplicate}`);
        expect(countAfterDuplicate).toBe(initialCount + 1);
        
        Logger.step('Eliminando tarjeta duplicada');
        await panelPage.deleteCardAndWait(CARD_TITLE, duplicatedIndex);
        
        Logger.step('Verificando que la eliminación fue exitosa');
        const finalCount = await panelPage.getCardCount(CARD_TITLE);
        Logger.step(`Conteo final: ${finalCount}`);
        expect(finalCount).toBe(initialCount);
        
        Logger.termTest('TC062 - Tarjeta duplicada eliminada exitosamente');
    });

    /**
     * TC061 Verificar que no permita dejar el título vacío del card "Tareas Importantes"
     * Verificar que el sistema muestre un mensaje de error cuando se intenta dejar el título vacío (solo espacios en blanco)
     */
    test('TC061 - Verificar que no permita dejar el título vacío del card "Tareas Importantes"', 
        {tag: ["@negative", "@regression"],}, async ({panelPage}) => {
        try {
            Logger.initTest('TC061 - Verificar que no permita dejar el título vacío del card "Tareas Importantes"');
            Logger.step('Intentando dejar título vacío');
            await panelPage.goTo();
            await panelPage.editCardTitle(CARD_TITLE, myWorkData.tasks.title.invalid);
            await panelPage.assertions.expectToBeVisible(panelPage.emptyTitleMessage);
            Logger.termTest('TC061 - Validación de título vacío completada');
        } catch (error) {
            Logger.step('Restaurando título original por error');
            await panelPage.editCardTitle(myWorkData.tasks.title.invalid, CARD_TITLE);
            throw error;
        }
    });

    Logger.termTestSuite('Finalizando Suite: Validación de la tarjeta "Tareas Importantes"');
});

test.describe('Suite: Validación de la tarjeta "En Curso"', () => {
    Logger.initTestSuite('Iniciando Suite: Validación de la tarjeta "En Curso"');

    const CARD_TITLE = myWorkData.tasks.status.inProgress;

    /**
     * TC063 Verificar que permita editar el título del card "En Curso"
     * Verificar que el sistema permita editar el título de la tarjeta "En Curso" con un título válido
     */
    test('TC063 - Verificar que permita editar el título del card "En Curso"', 
        {tag: ["@smoke", "@positive", "@regression"],}, async ({panelPage}) => {
        Logger.initTest('TC063 - Verificar que permita editar el título del card "En Curso"');
        Logger.step('Editando título de la tarjeta a un valor válido');
        await panelPage.goTo();
        await panelPage.editCardTitle(CARD_TITLE, myWorkData.tasks.title.valid);
        await expect(panelPage.cardTitleLocator(CARD_TITLE)).toBeHidden();
        await panelPage.assertions.expectToBeVisible(panelPage.cardTitleLocator(myWorkData.tasks.title.valid));
        Logger.step('Restaurando título original');
        await panelPage.editCardTitle(myWorkData.tasks.title.valid, CARD_TITLE);
        Logger.termTest('TC063 - Título editado exitosamente');
    });
    
    /**
     * TC064 Verificar que permita editar el título del card "En Curso" con 255 caracteres
     * Verificar que el sistema permita editar el título de la tarjeta con exactamente 255 caracteres (límite máximo)
     */
    test('TC064 - Verificar que permita editar el título del card "En Curso" con 255 caracteres', 
        {tag: ["@positive", "@regression"],}, async ({panelPage}) => {
        try {
            Logger.initTest('TC064 - Verificar que permita editar el título del card "En Curso" con 255 caracteres');
            Logger.step('Editando título a 255 caracteres');
            await panelPage.goTo();
            await panelPage.editCardTitle(CARD_TITLE, myWorkData.tasks.title.validMax);
            await expect(panelPage.cardTitleLocator(CARD_TITLE)).toBeHidden();
            await panelPage.assertions.expectToHaveText(panelPage.cardTitleLocator(myWorkData.tasks.title.validMax), myWorkData.tasks.title.validMax);
            Logger.step('Restaurando título original');
            await panelPage.editCardTitle(myWorkData.tasks.title.validMax, CARD_TITLE);
            Logger.termTest('TC064 - Título con 255 caracteres editado exitosamente');
        } catch (error) {
            Logger.step('Restaurando título original por error');
            await panelPage.editCardTitle(myWorkData.tasks.title.validMax, CARD_TITLE);
            throw error;
        }
    });

    /**
     * TC065 Verificar que se pueda duplicar la tarjeta "En Curso"
     * Verificar que el sistema permita duplicar la tarjeta "En Curso" correctamente
     */
    test('TC065 - Verificar que se pueda duplicar la tarjeta "En Curso"', 
        {tag: ["@positive", "@regression"],}, async ({panelPage}) => {
        Logger.initTest('TC065 - Verificar que se pueda duplicar la tarjeta "En Curso"');
        
        await panelPage.goTo();
        
        Logger.step('Obteniendo conteo inicial');
        const initialCount = await panelPage.getCardCount(CARD_TITLE);
        
        Logger.step('Duplicando tarjeta');
        const duplicatedIndex = await panelPage.duplicateCardAndWait(CARD_TITLE, 0);
        
        Logger.step('Verificando duplicación exitosa');
        const countAfterDuplicate = await panelPage.getCardCount(CARD_TITLE);
        expect(countAfterDuplicate).toBe(initialCount + 1);
        
        Logger.step('Eliminando tarjeta duplicada');
        await panelPage.deleteCardAndWait(CARD_TITLE, duplicatedIndex);
        
        Logger.termTest('TC065 - Tarjeta duplicada y eliminada exitosamente');
    });
    
    /**
     * TC066 Verificar que no permita editar el título del card "En Curso" con más de 255 caracteres
     * Verificar que el sistema muestre un mensaje de error cuando se intenta editar el título con más de 255 caracteres
     */
    test('TC066 - Verificar que no permita editar el título del card "En Curso" con más de 255 caracteres', 
        {tag: ["@negative", "@regression"],}, async ({panelPage}) => {
        try {
            Logger.initTest('TC066 - Verificar que no permita editar el título del card "En Curso" con más de 255 caracteres');
            Logger.step('Intentando editar título con más de 255 caracteres');
            await panelPage.goTo();
            await panelPage.editCardTitle(CARD_TITLE, myWorkData.tasks.title.invalidLong);
            await panelPage.assertions.expectToBeVisible(panelPage.warningMessageLongTitle);
            Logger.termTest('TC066 - Validación de título largo completada');
        } catch (error) {
            Logger.step('Restaurando título original por error');
            await panelPage.editCardTitle(myWorkData.tasks.title.invalidLong, CARD_TITLE);
            throw error;
        }
    });

    /**
     * TC068 Verificar que se pueda eliminar una tarjeta duplicada "En Curso"
     * Verificar que el sistema permita eliminar correctamente una tarjeta que fue previamente duplicada
     */
    test('TC068 - Verificar que se pueda eliminar una tarjeta duplicada "En Curso"', 
        {tag: ["@positive", "@regression"],}, async ({panelPage}) => {
        Logger.initTest('TC068 - Verificar que se pueda eliminar una tarjeta duplicada "En Curso"');
        
        await panelPage.goTo();
        const initialCount = await panelPage.getCardCount(CARD_TITLE);
        
        Logger.step('Duplicando tarjeta');
        const duplicatedIndex = await panelPage.duplicateCardAndWait(CARD_TITLE, 0);
        
        Logger.step('Eliminando tarjeta duplicada');
        await panelPage.deleteCardAndWait(CARD_TITLE, duplicatedIndex);
        
        const finalCount = await panelPage.getCardCount(CARD_TITLE);
        expect(finalCount).toBe(initialCount);
        
        Logger.termTest('TC068 - Tarjeta duplicada eliminada exitosamente');
    });

    /**
     * TC067 Verificar que no permita dejar el título vacío del card "En Curso"
     * Verificar que el sistema muestre un mensaje de error cuando se intenta dejar el título vacío (solo espacios en blanco)
     */
    test('TC067 - Verificar que no permita dejar el título vacío del card "En Curso"', 
        {tag: ["@negative", "@regression"],}, async ({panelPage}) => {
        try {
            Logger.initTest('TC067 - Verificar que no permita dejar el título vacío del card "En Curso"');
            Logger.step('Intentando dejar título vacío');
            await panelPage.goTo();
            await panelPage.editCardTitle(CARD_TITLE, myWorkData.tasks.title.invalid);
            await panelPage.assertions.expectToBeVisible(panelPage.emptyTitleMessage);
            Logger.termTest('TC067 - Validación de título vacío completada');
        } catch (error) {
            Logger.step('Restaurando título original por error');
            await panelPage.editCardTitle(myWorkData.tasks.title.invalid, CARD_TITLE);
            throw error;
        }
    });

    Logger.termTestSuite('Finalizando Suite: Validación de la tarjeta "En Curso"');
});

test.describe('Suite: Validación de la tarjeta "Detenido"', () => {
    Logger.initTestSuite('Iniciando Suite: Validación de la tarjeta "Detenido"');

    const CARD_TITLE = myWorkData.tasks.status.stopped;

    /**
     * TC069 Verificar que permita editar el título del card "Detenido"
     * Verificar que el sistema permita editar el título de la tarjeta "Detenido" con un título válido
     */
    test('TC069 - Verificar que permita editar el título del card "Detenido"', 
        {tag: ["@smoke", "@positive", "@regression"],}, async ({panelPage}) => {
        Logger.initTest('TC069 - Verificar que permita editar el título del card "Detenido"');
        Logger.step('Editando título de la tarjeta a un valor válido');
        await panelPage.goTo();
        await panelPage.editCardTitle(CARD_TITLE, myWorkData.tasks.title.valid);
        await expect(panelPage.cardTitleLocator(CARD_TITLE)).toBeHidden();
        await panelPage.assertions.expectToBeVisible(panelPage.cardTitleLocator(myWorkData.tasks.title.valid));
        Logger.step('Restaurando título original');
        await panelPage.editCardTitle(myWorkData.tasks.title.valid, CARD_TITLE);
        Logger.termTest('TC069 - Título editado exitosamente');
    });
    
    /**
     * TC070 Verificar que permita editar el título del card "Detenido" con 255 caracteres
     * Verificar que el sistema permita editar el título de la tarjeta con exactamente 255 caracteres (límite máximo)
     */
    test('TC070 - Verificar que permita editar el título del card "Detenido" con 255 caracteres', 
        {tag: ["@positive", "@regression"],}, async ({panelPage}) => {
        try {
            Logger.initTest('TC070 - Verificar que permita editar el título del card "Detenido" con 255 caracteres');
            Logger.step('Editando título a 255 caracteres');
            await panelPage.goTo();
            await panelPage.editCardTitle(CARD_TITLE, myWorkData.tasks.title.validMax);
            await expect(panelPage.cardTitleLocator(CARD_TITLE)).toBeHidden();
            await panelPage.assertions.expectToHaveText(panelPage.cardTitleLocator(myWorkData.tasks.title.validMax), myWorkData.tasks.title.validMax);
            Logger.step('Restaurando título original');
            await panelPage.editCardTitle(myWorkData.tasks.title.validMax, CARD_TITLE);
            Logger.termTest('TC070 - Título con 255 caracteres editado exitosamente');
        } catch (error) {
            Logger.step('Restaurando título original por error');
            await panelPage.editCardTitle(myWorkData.tasks.title.validMax, CARD_TITLE);
            throw error;
        }
    });

    /**
     * TC071 Verificar que se pueda duplicar la tarjeta "Detenido"
     * Verificar que el sistema permita duplicar la tarjeta "Detenido" correctamente
     */
    test('TC071 - Verificar que se pueda duplicar la tarjeta "Detenido"', 
        {tag: ["@positive", "@regression"],}, async ({panelPage}) => {
        Logger.initTest('TC071 - Verificar que se pueda duplicar la tarjeta "Detenido"');
        
        await panelPage.goTo();
        const initialCount = await panelPage.getCardCount(CARD_TITLE);
        
        Logger.step('Duplicando tarjeta');
        const duplicatedIndex = await panelPage.duplicateCardAndWait(CARD_TITLE, 0);
        
        const countAfterDuplicate = await panelPage.getCardCount(CARD_TITLE);
        expect(countAfterDuplicate).toBe(initialCount + 1);
        
        Logger.step('Eliminando tarjeta duplicada');
        await panelPage.deleteCardAndWait(CARD_TITLE, duplicatedIndex);
        
        Logger.termTest('TC071 - Tarjeta duplicada y eliminada exitosamente');
    });
    
    /**
     * TC072 Verificar que no permita editar el título del card "Detenido" con más de 255 caracteres
     * Verificar que el sistema muestre un mensaje de error cuando se intenta editar el título con más de 255 caracteres
     */
    test('TC072 - Verificar que no permita editar el título del card "Detenido" con más de 255 caracteres', 
        {tag: ["@negative", "@regression"],}, async ({panelPage}) => {
        try {
            Logger.initTest('TC072 - Verificar que no permita editar el título del card "Detenido" con más de 255 caracteres');
            Logger.step('Intentando editar título con más de 255 caracteres');
            await panelPage.goTo();
            await panelPage.editCardTitle(CARD_TITLE, myWorkData.tasks.title.invalidLong);
            await panelPage.assertions.expectToBeVisible(panelPage.warningMessageLongTitle);
            Logger.termTest('TC072 - Validación de título largo completada');
        } catch (error) {
            Logger.step('Restaurando título original por error');
            await panelPage.editCardTitle(myWorkData.tasks.title.invalidLong, CARD_TITLE);
            throw error;
        }
    });

    /**
     * TC074 Verificar que se pueda eliminar una tarjeta duplicada "Detenido"
     * Verificar que el sistema permita eliminar correctamente una tarjeta que fue previamente duplicada
     */
    test('TC074 - Verificar que se pueda eliminar una tarjeta duplicada "Detenido"', 
        {tag: ["@positive", "@regression"],}, async ({panelPage}) => {
        Logger.initTest('TC074 - Verificar que se pueda eliminar una tarjeta duplicada "Detenido"');
        
        await panelPage.goTo();
        const initialCount = await panelPage.getCardCount(CARD_TITLE);
        
        Logger.step('Duplicando tarjeta');
        const duplicatedIndex = await panelPage.duplicateCardAndWait(CARD_TITLE, 0);
        
        Logger.step('Eliminando tarjeta duplicada');
        await panelPage.deleteCardAndWait(CARD_TITLE, duplicatedIndex);
        
        const finalCount = await panelPage.getCardCount(CARD_TITLE);
        expect(finalCount).toBe(initialCount);
        
        Logger.termTest('TC074 - Tarjeta duplicada eliminada exitosamente');
    });

     /**
     * TC073 Verificar que no permita dejar el título vacío del card "Detenido"
     * Verificar que el sistema muestre un mensaje de error cuando se intenta dejar el título vacío (solo espacios en blanco)
     */
    test('TC073 - Verificar que no permita dejar el título vacío del card "Detenido"', 
        {tag: ["@negative", "@regression"],}, async ({panelPage}) => {
        try {
            Logger.initTest('TC073 - Verificar que no permita dejar el título vacío del card "Detenido"');
            Logger.step('Intentando dejar título vacío');
            await panelPage.goTo();
            await panelPage.editCardTitle(CARD_TITLE, myWorkData.tasks.title.invalid);
            await panelPage.assertions.expectToBeVisible(panelPage.emptyTitleMessage);
            Logger.termTest('TC073 - Validación de título vacío completada');
        } catch (error) {
            Logger.step('Restaurando título original por error');
            await panelPage.editCardTitle(myWorkData.tasks.title.invalid, CARD_TITLE);
            throw error;
        }
    });

    Logger.termTestSuite('Finalizando Suite: Validación de la tarjeta "Detenido"');
});

test.describe('Suite: Validación de la tarjeta "Listo"', () => {
    Logger.initTestSuite('Iniciando Suite: Validación de la tarjeta "Listo"');

    const CARD_TITLE = myWorkData.tasks.status.done;

    /**
     * TC075 Verificar que permita editar el título del card "Listo"
     * Verificar que el sistema permita editar el título de la tarjeta "Listo" con un título válido
     */
    test('TC075 - Verificar que permita editar el título del card "Listo"', 
        {tag: ["@smoke", "@positive", "@regression"],}, async ({panelPage}) => {
        Logger.initTest('TC075 - Verificar que permita editar el título del card "Listo"');
        Logger.step('Editando título de la tarjeta a un valor válido');
        await panelPage.goTo();
        await panelPage.editCardTitle(CARD_TITLE, myWorkData.tasks.title.valid);
        await expect(panelPage.cardTitleLocator(CARD_TITLE)).toBeHidden();
        await panelPage.assertions.expectToBeVisible(panelPage.cardTitleLocator(myWorkData.tasks.title.valid));
        Logger.step('Restaurando título original');
        await panelPage.editCardTitle(myWorkData.tasks.title.valid, CARD_TITLE);
        Logger.termTest('TC075 - Título editado exitosamente');
    });
    
    /**
     * TC076 Verificar que permita editar el título del card "Listo" con 255 caracteres
     * Verificar que el sistema permita editar el título de la tarjeta con exactamente 255 caracteres (límite máximo)
     */
    test('TC076 - Verificar que permita editar el título del card "Listo" con 255 caracteres', 
        {tag: ["@positive", "@regression"],}, async ({panelPage}) => {
        try {
            Logger.initTest('TC076 - Verificar que permita editar el título del card "Listo" con 255 caracteres');
            Logger.step('Editando título a 255 caracteres');
            await panelPage.goTo();
            await panelPage.editCardTitle(CARD_TITLE, myWorkData.tasks.title.validMax);
            await expect(panelPage.cardTitleLocator(CARD_TITLE)).toBeHidden();
            await panelPage.assertions.expectToHaveText(panelPage.cardTitleLocator(myWorkData.tasks.title.validMax), myWorkData.tasks.title.validMax);
            Logger.step('Restaurando título original');
            await panelPage.editCardTitle(myWorkData.tasks.title.validMax, CARD_TITLE);
            Logger.termTest('TC076 - Título con 255 caracteres editado exitosamente');
        } catch (error) {
            Logger.step('Restaurando título original por error');
            await panelPage.editCardTitle(myWorkData.tasks.title.validMax, CARD_TITLE);
            throw error;
        }
    });

    /**
     * TC077 Verificar que se pueda duplicar la tarjeta "Listo"
     * Verificar que el sistema permita duplicar la tarjeta "Listo" correctamente
     */
    test('TC077 - Verificar que se pueda duplicar la tarjeta "Listo"', 
        {tag: ["@positive", "@regression"],}, async ({panelPage}) => {
        Logger.initTest('TC077 - Verificar que se pueda duplicar la tarjeta "Listo"');
        
        await panelPage.goTo();
        const initialCount = await panelPage.getCardCount(CARD_TITLE);
        
        Logger.step('Duplicando tarjeta');
        const duplicatedIndex = await panelPage.duplicateCardAndWait(CARD_TITLE, 0);
        
        const countAfterDuplicate = await panelPage.getCardCount(CARD_TITLE);
        expect(countAfterDuplicate).toBe(initialCount + 1);
        
        Logger.step('Eliminando tarjeta duplicada');
        await panelPage.deleteCardAndWait(CARD_TITLE, duplicatedIndex);
        
        Logger.termTest('TC077 - Tarjeta duplicada y eliminada exitosamente');
    });
    
    /**
     * TC078 Verificar que no permita editar el título del card "Listo" con más de 255 caracteres
     * Verificar que el sistema muestre un mensaje de error cuando se intenta editar el título con más de 255 caracteres
     */
    test('TC078 - Verificar que no permita editar el título del card "Listo" con más de 255 caracteres', 
        {tag: ["@negative", "@regression"],}, async ({panelPage}) => {
        try {
            Logger.initTest('TC078 - Verificar que no permita editar el título del card "Listo" con más de 255 caracteres');
            Logger.step('Intentando editar título con más de 255 caracteres');
            await panelPage.goTo();
            await panelPage.editCardTitle(CARD_TITLE, myWorkData.tasks.title.invalidLong);
            await panelPage.assertions.expectToBeVisible(panelPage.warningMessageLongTitle);
            Logger.termTest('TC078 - Validación de título largo completada');
        } catch (error) {
            Logger.step('Restaurando título original por error');
            await panelPage.editCardTitle(myWorkData.tasks.title.invalidLong, CARD_TITLE);
            throw error;
        }
    });

    /**
     * TC080 Verificar que se pueda eliminar una tarjeta duplicada "Listo"
     * Verificar que el sistema permita eliminar correctamente una tarjeta que fue previamente duplicada
     */
    test('TC080 - Verificar que se pueda eliminar una tarjeta duplicada "Listo"', 
        {tag: ["@positive", "@regression"],}, async ({panelPage}) => {
        Logger.initTest('TC080 - Verificar que se pueda eliminar una tarjeta duplicada "Listo"');
        
        await panelPage.goTo();
        const initialCount = await panelPage.getCardCount(CARD_TITLE);
        
        Logger.step('Duplicando tarjeta');
        const duplicatedIndex = await panelPage.duplicateCardAndWait(CARD_TITLE, 0);
        
        Logger.step('Eliminando tarjeta duplicada');
        await panelPage.deleteCardAndWait(CARD_TITLE, duplicatedIndex);
        
        const finalCount = await panelPage.getCardCount(CARD_TITLE);
        expect(finalCount).toBe(initialCount);
        
        Logger.termTest('TC080 - Tarjeta duplicada eliminada exitosamente');
    });

    /**
     * TC079 Verificar que no permita dejar el título vacío del card "Listo"
     * Verificar que el sistema muestre un mensaje de error cuando se intenta dejar el título vacío (solo espacios en blanco)
     */
    test('TC079 - Verificar que no permita dejar el título vacío del card "Listo"', 
        {tag: ["@negative", "@regression"],}, async ({panelPage}) => {
        try {
            Logger.initTest('TC079 - Verificar que no permita dejar el título vacío del card "Listo"');
            Logger.step('Intentando dejar título vacío');
            await panelPage.goTo();
            await panelPage.editCardTitle(CARD_TITLE, myWorkData.tasks.title.invalid);
            await panelPage.assertions.expectToBeVisible(panelPage.emptyTitleMessage);
            Logger.termTest('TC079 - Validación de título vacío completada');
        } catch (error) {
            Logger.step('Restaurando título original por error');
            await panelPage.editCardTitle(myWorkData.tasks.title.invalid, CARD_TITLE);
            throw error;
        }
    });

});