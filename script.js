function displayTemperature(response) {
  console.log(response.data.main.temp);
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let iconElement = document.querySelector("#icon");

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

let apiKey = "2a953d8a53343c52593a07ae6489702d";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=west Covina&appid=2a953d8a53343c52593a07ae6489702d&units=Imperial`;

let city = "west covina";
axios.get(apiUrl).then(displayTemperature);
