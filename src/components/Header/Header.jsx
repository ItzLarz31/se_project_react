import wtwrLogo from "../../assets/images/wtwr-logo.svg";
import userPic from "../../assets/images/user-pic.svg";
import "../Header/Header.css";

const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});

function Header({ handleAddClick, weatherData }) {
  return (
    <header className="header">
      <div className="header__container">
        <img className="header__logo" src={wtwrLogo} alt="WTWR Logo" />
        <p className="header__date">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <div className="header__user-container">
        <button
          type="button"
          onClick={handleAddClick}
          className="header__add-button"
        >
          + Add clothes
        </button>
        <p className="header__user-info">Terrence Tegegne</p>
        <img
          className="header__user-pic"
          src={userPic}
          alt="Terrence Tegegne"
        />
      </div>
    </header>
  );
}

export default Header;
