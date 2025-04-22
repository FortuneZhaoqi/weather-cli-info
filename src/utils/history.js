import * as fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const logFile = path.join(__dirname, "..", "..", "exports", "history.json");

export function logLookup({ city, result, mode }) {
  const record = {
    timestamp: new Date().toISOString(),
    mode,
    city,
    result,
  };

  const data = fs.existsSync(logFile)
  ? JSON.parse(fs.readFileSync(logFile, 'utf-8'))
    : [];

  data.push(record);
  fs.writeFileSync(logFile, JSON.stringify(data, null, 2));
}

export function readHistory({ city } = {}) {
  if (!fs.existsSync(logFile)) return [];

  const entries = JSON.parse(fs.readFileSync(logFile, 'utf-8'));

  return city
  ? entries.filter(entry => entry.city.toLowerCase() === city.toLowerCase())
    : entries;
}

export function clearHistory() {
  if (fs.existsSync(logFile)) {
    fs.unlinkSync(logFile);
    return true;
  }
  return false;
}
