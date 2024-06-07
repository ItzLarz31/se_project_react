import React from "react";
import "../WeatherCard/WeatherCard.css";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";
import { CurrentTempUnitContext } from "../../utils/contexts/CurrentTempUnitContext";

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

  const { currentTempUnit } = React.useContext(CurrentTempUnitContext);

  return (
    <section className="weather-card">
      <img
        className="weather-card__image"
        src={weatherOption?.url}
        alt={weatherOption.condition}
      />
      <p className="weather-card__temp">{weatherData.temp[currentTempUnit]}</p>
    </section>
  );
}

export default WeatherCard;
