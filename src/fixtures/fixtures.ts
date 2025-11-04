import { test as base } from '@playwright/test';
import { LoginPage } from "../pages/LoginPage";
import { ProfilePage } from "../pages/ProfilePage";
import { MyWorkPage } from '../pages/MyWorkPage';

export const test = base.extend<{
  profilePage: ProfilePage;
  loginPage: LoginPage;
  myWorkPage: MyWorkPage;
}>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  profilePage: async ({ page }, use) => {
    await use(new ProfilePage(page));
  },
  myWorkPage: async ({ page }, use) => {
    await use(new MyWorkPage(page));
  },
});