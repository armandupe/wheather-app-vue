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
        overcast: ''
    },
    methods: {
      getWeather() {
        const city = 'Penza';
        const APIkey = '699be447d91ec1be2f59446a75e073ff';
      
        // function success(position) {
        //   const lat  = position.coords.latitude;
        //   const lon = position.coords.longitude;
        // }
        // navigator.geolocation.getCurrentPosition(success);
       
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`;
        //let url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${APIkey}`;
        axios
          .get(url)
          .then(response => {
                this.name = response.data.name;
                this.currentTemp = response.data.main.temp + '°C';
                this.minTemp = response.data.main.temp_min + '°C';
                this.maxTemp = response.data.main.temp_max + '°C';
                this.pressure = response.data.main.pressure  + ' mmHg';
                this.humidity = response.data.main.humidity + '%';
                this.wind = response.data.wind.speed + ' m/s';
                this.overcast = response.data.weather[0].description;
                this.sunrise = new Date(response.data.sys.sunrise*1000).toLocaleTimeString("en-GB").slice(0,5);
                this.sunset = new Date(response.data.sys.sunset*1000).toLocaleTimeString("en-GB").slice(0,5);
        })
        .catch(error => {
          console.log(error);
        })
      },
      getCurrentTime() {
        let date = new Date();
        let currentHour = date.getHours();
        if (currentHour >= 5 && currentHour <= 22) return true;
      },
    },
    mounted() {
      this.getWeather();
    },
  });

  