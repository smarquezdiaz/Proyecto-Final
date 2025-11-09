import fs from 'fs';
import path from 'path';
import type { TransformableInfo } from 'logform';
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
  }

  static info(message: string): void {
    this.logger.info(message);
  }

  static warn(message: string): void {
    this.logger.warn(message);
  }

  static error(message: string): void {
    this.logger.error(message);
  }

  static step(message: string): void {
    this.logger.info(`[PASO] ${message}`);
  }

  static initTestSuite(name: string): void {
    this.logger.info(`=== Empezando Test Suite: ${name} ===`);
  }

  static termTestSuite(name: string): void {
    this.logger.info(`=== Finalizando Test Suite: ${name} ===`);
    this.logger.info(SetupConstants.LOGGER_LINE_SEPARATOR);
  }

  static initTest(name: string): void {
    this.logger.info(`-- Iniciando Test: ${name}`);
  }

  static termTest(name: string): void {
    this.logger.info(`-- Test Terminado: ${name}`);
    this.logger.info(SetupConstants.LOGGER_LINE_SEPARATOR);
  }
}