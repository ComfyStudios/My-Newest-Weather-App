function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  humidityElement.innerHTML = response.data.main.humidity;
}

let apiKey = "2a953d8a53343c52593a07ae6489702d";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=west covina&appid=2a953d8a53343c52593a07ae6489702d&units=Imperial`;

let city = "West Covina";
axios.get(apiUrl).then(displayTemperature);
