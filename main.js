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
        locationFound: ''
    },
    methods: {
      getWeather() {
          const APIkey = '699be447d91ec1be2f59446a75e073ff';
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
              lon = position.coords.longitude;
              lat = position.coords.latitude;
              fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${APIkey}`)
                  .then(res => {
                    return res.json();
                  }).then(res => {
                    this.name = res.name;
                    this.currentTemp = res.main.temp + '°C';
                    this.minTemp = res.main.temp_min + '°C';
                    this.maxTemp = res.main.temp_max + '°C';
                    this.pressure = res.main.pressure  + ' mmHg';
                    this.humidity = res.main.humidity + '%';
                    this.wind = res.wind.speed + ' m/s';
                    this.overcast = res.weather[0].description;
                    this.sunrise = new Date(res.sys.sunrise*1000).toLocaleTimeString("en-GB").slice(0,5);
                    this.sunset = new Date(res.sys.sunset*1000).toLocaleTimeString("en-GB").slice(0,5);
                  });
              }), (error) => {
                  this.locationFound = 'Error';
              };
          } else {
            alert('ERROR! NO GEOLOCATION IN YOUR BROWSER!');
          }
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

  