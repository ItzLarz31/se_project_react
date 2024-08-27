import { Link } from "react-router-dom";
import wtwrLogo from "../../assets/images/wtwr-logo.svg";
import "../Header/Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});

function Header({
  handleAddClick,
  weatherData,
  handleLoginClick,
  handleRegisterClick,
  isAuth,
  currentUser,
}) {
  const userInitial = currentUser?.name
    ? currentUser.name.charAt(0).toUpperCase()
    : "";

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/">
          <img className="header__logo" src={wtwrLogo} alt="WTWR Logo" />
        </Link>
        <p className="header__date">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <ToggleSwitch />
      <div className="header__user-container">
        {isAuth ? (
          <>
            <button
              type="button"
              onClick={handleAddClick}
              className="header__add-button"
            >
              + Add clothes
            </button>
            <Link to="/profile" className="header__user-link">
              <p className="header__user-info">
                {currentUser ? currentUser.name : "Loading..."}
              </p>
              {currentUser && currentUser.avatar ? (
                <img
                  className="header__avatar"
                  src={currentUser.avatar}
                  alt="User avatar"
                />
              ) : (
                <div className="header__avatar header__avatar-placeholder">
                  {userInitial}
                </div>
              )}
            </Link>
          </>
        ) : (
          <>
            <button
              type="button"
              className="header__register-button"
              onClick={handleRegisterClick}
            >
              Sign Up
            </button>
            <button
              type="button"
              className="header__login-button"
              onClick={handleLoginClick}
            >
              Log In
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
