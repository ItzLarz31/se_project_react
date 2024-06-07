import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import { getWeatherData, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import { CurrentTempUnitContext } from "../../utils/contexts/CurrentTempUnitContext.jsx";
import { getItems, pushItems, deleteItems } from "../../utils/api.js";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "hot",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTempUnit, setCurrentTempUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);

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

  const handelDeleteClick = () => {
    setActiveModal("delete");
  };

  const handleToggleSwitch = (e) => {
    const isChecked = e.target.checked;
    setCurrentTempUnit(isChecked ? "C" : "F");
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.elements.title.value;
    const imageUrl = form.elements.url.value;
    const weather = form.elements.weather.value;

    pushItems(name, weather, imageUrl)
      .then((newItem) => {
        setClothingItems([...clothingItems, newItem]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleDeleteItem = (e) => {
    e.preventDefault();
    const id = selectedCard._id;
    deleteItems(id)
      .then(() => {
        const updatedItems = clothingItems.filter((item) => item._id !== id);
        setClothingItems(updatedItems);
      })
      .catch(console.error);

    closeActiveModal();
  };

  useEffect(() => {
    getWeatherData(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        console.log(data);
        setClothingItems(data);
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
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  handleCardClick={handleCardClick}
                  handleAddClick={handleAddClick}
                  clothingItems={clothingItems}
                />
              }
            />
          </Routes>

          <Footer />
        </div>
        <ModalWithForm
          isOpen={activeModal === "add-garment"}
          // buttonText={"Add garment"}
          title={"New garment"}
          closeActiveModal={closeActiveModal}
          onSubmit={handleAddItem}
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
            <button type="submit" className="modal__save modal__save_disabled">
              Add garment
            </button>
          </div>
        </ModalWithForm>
        <ItemModal
          closeActiveModal={closeActiveModal}
          activeModal={activeModal}
          card={selectedCard}
          onClick={handelDeleteClick}
        />
        <ModalWithForm
          closeActiveModal={closeActiveModal}
          isOpen={activeModal === "delete"}
        >
          <p className="modal__text">
            Are you sure you want to delete this item?
            <br />
            This action is irreversible.
          </p>

          <button
            onClick={handleDeleteItem}
            type="submit"
            className="modal__confirm-delete-btn"
          >
            Yes, delete item
          </button>
          <button
            onClick={closeActiveModal}
            type="button"
            className="modal__cancel-btn"
          >
            Cancel
          </button>
        </ModalWithForm>
      </CurrentTempUnitContext.Provider>
    </div>
  );
}

export default App;
