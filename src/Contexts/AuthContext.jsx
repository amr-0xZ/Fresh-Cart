import React, { createContext, useState } from "react";

export let authContext = createContext();

const AuthContext = ({ children }) => {
  let [authed, setAuthed] = useState(false);
  return (
    <authContext.Provider value={{ authed, setAuthed }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthContext;
