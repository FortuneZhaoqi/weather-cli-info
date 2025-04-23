import { describe, it, expect } from "vitest";
import nock from "nock";
import { getFiveDayForecast } from "../src/services/forecastService.js";

describe('forecastService', () => {
  it('returns a list of 3-hour forecasts for a city', async () => {
    const mockForecast = {
      list: [
        {
          dt_txt: '2025-04-21 12:00:00',
          main: { temp: 18 },
          weather: [{ description: 'scattered clouds '}]
        },
        {
          dt_txt: '2025-04-22 12:00:00',
          main: { temp: 20 },
          weather: [{ description: 'light rain' }]
        }
      ]
    };

    nock('https://api.openweathermap.org')
      .get('/data/2.5/forecast')
      .query(true)
      .reply(200, mockForecast);

    const result = await getFiveDayForecast('Paris');
    expect(result).toHaveLength(2);
    expect(result[0].main.temp).toBe(18);
    expect(result[1].weather[0].description).toBe('light rain');
  });
});
