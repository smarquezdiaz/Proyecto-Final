import { test as setup } from '@playwright/test';
import path from 'path';
import { LoginPage } from '../pages/LoginPage';
import { Config } from '../utils/config';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page}) => {
  const loginPage = new LoginPage(page);
  const email = Config.MONDAY_EMAIL || 'srfgsdrge@gmail.com';
  const password = Config.MONDAY_PASSWORD || 'chocomei7v7';
  const expectedUrl = Config.BASE_URL || 'https://srfgsdrges-team.monday.com/';

  await loginPage.login(email, password);
  await loginPage.waitForSuccessfulLogin(expectedUrl);
  await page.context().storageState({ path: authFile });
});