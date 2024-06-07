import React, { useState } from "react";
import { CurrentTempUnitContext } from "../../utils/contexts/CurrentTempUnitContext";

import "./ToggleSwitch.css";

function ToggleSwitch() {
  const { currentTempUnit, handleToggleSwitch } = React.useContext(
    CurrentTempUnitContext
  );

  return (
    <label className="switch">
      <input
        type="checkbox"
        className="switch__box"
        onChange={handleToggleSwitch}
      />
      <span
        className={
          currentTempUnit === "F"
            ? "switch__slider switch__slider-F"
            : "switch__slider switch__slider-C"
        }
      ></span>
      <p
        className={`switch__temp-F ${
          currentTempUnit === "F" && "switch__active"
        }`}
      >
        F
      </p>
      <p
        className={`switch__temp-C ${
          currentTempUnit === "C" && "switch__active"
        }`}
      >
        C
      </p>
    </label>
  );
}

export default ToggleSwitch;
