import dotenv from 'dotenv';

dotenv.config();

export const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
export const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
