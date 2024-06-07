import { Link } from "react-router-dom";
import wtwrLogo from "../../assets/images/wtwr-logo.svg";
import userPic from "../../assets/images/user-pic.svg";
import "../Header/Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});

function Header({ handleAddClick, weatherData }) {
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
      <div className="header__user-container">
        <ToggleSwitch />
        <button
          type="button"
          onClick={handleAddClick}
          className="header__add-button"
        >
          + Add clothes
        </button>
        <Link to="/profile" className="header__user-link">
          <p className="header__user-info">Terrence Tegegne</p>
          <img
            className="header__avatar"
            src={userPic}
            alt="Terrence Tegegne"
          />
        </Link>
      </div>
    </header>
  );
}

export default Header;
