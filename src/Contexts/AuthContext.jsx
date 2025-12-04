import React, { createContext, useState } from "react";

export let authContext = createContext();

const AuthContext = ({ children }) => {
  let [authed, setAuthed] = useState(false);
  let [uId, setUId] = useState("");
  return (
    <authContext.Provider value={{ authed, setAuthed, uId, setUId }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthContext;
