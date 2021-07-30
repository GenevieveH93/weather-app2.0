function currentTime() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];
  let day = days[now.getDay()];
  let hour = now.getHours();
  if (hour < 10) {
      hour = `0${hour}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let todayTime = document.querySelector("#current-time");
  todayTime.innerHTML = `${day} ${hour}:${minutes}`;
}
currentTime();

function displayWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  document.querySelector("#current-temp").innerHTML = temperature;
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  function fahrenheit(event) {
    let tempCelsius = temperature;
    let tempFahrenheit = Math.round((tempCelsius * 9) / 5 + 32);
    document.querySelector("#current-temp").innerHTML = tempFahrenheit;
  }
  document.querySelector("#fahrenheit-link").addEventListener("click", fahrenheit);
  function celsius(event) {
    let tempCelsius = temperature;
    document.querySelector("#current-temp").innerHTML = tempCelsius;
  }
  document.querySelector("#celsius-link").addEventListener("click", celsius);
}

function searchCity(city) {
  let apiKey = "9f8717af0ae325e970e3979adb350412";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function weatherSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function clickGeoUrl(event) {
  function apiGeoUrl(position) {
    let apiKey = "9f8717af0ae325e970e3979adb350412";
    let unit = "metric";
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiGeoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
    axios.get(apiGeoUrl).then(displayWeather);
  }
  navigator.geolocation.getCurrentPosition(apiGeoUrl);
}

let citySubmit = document.querySelector("#search-bar");
citySubmit.addEventListener("submit", weatherSubmit);

let currentLocationClick = document.querySelector("#current-location");
currentLocationClick.addEventListener("click", clickGeoUrl);

searchCity("Sydney");
