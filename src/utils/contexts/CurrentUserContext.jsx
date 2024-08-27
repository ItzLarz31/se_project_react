import React, { createContext, useState } from "react";

const CurrentUserContext = createContext();

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const isAuth = !!currentUser;

  return (
    <CurrentUserContext.Provider
      value={{ isAuth, currentUser, setCurrentUser }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserContext;
