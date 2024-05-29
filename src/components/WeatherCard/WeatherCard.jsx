import "../WeatherCard/WeatherCard.css";
import { weatherOptions } from "../../utils/constants";
import sunnyDay from "../../assets/images/day/sunny.svg";

function WeatherCard({ weatherData }) {
  // const filteredOption = weatherOptions.filter((option) => {
  //   return (
  //     option.day === weatherData.isDay &&
  //     option.condition === weatherData.condition
  //   );
  // });

  // const weatherOption = filteredOption[0];
  // debugger;

  return (
    <section className="weather-card">
      <img
        className="weather-card__image"
        src={sunnyDay}
        alt="sunnyDay image"
      />
      <p className="weather-card__temp">{weatherData.temp.F}&deg;F</p>
    </section>
  );
}

export default WeatherCard;
