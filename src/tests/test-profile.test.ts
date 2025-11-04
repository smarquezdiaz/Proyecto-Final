import { test, expect } from '@playwright/test';
import { Logger } from '../helper/logger/Logger';

// campo telefono 

/**
 * Tests the user login functionality.
 * @param {import('@playwright/test').Page} page - The Playwright Page object.
 * @param {import('@playwright/test').Browser} browser - The Playwright Browser object.
 */

test('agregar un numero de telefono valido', async ({page}) => {
    Logger.initTest('agregar un numero de telefono valido');
    await page.goto('https://srfgsdrges-team.monday.com/');
    await page.getByTestId('topbar-avatar-menu').click();
    await page.locator('text="Mi perfil"').click();
    const textLocator = page.locator('text="Teléfono"');
    const phoneContainer = textLocator.locator('..').locator('..');
    await phoneContainer.getByTestId('editable-text').click();
    const actualInput = phoneContainer.locator('input'); 
    await actualInput.fill('77968051');
    await actualInput.press('Enter');
    await expect(page.getByText('77968051')).toBeVisible();
});

/**
 * Tests the user login functionality.
 * @param {import('@playwright/test').Page} page - The Playwright Page object.
 * @param {import('@playwright/test').Browser} browser - The Playwright Browser object.
 */


test('agregar un numero de telefono vacio', async ({page}) => {
    Logger.initTest('agregar un numero de telefono vacio');
    await page.goto('https://srfgsdrges-team.monday.com/');
    await page.getByTestId('topbar-avatar-menu').click();
    await page.locator('text="Mi perfil"').click();
    const textLocator = page.locator('text="Teléfono"');
    const phoneContainer = textLocator.locator('..').locator('..');
    await phoneContainer.getByTestId('editable-text').click();
    const actualInput = phoneContainer.locator('input'); 
    await actualInput.fill('');
    await actualInput.press('Enter');
    // await expect(page.getByText('77968051')).toBeVisible();
});

test('agregar un numero de telefono con 1 digito', async ({page}) => {
    Logger.initTest('agregar un numero de telefono vacio');
    await page.goto('https://srfgsdrges-team.monday.com/');
    await page.getByTestId('topbar-avatar-menu').click();
    await page.locator('text="Mi perfil"').click();
    const textLocator = page.locator('text="Teléfono"');
    const phoneContainer = textLocator.locator('..').locator('..');
    await phoneContainer.getByTestId('editable-text').click();
    const actualInput = phoneContainer.locator('input'); 
    await actualInput.fill('7');
    await actualInput.press('Enter');
    // await expect(page.getByText('77968051')).toBeVisible();
});

test('agregar un numero de telefono con caracteres', async ({page}) => {
    Logger.initTest('agregar un numero de telefono vacio');
    await page.goto('https://srfgsdrges-team.monday.com/');
    await page.getByTestId('topbar-avatar-menu').click();
    await page.locator('text="Mi perfil"').click();
    const textLocator = page.locator('text="Teléfono"');
    const phoneContainer = textLocator.locator('..').locator('..');
    await phoneContainer.getByTestId('editable-text').click();
    const actualInput = phoneContainer.locator('input'); 
    await actualInput.fill('a');
    await actualInput.press('Enter');
    // await expect(page.getByText('77968051')).toBeVisible();
});

test('agregar un numero de telefono con caracteres especiales', async ({page}) => {
    Logger.initTest('agregar un numero de telefono vacio');
    await page.goto('https://srfgsdrges-team.monday.com/');
    await page.getByTestId('topbar-avatar-menu').click();
    await page.locator('text="Mi perfil"').click();
    const textLocator = page.locator('text="Teléfono"');
    const phoneContainer = textLocator.locator('..').locator('..');
    await phoneContainer.getByTestId('editable-text').click();
    const actualInput = phoneContainer.locator('input'); 
    await actualInput.fill('%');
    await actualInput.press('Enter');
    // await expect(page.getByText('77968051')).toBeVisible();
});

test('agregar un numero de telefono con muchos digitos', async ({page}) => {
    Logger.initTest('agregar un numero de telefono vacio');
    await page.goto('https://srfgsdrges-team.monday.com/');
    await page.getByTestId('topbar-avatar-menu').click();
    await page.locator('text="Mi perfil"').click();
    const textLocator = page.locator('text="Teléfono"');
    const phoneContainer = textLocator.locator('..').locator('..');
    await phoneContainer.getByTestId('editable-text').click();
    const actualInput = phoneContainer.locator('input'); 
    await actualInput.fill('1111111111111');
    await actualInput.press('Enter');
    // await expect(page.getByText('77968051')).toBeVisible();
});

// Ubicacion 

test('agregar una ubicacion valida', async ({page}) => {
    Logger.initTest('agregar una ubicacion valida');
    await page.goto('https://srfgsdrges-team.monday.com/');
    await page.getByTestId('topbar-avatar-menu').click();
    await page.locator('text="Mi perfil"').click();
    const textLocator = page.locator('text="Ubicación"');
    const phoneContainer = textLocator.locator('..').locator('..');
    await phoneContainer.getByTestId('editable-text').click();
    const actualInput = phoneContainer.locator('input'); 
    await actualInput.fill('ladislao cabrera');
    await actualInput.press('Enter');
    await expect(page.getByText('ladislao cabrera')).toBeVisible();
});