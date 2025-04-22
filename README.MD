# Weather CLI

A simple command-line interface (CLI) tool to fetch and display weather information for any city. You can also get a 5-day weather forecast and export the data in markdown or CSV format.

## Features

- Fetch current weather data for a specified city.
- Get a 5-day weather forecast.
- Use IP-based location to automatically detect your city.
- Export weather data as markdown or CSV files.
- Output data in JSON or raw object format.

## Installation

To install the `weather-cli`, you need to have Node.js and npm installed on your system. Follow these steps:

1. **Clone the repository:**

```bash
git clone https://github.com/your-username/weather-cli.git
cd weather-cli
```

2. **Install dependencies:**

```angular2html
npm install
```

3. **Link the package globally (optional):**

   If you want to use the `weather` command globally, you can link the package:

```bash
npm link
```

## Usage

### Current Weather

To get the current weather for a specific city:

```bash
weather current [city]
```

**Options:**

- `--local`: Use IP-based location to detect your city.
- `--json`: Output the data as raw JSON.
- `--raw`: Dump the raw object.
- `--export <format>`: Export the data as markdown or CSV.

**Example:**

```bash
weather current London --export markdown
```

### 5-Day Forecast

To get a 5-day weather forecast for a specific city:

```bash
weather forecast [city]
```

**Options:**

- `--local`: Use IP-based location to detect your city.
- `--json`: Output the data as raw JSON.
- `--raw`: Dump the raw object.
- `--export <format>`: Export the data as markdown or CSV.

**Example:**

```bash
weather forecast NewYork --local
```

## Acknowledgements

- [OpenWeatherMap API](https://openweathermap.org/api) for weather data.
- [Axios](https://github.com/axios/axios) for HTTP requests.
- [Chalk](https://github.com/chalk/chalk) for terminal string styling.
- [CLI Table 3](https://github.com/cli-table/cli-table3) for creating tables in the terminal.
- [Commander](https://github.com/tj/commander.js) for building command-line interfaces.
- [Day.js](https://github.com/iamkun/dayjs) for date manipulation.
- [Dotenv](https://github.com/motdotla/dotenv) for environment variable management.
- [Nock](https://github.com/nock/nock) for HTTP mocking and expectations.
- [PapaParse](https://github.com/mholt/PapaParse) for parsing CSV files.
- [Vitest](https://github.com/vitest-dev/vitest) for testing.
