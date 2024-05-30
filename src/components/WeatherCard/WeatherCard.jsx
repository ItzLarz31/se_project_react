import "../WeatherCard/WeatherCard.css";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";
import sunnyDay from "../../assets/images/day/sunny.svg";

function WeatherCard({ weatherData }) {
  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  let weatherOption;
  if (filteredOptions.length === 0) {
    weatherOption = defaultWeatherOptions[weatherData.isDay ? "day" : "night"];
  } else {
    weatherOption = filteredOptions[0];
  }

  return (
    <section className="weather-card">
      <img
        className="weather-card__image"
        src={weatherOption?.url}
        alt={weatherOption.condition}
      />
      <p className="weather-card__temp">{weatherData.temp.F}&deg;F</p>
    </section>
  );
}

export default WeatherCard;
