// Select the HTML elements that will display the weather.
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');
const weatherFigure = document.querySelector('figure');
const weatherStatus = document.querySelector('#weather_status');
const retryButton = document.querySelector('#retry_button');

// A key used in browser JavaScript is visible to visitors.
const api_key = '7f214edb9c729cb9a38a7437cfb57cda';
const url = `https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&units=imperial&appid=${api_key}`;

async function apiFetch() {
  if (!api_key) {
    currentTemp.textContent = 'not available yet';
    weatherStatus.textContent = 'An OpenWeatherMap API key is needed to load the weather.';
    return;
  }

  retryButton.hidden = true;
  weatherFigure.hidden = true;
  currentTemp.textContent = 'loading…';
  weatherStatus.textContent = 'Loading current weather…';

  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data); // Inspect the API response for this learning activity.
      displayResults(data);
    } else {
      throw new Error(await response.text());
    }
  } catch (error) {
    console.error('Unable to load current weather:', error);
    currentTemp.textContent = 'unavailable';
    weatherStatus.textContent = 'Unable to load the weather. Check your connection and API key, then try again.';
    retryButton.hidden = false;
  }
}

function displayResults(data) {
  const temperature = data.main?.temp;
  const weather = data.weather?.[0];
  if (!Number.isFinite(temperature) || !weather?.icon || !weather?.description) {
    throw new Error('The weather response is missing required information.');
  }

  currentTemp.textContent = `${temperature.toFixed(1)}°F`;
  const iconsrc = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;
  const desc = weather.description;
  weatherIcon.setAttribute('src', iconsrc);
  weatherIcon.setAttribute('alt', desc);
  captionDesc.textContent = desc;
  weatherFigure.hidden = false;
  weatherStatus.textContent = 'Current weather loaded.';
}

retryButton.addEventListener('click', apiFetch);
apiFetch();
