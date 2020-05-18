let weatherApp = new Vue ({
    el: '#app',
    data: {
        name: '',
        currentTemp: '',
        minTemp: '',
        maxTemp:'',
        sunrise: '',
        sunset: '',
        pressure: '',
        humidity: '',
        wind: '',
        overcast: '',
        icon: ''
    },
    methods: {
      getWeather() {
        let url = "http://api.openweathermap.org/data/2.5/weather?q=Moscow&units=metric&appid=699be447d91ec1be2f59446a75e073ff";
        axios
          .get(url)
          .then(response => {
                this.name = response.data.name;
                this.currentTemp = response.data.main.temp + '°';
                this.minTemp = response.data.main.temp_min + '°';
                this.maxTemp = response.data.main.temp_max + '°';
                this.pressure = response.data.main.pressure  + 'mmHg';
                this.humidity = response.data.main.humidity + '%';
                this.wind = response.data.wind.speed + 'm/s';
                this.overcast = response.data.weather[0].description;
                this.icon = "images/" + response.data.weather[0].icon.slice(0, 2) + ".svg";
                this.sunrise = new Date(response.data.sys.sunrise*1000).toLocaleTimeString("en-GB").slice(0,5);
                this.sunset = new Date(response.data.sys.sunset*1000).toLocaleTimeString("en-GB").slice(0,5);
        })
        .catch(error => {
          console.log(error);
        })
      },
    },
    beforeMount() {
      this.getWeather();
      }
  });