import * as fs from 'fs';
import * as path from 'path';

export function dateFormatted(dateString: string): string {
    let year: string;
    let month: string;
    let day: string;

    if (dateString.includes('-')) {
        [year, month, day] = dateString.split('-');
    } else {
        if (dateString.length !== 8) {
            throw new Error(`Invalid date format: ${dateString}. Expected 8 digits (MMDDYYYY)`);
        }
        month = dateString.substring(0, 2);
        day = dateString.substring(2, 4);
        year = dateString.substring(4, 8);
    }
    const monthNum = Number(month);
    const dayNum = Number(day);
    
    if (monthNum < 1 || monthNum > 12) {
        throw new Error(`Invalid month: ${month}`);
    }
    
    if (dayNum < 1 || dayNum > 31) {
        throw new Error(`Invalid day: ${day}`);
    }

    const date = new Date(Number(year), monthNum - 1, dayNum);
    const monthName = date.toLocaleDateString('en-US', { month: 'short' });
    return `${monthName} ${date.getDate()}, ${date.getFullYear()}`;
}

export function getTestData() {
    const testDataPath = path.join(__dirname, '../test-data/testData.json');
    const rawData = fs.readFileSync(testDataPath, 'utf-8');
    return JSON.parse(rawData);
}

export function generateString(char: string, length: number): string {
    return char.repeat(length);
}

export function assertPhone(phone: string | number): boolean {
  const phoneStr = String(phone).trim();

  if (!phoneStr) {
    throw new Error('El número de teléfono no puede estar vacío');
  }

  if (!/^\d+$/.test(phoneStr)) {
    throw new Error('El número de teléfono solo debe contener dígitos');
  }

  const length = phoneStr.length;
  if (length < 7 || length > 15) {
    throw new Error('El número de teléfono debe tener entre 8 y 15 dígitos');
  }

  return true;
}