import React from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
// import { defaultClothingItems } from "../../utils/constants.js";
import ItemCard from "../ItemCard/ItemCard.jsx";
import "../Main/Main.css";
import { CurrentTempUnitContext } from "../../utils/contexts/CurrentTempUnitContext.jsx";

function Main({ weatherData, handleCardClick, clothingItems }) {
  const { currentTempUnit } = React.useContext(CurrentTempUnitContext);
  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp[currentTempUnit]} / You may want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((item) => {
              return (
                item.weather.toLowerCase() == weatherData.type.toLowerCase()
              );
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
