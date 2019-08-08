import React, { Component } from "react";
import Axios from "axios";
import UpComingWeather from "./Components/UpComingWeather";
import CardWeather from "./Components/CardWeather";
import SearchForm from "./Components/SearchForm";
import Loader from "./Components/Loader";
import Foother from "./Components/Foother";

const API_ID = "36f0d90b7192ba111ded2e81c0c99ed2";

class App extends Component {
  constructor() {
    super();
    this.state = {
      temps5: [],
      weathers5: [],
      icons5: [],
      name: "",
      cityName: "",
      country_code: "",
      wind: "",
      temp: "",
      temp_max: "",
      temp_min: "",
      humidity: "",
      lat: 0,
      long: 0,
      windSpeed: "",
      description: "",
      icon: "",
      Loading: true,
      error:''
    };
    this.weatherIcon = {
      Thunderstrom: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    };
  }

  get_WeatherIcon(icons, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId < 232:
        this.setState({ icon: icons.Thunderstorm });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon: icons.Drizzle });
        break;
      case rangeId >= 500 && rangeId <= 521:
        this.setState({ icon: icons.Rain });
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({ icon: icons.Snow });
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({ icon: icons.Atmosphere });

        break;
      case rangeId === 800:
        this.setState({ icon: icons.Clear });
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({ icon: icons.Clouds });
        console.log(3333);

        break;
      default:
        this.setState({ icon: icons.Clouds });
    }
  }

  //Get Loction / Weather / upComping Days
  getPostion() {
    navigator.geolocation.getCurrentPosition(position => {
      Axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${
          position.coords.latitude
        }&lon=${position.coords.longitude}&appid=${API_ID}`
      ).then(response => {
        const { temp, temp_max, temp_min, humidity } = response.data.main;
        const { name, sys, weather, wind } = response.data;
        const { description, id } = weather[0];
        const windSpeed = wind.speed;
        this.setState({
          temp: this.fromKtoC(temp),
          temp_max: this.fromKtoC(temp_max),
          temp_min: this.fromKtoC(temp_min),
          humidity: humidity,
          wind: wind,
          cityName: name,
          country_code: id,
          name: `${name}, ${sys.country}`,
          id: id,
          description: description.toUpperCase(),
          windSpeed: windSpeed,
          Loading: false,
          error: false
        });
        this.get_WeatherIcon(this.weatherIcon, id);
        Axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${
            position.coords.latitude
          }&lon=${position.coords.longitude}&appid=${API_ID}`
        ).then(result => {
          const temps = [];
          const weather = [];
          for (let i = 1; i < 5; i++) {
            temps.push(this.fromKtoC(result.data.list[8 * i].main.temp));
            weather.push(result.data.list[8 * i].weather[0].main);
          }
          console.log(temps);
          console.log(weather);

          temps.push(true);
          this.setState({ temps5: temps, weathers5: weather });
          console.log(this.state);
        });
      });
    });
  }

  // On Search

  onSearch = async e => {
    e.preventDefault();

    const country = e.target.elements.country.value;
    const city = e.target.elements.city.value;

    if (country && city) {
      Axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_ID}`
      )
        .then(response => {
          const { temp, temp_max, temp_min, humidity } = response.data.main;
          const { name, sys, weather, wind } = response.data;
          const { description, id } = weather[0];
          const windSpeed = wind.speed;
          this.setState({
            temp: this.fromKtoC(temp),
            temp_max: this.fromKtoC(temp_max),
            temp_min: this.fromKtoC(temp_min),
            humidity: humidity,
            wind: wind,
            cityName: name,
            country_code: id,
            name: `${name}, ${sys.country}`,
            id: id,
            description: description.toUpperCase(),
            windSpeed: windSpeed,
            Loading: false,
            error: false
          });
          this.get_WeatherIcon(this.weatherIcon, id);
          Axios.get(
            `http://api.openweathermap.org/data/2.5/forecast?q=${
              this.state.cityName
            },${this.state.country_code}&appid=36f0d90b7192ba111ded2e81c0c99ed2`
          ).then(result => {
            console.log(result);

            const temps = [];
            const weather = [];
            for (let i = 1; i < 5; i++) {
              temps.push(this.fromKtoC(result.data.list[8 * i].main.temp));
              weather.push(result.data.list[8 * i].weather[0].main);
            }
            temps.push(true);
            this.setState({ temps5: temps, weathers5: weather });
          });
        })
        .catch(() => {
          this.setState(() => ({
            error: "Data Not Found"
          }));
        });
    } else {
      this.setState(() => ({
        error: "Enter Input Values"
      }));
    }
  };

  fromKtoC = temp => (temp - 273).toFixed(1);

  getGradient(temp) {
    if (temp < 0) return "linear-gradient(to right, #3E5151 ,#DECBA4)";
    else if (temp >= 0 && temp <= 20)
      return "linear-gradient(to right, #bdc3c7, #2c3e50)";
    else if (temp >= 20 && temp <= 30)
      return "linear-gradient(to right, #388ff2, #b2c5d1)";
    else if (temp > 30)
      return "linear-gradient(to right, rgb(250, 150, 50), rgb(195, 56, 75))";
    else return "linear-gradient(to right, #5f2c82, #49a09d)";
  }
  componentDidMount() {
    this.getPostion();
  }

  render() {
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    days = [...days, ...days];
    const today = new Date().getDay();
    days = days.slice(today + 1, today + 5);
    const {
      name,
      temp,
      temp_max,
      temp_min,
      humidity,
      windSpeed,
      description,
      icon,
      Loading,
      error
    } = this.state;
    console.log(icon);

    if (Loading) {
      return <Loader />;
    } else {
      return (
        <React.Fragment>
          <div
            className="App"
            style={{ backgroundImage: this.getGradient(temp) }}
          >
            <SearchForm onSearch={this.onSearch} error={error} />
            <div className="weather-contine">
              <CardWeather
                weatherIcon={icon}
                name={name}
                temp={temp}
                description={description}
                temp_max={temp_max}
                temp_min={temp_min}
                humidity={humidity}
                windSpeed={windSpeed}
              />
            </div>
            <hr/>
            <h2 className="upHeading">UpComing</h2>
            <div className="weather__wrapper">
              {days.map((day, i) => (
                <UpComingWeather
                  {...{ day }}
                  temp={this.state.temps5[i]}
                  weather={this.state.weathers5[i]}
                  weatherIcon={icon}
                />
              ))}
            </div>
            <Foother />
          </div>
        </React.Fragment>
      );
    }
  }
}

export default App;
