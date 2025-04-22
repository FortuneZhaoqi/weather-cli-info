import axios from 'axios';
import { WEATHER_API_KEY } from "../config.js";

const BASE_FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';

export async function getFiveDayForecast(city) {
  try {
    const res = await axios.get(BASE_FORECAST_URL, {
      params: {
        q: city,
        appid: WEATHER_API_KEY,
        units: 'metric',
      }
    });

    return res.data.list;
  } catch (err) {
    throw new Error(`Error fetching 5-day forecast for ${ city }: ${ err.response?.data?.message || err.message }`);
  }
}
