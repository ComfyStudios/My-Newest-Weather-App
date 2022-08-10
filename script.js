function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  let iconElement = document.querySelector("#icon");

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  humidityElement.innerHTML = response.data.main.humidity;
  hoursElement.innerHTML = response.data.hours.main;
  nowElement.innerHTML = `${hours}:${minutes}`;
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

let city = "West Covina";
let apiKey = "2a953d8a53343c52593a07ae6489702d";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=west covina&appid=2a953d8a53343c52593a07ae6489702d&units=Imperial`;

axios.get(apiUrl).then(displayTemperature);
searchCity("West Covina");
