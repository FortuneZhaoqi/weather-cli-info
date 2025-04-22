import chalk from 'chalk';
import dayjs from 'dayjs';

const weatherIcons = {
  Clear: '☀️',
  Clouds: '☁️',
  Rain: '🌧️',
  Drizzle: '️🌦️',
  Thunderstorm: '⛈️',
  Snow: '❄️',
  Mist: '🌫️',
  Fog: '🌫️'
};

function getIcon(weatherMain) {
  return weatherIcons[weatherMain] || '🌡️'
}

export function formatForecast(list) {
  const grouped = {};

  for (const entry of list) {
    const date = dayjs(entry.dt_txt).format('YYYY-MM-DD');
    if (!grouped[date]) grouped[date] = [];

    grouped[date].push(entry);
  }

  return Object.entries(grouped)
    .slice(0, 5)
    .map(([date, entries]) => {
      const temps = entries.map(e => e.main.temp);
      const min = Math.min(...temps);
      const max = Math.max(...temps);

      const summary = entries.find(e => e.dt_txt.includes('12:00:00')) || entries[0];
      const desc = summary.weather[0].description;
      const main = summary.weather[0].main;
      const icon = getIcon(main);

      return `${chalk.blue(date)} ${icon}  ${chalk.bold(desc)}  ${chalk.yellow(`${min}°C - ${max}°C`)}`;
    })
    .join('\n');
}
