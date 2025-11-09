import { Status } from '../enums/statusEnum';
import { test } from '../fixtures/fixtures'
import { Logger } from '../helper/logger/Logger';
import { expect } from '@playwright/test';
import { getTestData } from '../utils/utils';

const testData = getTestData();
const myWorkData = testData.panel;

/**
 * Módulo: Panel y generación de informes
 * Suite de pruebas para validar la funcionalidad y gestión del Panel y generación de informes
 */

test.describe('Suite: Validación de la tarjeta "En Curso"', () => {
  Logger.initTestSuite('Iniciando Suite: Validación del campo "Título" en Tareas');

  /**
   * TC001 Verificar que permita editar el título del card "En Curso"
   * Verificar que al hacer clic en la tarjeta "En Curso" se pueda editar el nombre 
   */
  test('TC001 - Verificar que permita editar el título del card "En Curso"', 
     {tag: ["@smoke", "@positive", "@regression"],}, async ({page, panelPage}) => {
      Logger.initTest('TC001 - Verificar que permita editar el título del card "En Curso');
      Logger.step('editando el título del card "En Curso');
      Logger.termTest('TC001 - Verificar que permita editar el título del card "En Curso');
    });
  Logger.termTestSuite('Finalizando Suite: Validación de la tarjeta "En Curso"');  
});