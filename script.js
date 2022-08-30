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
}

function search(city) {
  let apiKey = "2a953d8a53343c52593a07ae6489702d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=Imperial`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSumbit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class ="row">`;
  let days = ["Thurs", "Fri", "Sat", "Sun"];

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
  <div class="Weekly-forcast" id="forecast">${day}</div>
  <div class="col-2">
  <img
  src="https://ssl.gstatic.com/onebox/weather/48/partly_cloudy.png"
  alt="weather"
  width="42"
  />
  </div>
  <div class="Weather-forecast-temperature">
  <span class="weather-forecast-temperature-max"> 91° | </span>
  <span class="weather-forecast-temperature-min"> 75°</span>
  </div>
  </div>
  `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

search("Covina");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSumbit);
displayForecast();
