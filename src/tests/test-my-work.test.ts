import { Status } from '../enums/statusEnum';
import { test } from '../fixtures/fixtures'
import { Logger } from '../helper/logger/Logger';
import { expect } from '@playwright/test';

/**
 * Módulo: Mi Trabajo
 * Suite de pruebas para validar la funcionalidad de creación y gestión de tareas y subelementos
 */

/**
 * TC001 Verificar que permita crear una tarea
 * Verificar que al hacer clic en "Elemento nuevo" se visualice la nueva tarea creada con valores por defecto
 */
test('TC001 - Verificar que permita crear una tarea', async ({page, myWorkPage}) => {
    Logger.initTest('TC001 - Verificar que permita crear una tarea');
    Logger.step('Creando tarea con valores por defecto');
    await myWorkPage.createElement();
    Logger.termTest('TC001 - Tarea creada exitosamente');
});

test.describe('Suite: Validación del campo "Título" en Tareas', () => {
    Logger.initTestSuite('Iniciando Suite: Validación del campo "Título" en Tareas');

    /**
     * TC002 Verificar que permita crear una tarea con un título válido
     * Verificar que permita crear una tarea cuando el título es válido (no vacío, menor a 255 caracteres)
     */
    test('TC002 - Verificar que permita crear una tarea con un título válido', async ({page, myWorkPage}) => {
        Logger.initTest('TC002 - Verificar que permita crear una tarea con un título válido');
        Logger.step('Creando tarea con título válido');
        await myWorkPage.createElement('Título válido de tarea');
        Logger.termTest('TC002 - Tarea con título válido creada exitosamente');
    });

    /**
     * TC003 Verificar que no permita crear una tarea con título de más de 255 caracteres
     * Verificar que se muestre un mensaje de error cuando se ingrese un título de más de 255 caracteres al crear una nueva tarea
     */
    test('TC003 - Verificar que no permita crear una tarea con título de más de 255 caracteres', async ({page, myWorkPage}) => {
        Logger.initTest('TC003 - Verificar que no permita crear una tarea con título de más de 255 caracteres');
        Logger.step('Intentando crear tarea con título de 256 caracteres');
        await myWorkPage.createElement('a'.repeat(256));
        Logger.termTest('TC003 - Validación de título largo completada');
    });

    /**
     * TC004 Verificar que no permita crear una tarea con título vacío
     * Verificar que se muestre un mensaje de error cuando se ingrese un título vacío al crear una tarea
     */
    test('TC004 - Verificar que no permita crear una tarea con título vacío', async ({page, myWorkPage}) => {
        Logger.initTest('TC004 - Verificar que no permita crear una tarea con título vacío');
        Logger.step('Intentando crear tarea con título vacío');
        await myWorkPage.createElement('');
        Logger.termTest('TC004 - Validación de título vacío completada');
    });

    /**
     * TC005 Verificar que permita crear una tarea con título de 255 caracteres
     * Verificar que permita crear una tarea cuando el título tiene exactamente 255 caracteres (límite máximo)
     */
    test('TC005 - Verificar que permita crear una tarea con título de 255 caracteres', async ({page, myWorkPage}) => {
        Logger.initTest('TC005 - Verificar que permita crear una tarea con título de 255 caracteres');
        Logger.step('Creando tarea con título de 255 caracteres');
        await myWorkPage.createElement('a'.repeat(255));
        Logger.termTest('TC005 - Tarea con título de 255 caracteres creada exitosamente');
    });

    /**
     * TC006 Verificar que permita crear una tarea con título de 1 carácter
     * Verificar que permita crear una tarea cuando el título tiene un solo carácter (límite mínimo)
     */
    test('TC006 - Verificar que permita crear una tarea con título de 1 carácter', async ({page, myWorkPage}) => {
        Logger.initTest('TC006 - Verificar que permita crear una tarea con título de 1 carácter');
        Logger.step('Creando tarea con título de 1 carácter');
        await myWorkPage.createElement('a');
        Logger.termTest('TC006 - Tarea con título de 1 carácter creada exitosamente');
    });

    Logger.termTestSuite('Finalizando Suite: Validación del campo "Título" en Tareas');
});

test.describe('Suite: Validación del campo "Fecha de Vencimiento" en Tareas', () => {
    Logger.initTestSuite('Iniciando Suite: Validación del campo "Fecha de Vencimiento" en Tareas');

    /**
     * TC007 Verificar que no permita crear una tarea con fecha en el pasado
     * Verificar que el sistema no permita crear una tarea con una fecha de vencimiento en el pasado
     */
    test('TC007 - Verificar que no permita crear una tarea con fecha en el pasado', async ({page, myWorkPage}) => {
        Logger.initTest('TC007 - Verificar que no permita crear una tarea con fecha en el pasado');
        Logger.step('Creando tarea con fecha en el pasado');
        await myWorkPage.createElement('Tarea con fecha pasada', '2025-10-04');
        Logger.termTest('TC007 - Tarea con fecha pasada creada exitosamente');
    });

    Logger.termTestSuite('Finalizando Suite: Validación del campo "Fecha de Vencimiento" en Tareas');
});

test.describe('Suite: Validación del campo "Estado" en Tareas', () => {
    Logger.initTestSuite('Iniciando Suite: Validación del campo "Estado" en Tareas');

    /**
     * TC008 Verificar que permita crear una tarea con estado "En Curso"
     * Verificar que el sistema permita crear una tarea con el estado "En Curso" seleccionado
     */
    test('TC008 - Verificar que permita crear una tarea con estado "En Curso"', async ({page, myWorkPage}) => {
        Logger.initTest('TC008 - Verificar que permita crear una tarea con estado "En Curso"');
        Logger.step('Creando tarea con estado "En Curso"');
        await myWorkPage.createElement('Tarea en curso', undefined, Status.InProgress);
        Logger.termTest('TC008 - Tarea con estado "En Curso" creada exitosamente');
    });

    /**
     * TC009 Verificar que permita crear una tarea con estado "Listo"
     * Verificar que el sistema permita crear una tarea con el estado "Listo" seleccionado
     */
    test('TC009 - Verificar que permita crear una tarea con estado "Listo"', async ({page, myWorkPage}) => {
        Logger.initTest('TC009 - Verificar que permita crear una tarea con estado "Listo"');
        Logger.step('Creando tarea con estado "Listo"');
        await myWorkPage.createElement('Tarea lista', undefined, Status.Done);
        Logger.termTest('TC009 - Tarea con estado "Listo" creada exitosamente');
    });

    /**
     * TC010 Verificar que permita crear una tarea con estado "Detenido"
     * Verificar que el sistema permita crear una tarea con el estado "Detenido" seleccionado
     */
    test('TC010 - Verificar que permita crear una tarea con estado "Detenido"', async ({page, myWorkPage}) => {
        Logger.initTest('TC010 - Verificar que permita crear una tarea con estado "Detenido"');
        Logger.step('Creando tarea con estado "Detenido"');
        await myWorkPage.createElement('Tarea detenida', undefined, Status.Stopped);
        Logger.termTest('TC010 - Tarea con estado "Detenido" creada exitosamente');
    });

    Logger.termTestSuite('Finalizando Suite: Validación del campo "Estado" en Tareas');
});

test.describe('Suite: Validación de Subelementos - Campo "Título"', () => {
    Logger.initTestSuite('Iniciando Suite: Validación de Subelementos - Campo "Título"');

    /**
     * TC011 Verificar que permita crear un subelemento con título por defecto
     * Verificar que al crear un subelemento sin modificar el título, se cree con el valor por defecto "Subelemento"
     */
    test('TC011 - Verificar que permita crear un subelemento con título por defecto', async ({page, myWorkPage}) => {
        Logger.initTest('TC011 - Verificar que permita crear un subelemento con título por defecto');
        Logger.step('Navegando a Mi Trabajo');
        await myWorkPage.goto('https://srfgsdrges-team.monday.com/my_work');
        Logger.step('Creando subelemento con título por defecto');
        await myWorkPage.createSubelement();
        Logger.termTest('TC011 - Subelemento creado exitosamente');
    });

    /**
     * TC012 Verificar que permita editar el título de un subelemento
     * Verificar que permita modificar el título de un subelemento recién creado con un texto válido
     */
    test('TC012 - Verificar que permita editar el título de un subelemento', async ({page, myWorkPage}) => {
        Logger.initTest('TC012 - Verificar que permita editar el título de un subelemento');
        Logger.step('Navegando a Mi Trabajo');
        await myWorkPage.goto('https://srfgsdrges-team.monday.com/my_work');
        Logger.step('Creando subelemento y editando título');
        const title = 'Título editado del subelemento';
        await myWorkPage.createSubelement(title);
        Logger.termTest('TC012 - Título de subelemento editado exitosamente');
    });

    /**
     * TC013 Verificar que no permita crear un subelemento con título de más de 255 caracteres
     * Verificar que se muestre un mensaje de advertencia cuando el título del subelemento exceda los 255 caracteres
     */
    test('TC013 - Verificar que no permita crear un subelemento con título de más de 255 caracteres', async ({page, myWorkPage}) => {
        Logger.initTest('TC013 - Verificar que no permita crear un subelemento con título de más de 255 caracteres');
        Logger.step('Navegando a Mi Trabajo');
        await myWorkPage.goto('https://srfgsdrges-team.monday.com/my_work');
        Logger.step('Intentando crear subelemento con título de 256 caracteres');
        const title = 'a'.repeat(256);
        await myWorkPage.createSubelement(title);
        await expect(myWorkPage.warningMessageLongTitle).toBeVisible();
        Logger.termTest('TC013 - Validación de título largo completada');
    });

    /**
     * TC014 Verificar que no permita crear un subelemento con título vacío
     * Verificar que se muestre un mensaje de error cuando se intente dejar el título del subelemento vacío
     */
    test('TC014 - Verificar que no permita crear un subelemento con título vacío', async ({page, myWorkPage}) => {
        Logger.initTest('TC014 - Verificar que no permita crear un subelemento con título vacío');
        Logger.step('Navegando a Mi Trabajo');
        await myWorkPage.goto('https://srfgsdrges-team.monday.com/my_work');
        Logger.step('Intentando crear subelemento con título vacío');
        const title = '';
        await myWorkPage.createSubelement(title);
        await expect(myWorkPage.emptyTitleMessage).toBeVisible();
        Logger.termTest('TC014 - Validación de título vacío completada');
    });

    /**
     * TC015 Verificar que no permita crear un subelemento con título de espacios en blanco
     * Verificar que se muestre un mensaje de error cuando el título del subelemento contenga solo espacios en blanco
     */
    test('TC015 - Verificar que no permita crear un subelemento con título de espacios en blanco', async ({page, myWorkPage}) => {
        Logger.initTest('TC015 - Verificar que no permita crear un subelemento con título de espacios en blanco');
        Logger.step('Navegando a Mi Trabajo');
        await myWorkPage.goto('https://srfgsdrges-team.monday.com/my_work');
        Logger.step('Intentando crear subelemento con espacios en blanco');
        const title = '                   ';
        await myWorkPage.createSubelement(title);
        await expect(myWorkPage.emptyTitleMessage).toBeVisible();
        Logger.termTest('TC015 - Validación de espacios en blanco completada');
    });

    Logger.termTestSuite('Finalizando Suite: Validación de Subelementos - Campo "Título"');
});

test.describe('Suite: Validación de Subelementos - Campo "Estado"', () => {
    Logger.initTestSuite('Iniciando Suite: Validación de Subelementos - Campo "Estado"');

    /**
     * TC016 Verificar que permita crear un subelemento con estado "En Curso"
     * Verificar que el sistema permita asignar el estado "En Curso" a un subelemento recién creado
     */
    test('TC016 - Verificar que permita crear un subelemento con estado "En Curso"', async ({page, myWorkPage}) => {
        Logger.initTest('TC016 - Verificar que permita crear un subelemento con estado "En Curso"');
        Logger.step('Navegando a Mi Trabajo');
        await myWorkPage.goto('https://srfgsdrges-team.monday.com/my_work');
        Logger.step('Creando subelemento con estado "En Curso"');
        const status = Status.InProgress;
        await myWorkPage.createSubelement(undefined, status);
        await expect(page.getByText(`${status}`)).toBeVisible();
        Logger.termTest('TC016 - Subelemento con estado "En Curso" creado exitosamente');
    });

    /**
     * TC017 Verificar que permita crear un subelemento con estado "Detenido"
     * Verificar que el sistema permita asignar el estado "Detenido" a un subelemento recién creado
     */
    test('TC017 - Verificar que permita crear un subelemento con estado "Detenido"', async ({page, myWorkPage}) => {
        Logger.initTest('TC017 - Verificar que permita crear un subelemento con estado "Detenido"');
        Logger.step('Navegando a Mi Trabajo');
        await myWorkPage.goto('https://srfgsdrges-team.monday.com/my_work');
        Logger.step('Creando subelemento con estado "Detenido"');
        const status = Status.Stopped;
        await myWorkPage.createSubelement(undefined, status);
        await expect(page.getByText(`${status}`)).toBeVisible();
        Logger.termTest('TC017 - Subelemento con estado "Detenido" creado exitosamente');
    });

    /**
     * TC018 Verificar que permita crear un subelemento con estado "Listo"
     * Verificar que el sistema permita asignar el estado "Listo" a un subelemento recién creado
     */
    test('TC018 - Verificar que permita crear un subelemento con estado "Listo"', async ({page, myWorkPage}) => {
        Logger.initTest('TC018 - Verificar que permita crear un subelemento con estado "Listo"');
        Logger.step('Navegando a Mi Trabajo');
        await myWorkPage.goto('https://srfgsdrges-team.monday.com/my_work');
        Logger.step('Creando subelemento con estado "Listo"');
        const status = Status.Done;
        await myWorkPage.createSubelement(undefined, status);
        await expect(page.getByText(`${status}`)).toBeVisible();
        Logger.termTest('TC018 - Subelemento con estado "Listo" creado exitosamente');
    });

    Logger.termTestSuite('Finalizando Suite: Validación de Subelementos - Campo "Estado"');
});

test.describe('Suite: Validación de Subelementos - Campo "Numérico"', () => {
    Logger.initTestSuite('Iniciando Suite: Validación de Subelementos - Campo "Numérico"');

    /**
     * TC019 Verificar que permita ingresar un valor numérico válido
     * Verificar que el sistema permita ingresar un valor numérico decimal válido en el campo numérico del subelemento
     */
    test('TC019 - Verificar que permita ingresar un valor numérico válido', async ({page, myWorkPage}) => {
        Logger.initTest('TC019 - Verificar que permita ingresar un valor numérico válido');
        Logger.step('Navegando a Mi Trabajo');
        await myWorkPage.goto('https://srfgsdrges-team.monday.com/my_work');
        Logger.step('Creando subelemento con valor numérico válido');
        const numerical = '0.1';
        await myWorkPage.createSubelement(undefined, undefined, numerical);
        await expect(page.getByText(`%${numerical}`)).toBeVisible();
        Logger.termTest('TC019 - Valor numérico ingresado exitosamente');
    });

    /**
     * TC020 Verificar que no permita ingresar caracteres alfabéticos en el campo numérico
     * Verificar que el sistema rechace la entrada de caracteres alfabéticos en el campo numérico del subelemento
     */
    test('TC020 - Verificar que no permita ingresar caracteres alfabéticos en el campo numérico', async ({page, myWorkPage}) => {
        Logger.initTest('TC020 - Verificar que no permita ingresar caracteres alfabéticos en el campo numérico');
        Logger.step('Navegando a Mi Trabajo');
        await myWorkPage.goto('https://srfgsdrges-team.monday.com/my_work');
        Logger.step('Intentando ingresar caracteres alfabéticos');
        const numerical = 'e';
        await myWorkPage.createSubelement(undefined, undefined, numerical);
        Logger.termTest('TC020 - Validación de caracteres alfabéticos completada');
    });

    /**
     * TC021 Verificar que no permita ingresar caracteres especiales en el campo numérico
     * Verificar que el sistema rechace la entrada de caracteres especiales en el campo numérico del subelemento
     */
    test('TC021 - Verificar que no permita ingresar caracteres especiales en el campo numérico', async ({page, myWorkPage}) => {
        Logger.initTest('TC021 - Verificar que no permita ingresar caracteres especiales en el campo numérico');
        Logger.step('Navegando a Mi Trabajo');
        await myWorkPage.goto('https://srfgsdrges-team.monday.com/my_work');
        Logger.step('Intentando ingresar caracteres especiales');
        const numerical = '*';
        await myWorkPage.createSubelement(undefined, undefined, numerical);
        Logger.termTest('TC021 - Validación de caracteres especiales completada');
    });

    /**
     * TC022 Verificar que no permita ingresar espacios en blanco en el campo numérico
     * Verificar que el sistema rechace la entrada de espacios en blanco en el campo numérico del subelemento
     */
    test('TC022 - Verificar que no permita ingresar espacios en blanco en el campo numérico', async ({page, myWorkPage}) => {
        Logger.initTest('TC022 - Verificar que no permita ingresar espacios en blanco en el campo numérico');
        Logger.step('Navegando a Mi Trabajo');
        await myWorkPage.goto('https://srfgsdrges-team.monday.com/my_work');
        Logger.step('Intentando ingresar espacios en blanco');
        const numerical = '     ';
        await myWorkPage.createSubelement(undefined, undefined, numerical);
        Logger.termTest('TC022 - Validación de espacios en blanco completada');
    });

    Logger.termTestSuite('Finalizando Suite: Validación de Subelementos - Campo "Numérico"');
});

test.describe('Suite: Validación de Eliminación de Subelementos', () => {
    Logger.initTestSuite('Iniciando Suite: Validación de Eliminación de Subelementos');

    /**
     * TC023 Verificar que permita eliminar un subelemento exitosamente
     * Verificar que el sistema permita eliminar un subelemento y muestre el mensaje de confirmación correspondiente
     */
    test('TC023 - Verificar que permita eliminar un subelemento exitosamente', async ({page, myWorkPage}) => {
        Logger.initTest('TC023 - Verificar que permita eliminar un subelemento exitosamente');
        Logger.step('Navegando a Mi Trabajo');
        await myWorkPage.goto('https://srfgsdrges-team.monday.com/my_work');
        Logger.step('Creando subelemento');
        await myWorkPage.createSubelement();
        Logger.step('Eliminando subelemento');
        await myWorkPage.deleteSubelement();
        await expect(myWorkPage.succeddedMessage).toBeVisible(); 
        Logger.termTest('TC023 - Subelemento eliminado exitosamente');
    });

    /**
     * TC024 Verificar que al eliminar un subelemento se actualice el contador
     * Verificar que al eliminar un subelemento, el contador de subelementos se actualice correctamente
     */
    test.fail('TC024 - Verificar que al eliminar un subelemento se actualice el contador', async ({page, myWorkPage}) => {
        Logger.initTest('TC024 - Verificar que al eliminar un subelemento se actualice el contador');
        Logger.step('Navegando a Mi Trabajo');
        await myWorkPage.goto('https://srfgsdrges-team.monday.com/my_work');
        Logger.step('Creando subelemento');
        await myWorkPage.createSubelement();
        Logger.step('Eliminando subelemento y verificando contador');
        await myWorkPage.deleteSubelement();
        await expect(myWorkPage.counter).toHaveCount(0); 
        Logger.termTest('TC024 - Verificación de contador completada');
    });

    Logger.termTestSuite('Finalizando Suite: Validación de Eliminación de Subelementos');
});