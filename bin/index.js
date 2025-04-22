#!/usr/bin/env node
import { getWeatherByCity } from "../src/services/weatherService.js";
import { getFiveDayForecast } from "../src/services/forecastService.js";
import { getLocalCity } from "../src/services/ipService.js";
import { formatWeather } from "../src/utils/formatter.js";
import { formatForecast } from "../src/utils/forecastFormatter.js";
import { exportAsMarkdown, exportAsCSV } from "../src/utils/exporter.js";
import { clearHistory, logLookup, readHistory } from "../src/utils/history.js";
import Table from 'cli-table3';
import { Command } from "commander";

const program = new Command();

program
  .name('weather')
  .description('A CLI Weather Info APP')
  .version('1.0.0');

program
  .command('current [city]')
  .option('--local', 'Use IP-based location')
  .option('--json', 'Output as raw JSON')
  .option('--raw', 'Dump raw object')
  .option('--export <format>', 'Export as markdown or csv')
  .action(async (city, options) => {
    if (options.local) city = await getLocalCity();
    if (!city) return console.error('❌ Please provide a city name.');

    const data = await getWeatherByCity(city);

    logLookup({ city, result: data, mode: 'current' });

    if (options.export === 'markdown') {
      const file = exportAsMarkdown(data);
      console.log(`✅ Weather saved to ${ file }`);
    } else if (options.export === 'csv') {
      const file = exportAsCSV(data);
      console.log(`✅ Weather saved to ${ file }`);
    } else if (options.raw) {
      console.log(data);
    } else if (options.json) {
      console.log(JSON.stringify(data, null, 2));
    } else {
      console.log(formatWeather(data));
    }
  })

program
  .command('forecast [city]')
  .option('--local', 'Use IP-based location')
  .option('--json', 'Output as raw JSON')
  .option('--raw', 'Dump raw object')
  .option('--export <format>', 'Export as markdown or csv')
  .action(async (city, options) => {
    if (options.local) city = await getLocalCity();
    if (!city) return console.error('❌ Please provide a city name.');

    const list = await getFiveDayForecast(city);

    logLookup({ city, result: list, mode: 'forecast' });

    if (options.export === 'markdown') {
      const file = exportAsMarkdown(list, true);
      console.log(`✅ Forecast saved to ${ file }`);
    } else if (options.export === 'csv') {
      const file = exportAsCSV(list, true);
      console.log(`✅ Forecast saved to ${ file }`);
    } else if (options.raw) {
      console.log(list);
    } else if (options.json) {
      console.log(JSON.stringify(list, null, 2));
    } else {
      console.log(formatForecast(list));
    }
  })

program
  .command('history')
  .option('--city <name>', 'Filter by city')
  .action((options) => {
    const entries = readHistory({ city: options.city });

    if (!entries.length) return console.log('⚠️ No history found.');

    const table = new Table({
      head: ['Time', 'City', 'Mode', 'Temp (°C)', 'Condition'],
      colWidths: [24, 15, 10, 12, 30]
    });

    entries.forEach(({ timestamp, city, mode, result }) => {
      const entry = mode === 'forecast'
        ? result.find(r => r.dt_txt.includes('12:00:00')) || result[0]
        : result;

      table.push([
        timestamp,
        city,
        mode,
        entry.main.temp,
        entry.weather[0].description
      ]);
    });

    console.log(table.toString());
  })

program
  .command('clear-history')
  .action(() => {
    const cleard = clearHistory();
    console.log(cleard ? '🗑️ History cleard.' : '⚠️ No history to clear.');
  })

program.parse(process.argv);
