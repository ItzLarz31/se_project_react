import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import ConfirmationModal from "../../ConfirmationModal/ConfirmationModal.jsx";
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
  const [isLoading, setIsLoading] = useState(false);

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

  const handleAddItem = (formData, resetForm) => {
    setIsLoading(true);
    const { title, url, weather } = formData;

    pushItems(title, weather, url)
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
        closeActiveModal();
        resetForm();
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDeleteItem = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const id = selectedCard._id;
    deleteItems(id)
      .then(() => {
        const updatedItems = clothingItems.filter((item) => item._id !== id);
        setClothingItems(updatedItems);
        closeActiveModal();
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
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
        <AddItemModal
          isOpen={activeModal === "add-garment"}
          title={"New garment"}
          closeActiveModal={closeActiveModal}
          onSubmit={handleAddItem}
          isLoading={isLoading}
        />
        <ItemModal
          closeActiveModal={closeActiveModal}
          activeModal={activeModal}
          card={selectedCard}
          onClick={handelDeleteClick}
        />
        <ConfirmationModal
          isOpen={activeModal === "delete"}
          closeActiveModal={closeActiveModal}
          onSubmit={handleDeleteItem}
          isLoading={isLoading}
        />
      </CurrentTempUnitContext.Provider>
    </div>
  );
}

export default App;
