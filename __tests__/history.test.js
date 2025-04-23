import { describe, it, expect, beforeEach } from "vitest";
import * as fs from "node:fs";
import path from "node:path";
import { logLookup, readHistory, clearHistory } from "../src/utils/history.js";

const historyFile = path.resolve('exports/history.json');

describe('history module', () => {
  beforeEach(() => {
    if (fs.existsSync(historyFile)) fs.unlinkSync(historyFile);
  });

  it('logs and reads weather history', () => {
    const sample = {
      city: 'Testville',
      result: { main: { temp: 25 }, weather: [{ description: 'sunny' }] },
      mode: 'current'
    };

    logLookup(sample);

    const history = readHistory();
    expect(history).toHaveLength(1);
    expect(history[0].city).toBe('Testville');
  });

  it('clears history file', () => {
    logLookup({ city: 'Paris', result: {}, mode: 'current' });
    expect(fs.existsSync(historyFile)).toBe(true);

    const cleard = clearHistory();
    expect(cleard).toBe(true);
    expect(fs.existsSync(historyFile)).toBe(false);
  });
});
