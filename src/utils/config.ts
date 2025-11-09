import { config } from "dotenv";

config();

export const Config = {
  BASE_URL: process.env.BASE_URL || 'https://srfgsdrges-team.monday.com',
  LOGIN_URL: process.env.LOGIN_URL || 'https://monday.com/lang/es',
  WORK_URL: process.env.WORK_URL || 'https://srfgsdrges-team.monday.com/my_work',

  MONDAY_EMAIL: process.env.MONDAY_EMAIL || '',
  MONDAY_PASSWORD: process.env.MONDAY_PASSWORD || '',
  
  HEADLESS: (process.env.HEADLESS || 'false').toLowerCase() === 'true',
  
  DEFAULT_TIMEOUT: parseInt(process.env.DEFAULT_TIMEOUT || '30000', 10),
  
  ENVIRONMENT: process.env.ENVIRONMENT || 'test',
  
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
} as const;

export default Config;