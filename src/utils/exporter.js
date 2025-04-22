import * as fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Papa from 'papaparse';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const exportDir = path.join(__dirname, "..", "..", "exports");

if (!fs.existsSync(exportDir)) {
  fs.mkdirSync(exportDir, { recursive: true });
}

function getFilename(ext) {
  const date = new Date().toISOString().split('T')[0];
  return path.join(exportDir, `weather-${ date }.${ ext }`);
}

export function exportAsMarkdown(data, isForecast = false) {
  const filename = getFilename('md');

  const content = isForecast
    ? data.map(e => `- ${ e.dt_txt }: ${ e.main.temp }°C, ${ e.weather[0].description }`).join('\n')
    : `# Weather Report\n\nCity: ${ data.name }\nTemperature: ${ data.main.temp }°C\nCondition: ${ data.weather[0].description }`;

  fs.writeFileSync(filename, content);
  return filename;
}

export function exportAsCSV(data, isForecast = false) {
  const filename = getFilename('csv');

  const records = isForecast
    ? data.map(e => ({
      datetime: e.dt_txt,
      temp: e.main.temp,
      condition: e.weather[0].description,
    }))
    : [{
      city: data.name,
      temp: data.main.temp,
      condition: data.weather[0].description,
    }];

  const csv = Papa.unparse(records);
  fs.writeFileSync(filename, csv);
  return filename;
}
