let weatherApp = new Vue({
  el: "#app",
  data: {
    name: "",
    currentTemp: "",
    minTemp: "",
    maxTemp: "",
    sunrise: "",
    sunset: "",
    pressure: "",
    humidity: "",
    wind: "",
    overcast: "",
    locationFound: "",
    errorMsg: "ERROR! NO GEOLOCATION IN YOUR BROWSER!",
    cityMsg: "Сменить город",
  },
  methods: {
    getWeather() {
      const APIkey = "699be447d91ec1be2f59446a75e073ff";
      let img = document.querySelector(".weather__overcast-image");
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          lon = position.coords.longitude;
          lat = position.coords.latitude;
          fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=ru&appid=${APIkey}`,
          )
            .then((res) => {
              return res.json();
            })
            .then((res) => {
              this.name = res.name;
              this.currentTemp = res.main.temp + "°C";
              this.minTemp = res.main.temp_min + "°C";
              this.maxTemp = res.main.temp_max + "°C";
              this.pressure = res.main.pressure + " мм рт. ст.";
              this.humidity = res.main.humidity + "%";
              this.wind = res.wind.speed + " м/с";
              this.overcast = res.weather[0].description;
              this.sunrise = new Date(res.sys.sunrise * 1000).toLocaleTimeString("en-GB").slice(0, 5);
              this.sunset = new Date(res.sys.sunset * 1000).toLocaleTimeString("en-GB").slice(0, 5);
              img.src = `http://openweathermap.org/img/wn/${res.weather[0].icon}.png`;

              const appContainer = document.querySelector(".app__container");
              appContainer.style.display = "flex";
            });
        }),
          (error) => {
            this.locationFound = "Error, not find";
          };
      } else {
        alert(this.errorMsg);
        console.error(new Error(this.errorMsg));
      }
    },
  },
  mounted() {
    const getWeatherByCity = async (e) => {
      e.preventDefault();

      const APIkey = "699be447d91ec1be2f59446a75e073ff";
      let city = document.querySelector(".input-city").value;
      let img = document.querySelector(".weather__overcast-image");

      try {
        if (city !== "") {
          const weatherUrl = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&appid=${APIkey}&units=metric`,
          );
          const data = await weatherUrl.json();
          if (data.cod !== "404") {
            this.name = data.name;
            this.currentTemp = data.main.temp + "°C";
            this.minTemp = data.main.temp_min + "°C";
            this.maxTemp = data.main.temp_max + "°C";
            this.pressure = data.main.pressure + " мм рт. ст.";
            this.humidity = data.main.humidity + "%";
            this.wind = data.wind.speed + " м/с";
            this.overcast = data.weather[0].description;
            this.sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString("en-GB").slice(0, 5);
            this.sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString("en-GB").slice(0, 5);
            img.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
          }
        }
      } catch (err) {
        console.error(err);
      }
    };

    const btn = document.querySelector(".btn");
    btn.addEventListener("click", getWeatherByCity);

    const cityInput = document.querySelector(".input-city");
    const form = document.querySelector(".input-form");

    cityInput.addEventListener("input", function () {
      if (cityInput.value == "") {
        btn.classList.add("hidden");
        cityInput.classList.add("input-error");
        form.insertAdjacentHTML("beforebegin", '<div class="locationError">Введите название города</div>');
      } else {
        btn.classList.remove("hidden");
        cityInput.classList.remove("input-error");
        cityInput.classList.add("input-ok");
        const errorInputMsg = document.querySelector(".locationError");
        if (errorInputMsg) {
          errorInputMsg.remove();
        }
      }
    });

    this.getWeather();
  },
});
