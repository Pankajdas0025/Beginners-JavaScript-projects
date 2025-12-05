const apiKey = "bee21bcb40eee19046561a80dda06f75";
// Auto-detect current location
window.onload = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    document.getElementById("loadingMsg").textContent =
      "Geolocation not supported.";
  }
};

function success(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  document.getElementById("loadingMsg").textContent = "";
  getWeatherByCoords(lat, lon);
}

function error() {
  document.getElementById("loadingMsg").textContent =
    "Location blocked. Enter city manually.";
}

// Fetch using coordinates
async function getWeatherByCoords(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  fetchWeather(url);
}

// Fetch using city name
async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();

  if (!city) {
    document.getElementById("weatherResult").innerHTML =
      "<p>Please enter a city name.</p>";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  fetchWeather(url);
}

// Fetch and display weather
async function fetchWeather(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();

    // City not found
    if (data.cod === "404") {
      document.getElementById("weatherResult").innerHTML =
        `<p>❌ City not found</p>`;
      return;
    }

    // Invalid API key
    if (data.cod === 401) {
      document.getElementById("weatherResult").innerHTML =
        `<p>❌ API Key Invalid</p>`;
      return;
    }

    // Weather Info
    const weatherHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p>🌡️ Temp: ${data.main.temp}°C</p>
      <p>☁️ Condition: ${data.weather[0].description}</p>
      <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" />
      <p>💧 Humidity: ${data.main.humidity}%</p>
      <p>🌬️ Wind: ${data.wind.speed} m/s</p>
    `;

    document.getElementById("weatherResult").innerHTML = weatherHTML;

  } catch (err) {
    document.getElementById("weatherResult").innerHTML =
      "<p>Error fetching weather data.</p>";
  }
}
