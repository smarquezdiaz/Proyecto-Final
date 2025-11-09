import * as fs from 'fs';
import * as path from 'path';

export function dateFormatted(dateString: string): string {
    let year: string;
    let month: string;
    let day: string;
    if (dateString.includes('-')) {
        [year, month, day] = dateString.split('-');
    } else {
        day = dateString.substring(0, 2);
        month = dateString.substring(2, 4);
        year = dateString.substring(4, 8);
    }
    const date = new Date(Number(year), Number(month) - 1, Number(day));
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