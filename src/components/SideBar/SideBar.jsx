import React from "react";
import "./SideBar.css";
import userPic from "../../assets/images/user-pic.svg";

function SideBar() {
  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={userPic} alt="Terrence Tegegne" />
      <p className="sidebar__username">Terrence Tegegne</p>
    </div>
  );
}

export default SideBar;
