import React, { createContext, useState } from "react";

export let authContext = createContext();

const AuthContext = ({ children }) => {
  let [authed, setAuthed] = useState(false);
  let [userData, setUserData] = useState([]);
  return (
    <authContext.Provider value={{ authed, setAuthed, userData, setUserData }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthContext;
