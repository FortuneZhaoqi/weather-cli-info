import nock from "nock";
import { getWeatherByCity } from "../src/services/weatherService.js";
import { describe, it, expect } from "vitest";

describe('getWeatherByCity', () => {
  it('returns data for valid city', async () => {
    const mock = {
      main: { temp: 22},
      name: 'London',
      weather: [{ description: 'clear sky' }]
    }

    nock('https://api.openweathermap.org')
      .get('/data/2.5/weather')
      .query(true)
      .reply(200, mock);

    const data = await getWeatherByCity('London');
    expect(data.name).toBe('London');
    expect(data.main.temp).toBe(22);
  })
})
