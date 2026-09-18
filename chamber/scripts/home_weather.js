const weatherStatus = document.querySelector('#weather_status');
const currentWeather = document.querySelector('#current_weather');
const weatherTemperature = document.querySelector('#current_temperature');
const weatherDescription = document.querySelector('#weather_description');
const weatherIcon = document.querySelector('#weather_icon');
const forecastList = document.querySelector('#weather_forecast');
const weatherRetry = document.querySelector('#weather_retry');

// Browser API keys are visible in source. Use only the free weather endpoints.
const weatherKey = '7f214edb9c729cb9a38a7437cfb57cda';
const weatherBase = 'https://api.openweathermap.org/data/2.5/';
const weatherQuery = `lat=35.13&lon=-117.99&units=imperial&appid=${weatherKey}`;
const cityTimeZone = 'America/Los_Angeles';

function localDateKey(timestamp) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: cityTimeZone, year: 'numeric', month: '2-digit', day: '2-digit'
  }).formatToParts(new Date(timestamp * 1000));
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function selectForecastDays(entries, now = Date.now()) {
  const today = localDateKey(now / 1000);
  const days = new Map();
  entries.forEach((entry) => {
    const date = localDateKey(entry.dt);
    if (date <= today || !Number.isFinite(entry.main?.temp)) return;
    const hour = Number(new Intl.DateTimeFormat('en-US', {
      timeZone: cityTimeZone, hour: 'numeric', hourCycle: 'h23'
    }).format(new Date(entry.dt * 1000)));
    const distance = Math.abs(hour - 12);
    if (!days.has(date) || distance < days.get(date).distance) {
      days.set(date, { entry, distance });
    }
  });
  // OpenWeather's free forecast is in three-hour intervals, not daily highs/lows.
  return [...days.entries()].sort(([a], [b]) => a.localeCompare(b))
    .slice(0, 3).map(([, value]) => value.entry);
}

async function fetchWeather(endpoint) {
  const response = await fetch(`${weatherBase}${endpoint}?${weatherQuery}`, {
    signal: AbortSignal.timeout(15000)
  });
  if (!response.ok) throw new Error('Weather request failed.');
  return response.json();
}

function displayCurrentWeather(data) {
  if (!Number.isFinite(data.main?.temp) || !data.weather?.[0]?.description) {
    throw new Error('Current weather is incomplete.');
  }
  weatherTemperature.textContent = `${Math.round(data.main.temp)}°F`;
  weatherDescription.textContent = data.weather[0].description;
  weatherIcon.alt = data.weather[0].description;
  weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  weatherIcon.hidden = false;
  currentWeather.hidden = false;
}

function displayForecast(data) {
  const days = selectForecastDays(data.list);
  if (days.length !== 3) throw new Error('Three forecast days are unavailable.');
  const items = days.map((day) => {
    const item = document.createElement('li');
    const label = document.createElement('time');
    label.dateTime = localDateKey(day.dt);
    label.textContent = new Intl.DateTimeFormat('en-US', {
      timeZone: cityTimeZone, weekday: 'short', month: 'short', day: 'numeric'
    }).format(new Date(day.dt * 1000));
    const temperature = document.createElement('strong');
    temperature.textContent = `${Math.round(day.main.temp)}°F`;
    item.append(label, temperature);
    return item;
  });
  forecastList.replaceChildren(...items);
}

async function loadWeather() {
  weatherRetry.hidden = true;
  weatherStatus.textContent = 'Loading local weather…';
  currentWeather.hidden = true;
  forecastList.replaceChildren();
  const results = await Promise.allSettled([
    fetchWeather('weather').then(displayCurrentWeather),
    fetchWeather('forecast').then(displayForecast)
  ]);
  const currentOk = results[0].status === 'fulfilled';
  const forecastOk = results[1].status === 'fulfilled';
  if (currentOk && forecastOk) {
    weatherStatus.textContent = 'Live weather for California City, CA.';
  } else {
    weatherStatus.textContent = !currentOk && !forecastOk
      ? 'Weather is unavailable. Please try again.'
      : currentOk ? 'Current weather loaded; forecast unavailable. Please retry.'
        : 'Forecast loaded; current weather unavailable. Please retry.';
    weatherRetry.hidden = false;
  }
}

weatherIcon.addEventListener('error', () => { weatherIcon.hidden = true; });
weatherRetry.addEventListener('click', loadWeather);
loadWeather();
