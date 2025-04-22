import chalk from 'chalk';

export function formatWeather(data) {
  const temp = `${ data.main.temp }°C`;
  const desc = data.weather[0].description;
  const city = data.name;

  return chalk.green(`⛅ ${ city } - ${ desc } - ${ temp }`);
}
