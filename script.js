const weatherForm = document.getElementById('weather-form');
const errorMsg = document.querySelector('.error-msg');
const weatherInfo = document.querySelectorAll('.info');
const conditionEl = document.querySelector('.condition');
const locationEl = document.querySelector('.location');
const degreesEl = document.querySelector('.degrees');
const unitEl = document.querySelector('.unit');
const feelsLikeEl = document.querySelector('.feels-like span');
const feelsLikeUnit = document.querySelector('.feels-like .unit-symbol');
const windEl = document.querySelector('.wind-mph span');
const humidityEl = document.querySelector('.humidity span');
const celsiusBtn = document.getElementById('celsius-btn');
const fahrenheitBtn = document.getElementById('fahrenheit-btn');

// API Configuration
const API_KEY = '1986480656ec490d950204923202611';
const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=`;

// Unit state
let currentUnit = 'c';
let currentWeatherData = null;

weatherForm.addEventListener('submit', handleSubmit);
celsiusBtn.addEventListener('click', () => setUnit('c'));
fahrenheitBtn.addEventListener('click', () => setUnit('f'));

async function handleSubmit(e) {
  e.preventDefault();
  const formData = new FormData(weatherForm);
  const location = formData.get('location').trim();
  
  if (!location) return;
  
  try {
    const data = await getWeatherData(location);
    currentWeatherData = processData(data);
    updateWeatherUI();
    weatherForm.reset();
    errorMsg.style.display = 'none';
  } catch (err) {
    showError();
  }
}

function setUnit(unit) {
  if (currentUnit === unit) return;
  
  currentUnit = unit;
  celsiusBtn.classList.toggle('active', unit === 'c');
  fahrenheitBtn.classList.toggle('active', unit === 'f');
  
  if (currentWeatherData) {
    updateWeatherUI();
  }
}

async function getWeatherData(location) {
  const response = await fetch(`${API_URL}${encodeURIComponent(location)}`);
  
  if (!response.ok) {
    if (response.status === 400) {
      throw new Error('Location not found');
    }
    throw new Error('Network error');
  }
  
  return response.json();
}

function processData(weatherData) {
  return {
    condition: weatherData.current.condition.text,
    feelsLikeC: Math.round(weatherData.current.feelslike_c),
    feelsLikeF: Math.round(weatherData.current.feelslike_f),
    currentTempC: Math.round(weatherData.current.temp_c),
    currentTempF: Math.round(weatherData.current.temp_f),
    windKph: Math.round(weatherData.current.wind_kph),
    humidity: weatherData.current.humidity,
    location: weatherData.location.name.toUpperCase(),
    region: weatherData.location.country.toUpperCase()
  };
}

function updateWeatherUI() {
  if (!currentWeatherData) return;
  
  // Apply animations
  weatherInfo.forEach(div => {
    div.classList.remove('scale-in');
    void div.offsetWidth; // Trigger reflow
    div.classList.add('scale-in');
  });
  
  // Update DOM
  conditionEl.textContent = currentWeatherData.condition.toUpperCase();
  locationEl.textContent = `${currentWeatherData.location}, ${currentWeatherData.region}`;
  
  // Update temperature based on selected unit
  if (currentUnit === 'c') {
    degreesEl.textContent = currentWeatherData.currentTempC;
    unitEl.textContent = '°C';
    feelsLikeEl.textContent = currentWeatherData.feelsLikeC;
    feelsLikeUnit.textContent = '°C';
  } else {
    degreesEl.textContent = currentWeatherData.currentTempF;
    unitEl.textContent = '°F';
    feelsLikeEl.textContent = currentWeatherData.feelsLikeF;
    feelsLikeUnit.textContent = '°F';
  }
  
  windEl.textContent = currentWeatherData.windKph;
  humidityEl.textContent = currentWeatherData.humidity;
}

function showError() {
  errorMsg.style.display = 'block';
  errorMsg.classList.remove('fade-in');
  void errorMsg.offsetWidth; // Trigger reflow
  errorMsg.classList.add('fade-in');
}

// Initialize with default location
window.addEventListener('DOMContentLoaded', () => {
  getWeatherData('Sri City')
    .then(data => {
      currentWeatherData = processData(data);
      updateWeatherUI();
    })
    .catch(showError);
});
