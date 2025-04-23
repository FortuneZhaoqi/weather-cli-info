import { describe, it, expect } from "vitest";
import * as fs from "node:fs";
import { exportAsMarkdown, exportAsCSV } from "../src/utils/exporter.js";

describe('exporter module', () => {
  it('exports current weather as markdown and csv', () => {
    const sample = {
      name: 'Berlin',
      main: { temp: 21 },
      weather: [{ description: 'clear' }]
    };

    const md = exportAsMarkdown(sample);
    const csv = exportAsCSV(sample);

    expect(fs.existsSync(md)).toBe(true);
    expect(fs.existsSync(csv)).toBe(true);
  });

  it('exports forecast list to markdown and csv', () => {
    const forecastList = [
      {
        dt_txt: '2025-04-23 12:00:00',
        main: { temp: 19 },
        weather: [{ description: 'rain' }]
      },
      {
        dt_txt: '2025-04-24 12:00:00',
        main: { temp: 15 },
        weather: [{ description: 'cloudy' }]
      }
    ];

    const md = exportAsMarkdown(forecastList, true);
    const csv = exportAsCSV(forecastList, true);

    expect(fs.existsSync(md)).toBe(true);
    expect(fs.existsSync(csv)).toBe(true);
  });
});
