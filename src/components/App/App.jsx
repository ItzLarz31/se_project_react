import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import LoginModal from "../LoginModal/LoginModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal.jsx";
import { getWeatherData, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import { CurrentTempUnitContext } from "../../utils/contexts/CurrentTempUnitContext.jsx";
import {
  getItems,
  pushItems,
  deleteItems,
  getUserInfo,
  editProfile,
  addCardLike,
  removeCardLike,
} from "../../utils/api.js";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import { register, signIn, checkToken } from "../../utils/auth.js";
import { setToken, getToken, removeToken } from "../../utils/token.js";
import CurrentUserContext from "../../utils/contexts/CurrentUserContext.jsx";

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
  const [isAuth, setIsAuth] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const getUserItems = () => {
    return clothingItems.filter((item) => item.owner === currentUser?._id);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };
  const handleLoginClick = () => {
    setActiveModal("login");
  };
  const handleRegisterClick = () => {
    setActiveModal("register");
  };
  const handleProfileEditClick = () => {
    setActiveModal("edit-profile");
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

  const handleRegistration = (formData, resetForm) => {
    setIsLoading(true);
    const { email, password, name, avatar } = formData;

    register(email, password, name, avatar)
      .then(() => {
        closeActiveModal();
        resetForm();
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSignIn = (formData, resetForm) => {
    setIsLoading(true);
    const { email, password } = formData;

    if (!email || !password) {
      setIsLoading(false);
      return;
    }

    signIn(email, password)
      .then((data) => {
        if (data.token) {
          setToken(data.token);
          setIsAuth(true);
          return getUserInfo(data.token);
        } else {
          throw new Error("Sign-in failed: No token returned.");
        }
      })
      .then((user) => {
        if (user) {
          setCurrentUser(user);
          closeActiveModal();
          resetForm();
        } else {
          throw new Error("Failed to fetch user information.");
        }
      })
      .catch((error) => {
        console.error("Error during sign-in or fetching user info:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSignOut = () => {
    removeToken();
    setIsAuth(false);
    setCurrentUser(null);
  };

  const handleEditProfile = (formData, resetForm) => {
    setIsLoading(true);
    editProfile(formData)
      .then((data) => {
        setCurrentUser(data);
        closeActiveModal();
        resetForm();
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((like) => like === currentUser._id);
    const likeAction = isLiked ? removeCardLike : addCardLike;

    likeAction(card._id)
      .then((newCard) => {
        const updatedCards = clothingItems.map((item) =>
          item._id === newCard._id ? newCard : item
        );
        setClothingItems(updatedCards);
      })
      .catch(console.error);
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
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    checkToken(token)
      .then(() => {
        setIsAuth(true);
        return getUserInfo(token); // Fetch user info after token validation
      })
      .then((user) => {
        setCurrentUser(user); // Set the fetched user information in the state
      })
      .catch(() => {
        setIsAuth(false);
        setCurrentUser(null); // Clear the user information on failure
      });
  }, []);

  return (
    <div className="page">
      <CurrentUserContext.Provider value={{ currentUser }}>
        <CurrentTempUnitContext.Provider
          value={{ currentTempUnit, handleToggleSwitch }}
        >
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              handleLoginClick={handleLoginClick}
              handleRegisterClick={handleRegisterClick}
              isAuth={isAuth}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isAuth={isAuth}>
                    <Profile
                      handleCardClick={handleCardClick}
                      handleAddClick={handleAddClick}
                      handleProfileEditClick={handleProfileEditClick}
                      clothingItems={getUserItems()}
                      handleSignOut={handleSignOut}
                      onCardLike={handleCardLike}
                    />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" />} replace />
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
          <LoginModal
            isOpen={activeModal === "login"}
            title={"Log in"}
            closeActiveModal={closeActiveModal}
            onSubmit={handleSignIn}
            isLoading={isLoading}
            handleRegisterClick={handleRegisterClick}
          />
          <RegisterModal
            isOpen={activeModal === "register"}
            title={"Sign up"}
            closeActiveModal={closeActiveModal}
            onSubmit={handleRegistration}
            isLoading={isLoading}
            handleLoginClick={handleLoginClick}
            // handleRegistration={handleRegistration}
          />
          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            title={"Change profile data"}
            closeActiveModal={closeActiveModal}
            onSubmit={handleEditProfile}
            isLoading={isLoading}
          />
        </CurrentTempUnitContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
