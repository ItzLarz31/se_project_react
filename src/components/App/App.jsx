import { useEffect, useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemCard from "../ItemCard/ItemCard";
import ItemModal from "../ItemModal/ItemModal";
import { getWeatherData, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import { CurrentTempUnitContext } from "../contexts/CurrentTempUnitContext";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "hot",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTempUnit, setCurrentTempUnit] = useState("F");

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };
  const closeActiveModal = () => {
    setActiveModal("");
  };
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleToggleSwitch = (e) => {
    const isChecked = e.target.checked;
    setCurrentTempUnit(isChecked ? "C" : "F");
  };

  useEffect(() => {
    getWeatherData(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <CurrentTempUnitContext.Provider
        value={{ currentTempUnit, handleToggleSwitch }}
      >
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Main weatherData={weatherData} handleCardClick={handleCardClick} />
          <Footer />
        </div>
        <ModalWithForm
          isOpen={activeModal === "add-garment"}
          buttonText={"Add garment"}
          title={"New garment"}
          closeActiveModal={closeActiveModal}
        >
          <label className="modal__input-label" htmlFor="card-title-input">
            Name
          </label>
          <input
            type="text"
            name="title"
            id="card-title-input"
            placeholder="Name"
            className="modal__input"
            minLength="1"
            maxLength="30"
            required
          />
          <span className="modal__error" id="card-title-input-error"></span>
          <label className="modal__input-label" htmlFor="card-url-input">
            Image
          </label>
          <input
            type="url"
            name="url"
            id="card-url-input"
            placeholder="Image URL"
            className="modal__input"
            required
          />
          <span className="modal__error" id="card-url-input-error"></span>
          <p className="modal__radio-label">Select the weather type:</p>
          <div className="modal__radio-group">
            <label>
              <input type="radio" name="weather" id="weather-hot" value="Hot" />
              Hot
            </label>
            <label>
              <input
                type="radio"
                name="weather"
                id="weather-warm"
                value="Warm"
              />
              Warm
            </label>
            <label>
              <input
                type="radio"
                name="weather"
                id="weather-cold"
                value="Cold"
              />
              Cold
            </label>
          </div>
        </ModalWithForm>
        <ItemModal
          closeActiveModal={closeActiveModal}
          activeModal={activeModal}
          card={selectedCard}
        />
      </CurrentTempUnitContext.Provider>
    </div>
  );
}

export default App;
