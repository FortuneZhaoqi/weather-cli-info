import axios from "axios";
import { WEATHER_API_KEY, BASE_URL } from "../config.js";

export async function getWeatherByCity(city) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        appid: WEATHER_API_KEY,
        units: 'metric',
      },
    });

    return response.data;
  } catch (err) {
    throw new Error(`Failed to fetch weather for "${ city }": ${ err.response?.data?.message || err.message }`);
  }
}
