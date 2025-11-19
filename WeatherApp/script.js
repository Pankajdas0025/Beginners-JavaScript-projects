
const apiKey = api.env.apiKeyvalue;



    // Auto-detect current location on load
    window.onload = () =>
    {
      if (navigator.geolocation)
      {
        navigator.geolocation.getCurrentPosition(success, error);
      }
      else {
        document.getElementById("loadingMsg").textContent = "Geolocation not supported.";
      }
    };

    function success(position)
    {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      document.getElementById("loadingMsg").textContent = "";
      getWeatherByCoords(lat, lon);
    }

    function error() {
      document.getElementById("loadingMsg").textContent = "Location access denied. You can enter city manually.";
    }

    // fetch weather api
      async function getWeatherByCoords(lat, lon) {
      const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}`;
      fetchWeather(url);
    }

    async function getWeather() {
      const city = document.getElementById("cityInput").value.trim();
      if (!city) {
        document.getElementById("weatherResult").innerHTML = "<p>Please enter a city name.</p>";
        return;
      }
      const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
      fetchWeather(url);
    }

    async function fetchWeather(url) {
      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.location) {
          const weatherHTML = `
            <h2>${data.location.name}, ${data.location.country}</h2>
            <p>🌡️ Temp: ${data.current.temp_c}°C</p>
            <p>☁️ Condition: ${data.current.condition.text}</p>
            <img src="https:${data.current.condition.icon}" alt="weather icon" />
            <p>💧 Humidity: ${data.current.humidity}%</p>
            <p>🌬️ Wind: ${data.current.wind_kph} kph</p>
          `;
          document.getElementById("weatherResult").innerHTML = weatherHTML;
        } else {
          document.getElementById("weatherResult").innerHTML = "<p>City not found!</p>";
        }
      } catch (err) {
        document.getElementById("weatherResult").innerHTML = "<p>Error fetching weather data.</p>";
      }
    }
