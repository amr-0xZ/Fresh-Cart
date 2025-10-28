import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoutes = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);
  const token = localStorage.getItem("token");

  const verify = async (token) => {
    if (!token) {
      setIsLoading(false);
      setIsAuthed(false);
      return;
    } else {
      await axios
        .get("https://ecommerce.routemisr.com/api/v1/auth/verifyToken", {
          headers: {
            token: token,
          },
        })
        .then((data) => {
          console.log(data);
          setIsAuthed(true);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
          setIsAuthed(false);
          localStorage.clear("token");
        });
    }
  };

  useEffect(() => {
    verify(token);
  }, [localStorage.getItem("token")]);

  if (isLoading) {
    return <>Loading</>;
  } else if (isAuthed) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default ProtectedRoutes;
