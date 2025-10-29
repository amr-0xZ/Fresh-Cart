import React, { createContext, useState } from "react";

export let appContext = createContext();

const AppContext = ({ children }) => {
  let [authed, setAuthed] = useState(false);
  let [cartCounter, setCartCounter] = useState(0);
  return (
    <appContext.Provider
      value={{ authed, setAuthed, cartCounter, setCartCounter }}
    >
      {children}
    </appContext.Provider>
  );
};

export default AppContext;
