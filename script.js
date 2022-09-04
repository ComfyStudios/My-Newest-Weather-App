function formateDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "a43564c91a6c605aeb564c9ed02e3858";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  let iconElement = document.querySelector("#icon");
  let dateElement = document.querySelector("#date");

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  humidityElement.innerHTML = response.data.main.humidity;
  dateElement.innerHTML = formateDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "a43564c91a6c605aeb564c9ed02e3858";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSumbit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class ="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
  <div class="col-2">
  <div class="weather-forecast-date">${formateDate(forecastDay.dt)}</div>
  <img
  src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
  alt=""
  width="42"
  />
  <div class="weather-forecast-temperature">
  <span class="weather-forecast-temperature-max"> ${Math.round(
    forecastDay.temp.max
  )}° | </span>
  <span class="weather-forecast-temperature-min"> ${Math.round(
    forecastDay.temp.min
  )}° </span>
  </div>
  </div>
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function formateDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

search("Covina");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSumbit);
