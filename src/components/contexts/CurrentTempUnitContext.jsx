import React from "react";

export const CurrentTempUnitContext = React.createContext({
  currentTempUnit: "F",
  handleToggleSwitch: () => {},
});
