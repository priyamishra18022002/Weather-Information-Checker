let weather = {
  apiKey: "d3918bc9e1ab292dd1466a1124ce6ee0",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("Sorry! Please try again");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    //fetching data to be displayed
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, temp_min, temp_max, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".weatherdescription").innerText = description;
    //temperature
    document.querySelector(".temp").innerText = temp + "°C";
    //maximum temperature
    document.querySelector(".max_temp").innerText =
      "Maximum temperature: " + temp_max + "°C";
    //minimum temperature
    document.querySelector(".min_temp").innerText =
      "Minimum temperature: " + temp_min + "°C";
    //humidity
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    //wind
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";
    //removing div while loading
    document.querySelector(".weatherinfo").classList.remove("loading");
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Kanpur");