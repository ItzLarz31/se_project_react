import React from "react";
import "./SideBar.css";
import CurrentUserContext from "../../utils/contexts/CurrentUserContext";

function SideBar({ handleProfileEditClick, handleSignOut }) {
  const { currentUser } = React.useContext(CurrentUserContext);

  const userInitial = currentUser?.name
    ? currentUser.name.charAt(0).toUpperCase()
    : "";

  return (
    <>
      <div className="sidebar">
        {currentUser && currentUser.avatar ? (
          <img
            className="sidebar__avatar"
            src={currentUser.avatar}
            alt="User avatar"
          />
        ) : (
          <div className="sidebar__avatar sidebar__avatar-placeholder">
            {userInitial}
          </div>
        )}
        <p className="sidebar__username">{currentUser.name}</p>
      </div>
      <div className="sidebar__nav">
        <ul className="sidebar__list">
          <li className="sidebar__item">
            <button
              className="sidebar__button"
              type="button"
              onClick={handleProfileEditClick}
            >
              Change profile data
            </button>
          </li>
          <li className="sidebar__item">
            <button
              className="sidebar__button"
              type="button"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}

export default SideBar;
