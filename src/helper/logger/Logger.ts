import fs from 'fs';
import path from 'path';
import type { TransformableInfo } from 'logform';
import { allure } from 'allure-playwright';
import { SetupConstants } from './SetupConstants';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const winston = require('winston');

// Ensure log folder exists
const logDir = SetupConstants.LOG_FOLDER_PATH || 'logs';
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Get timestamp string for file naming
const currentTimeStamp = new Date()
  .toISOString()
  .slice(0, 19)
  .replace(/[-:]/g, SetupConstants.EMPTY_TEXT);

// Define how log lines should appear
const consoleFormat = winston.format.printf(
  ({ timestamp, level, message }: TransformableInfo) => {
    const colorizer = winston.format.colorize({ all: true });
    const coloredLevel = colorizer.colorize(level, level.toUpperCase());
    return `${timestamp} [${coloredLevel}]: ${message}`;
  }
);

export class Logger {
  private static readonly logger = winston.createLogger({
    level: process.env.LOG_LEVEL || SetupConstants.INFO,
    format: winston.format.combine(
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      winston.format.errors({ stack: true }),
      consoleFormat
    ),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({
        filename: path.join(logDir, `testLog_${currentTimeStamp}.log`),
        level: 'debug', // Write everything to file
      })
    ]
  });

  static debug(message: string): void {
    this.logger.debug(message);
    allure.step(`[DEBUG] ${message}`, async () => {});
  }

  static info(message: string): void {
    this.logger.info(message);
    allure.step(`[INFO] ${message}`, async () => {});
  }

  static warn(message: string): void {
    this.logger.warn(message);
    allure.step(`[WARN] ${message}`, async () => {});
  }

  static error(message: string): void {
    this.logger.error(message);
    allure.step(`[ERROR] ${message}`, async () => {});
  }

  static success(message: string): void {
    this.logger.info(`[SUCCESS] ${message}`);
    allure.step(`[SUCCESS] ${message}`, async () => {});
  }

  static step(message: string): void {
    this.logger.info(`[PASO] ${message}`);
    allure.step(`[PASO] ${message}`, async () => {});
  }

  static initTestSuite(name: string): void {
    const message = `=== Empezando Test Suite: ${name} ===`;
    this.logger.info(message);
    allure.step(message, async () => {});
  }

  static termTestSuite(name: string): void {
    const message = `=== Finalizando Test Suite: ${name} ===`;
    this.logger.info(message);
    this.logger.info(SetupConstants.LOGGER_LINE_SEPARATOR);
    allure.step(message, async () => {});
  }

  static initTest(name: string): void {
    const message = `-- Iniciando Test: ${name}`;
    this.logger.info(message);
    allure.step(message, async () => {});
  }

  static termTest(name: string): void {
    const message = `-- Test Terminado: ${name}`;
    this.logger.info(message);
    this.logger.info(SetupConstants.LOGGER_LINE_SEPARATOR);
    allure.step(message, async () => {});
  }
}