import React, { useEffect, useState, CSSProperties } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { PropagateLoader } from "react-spinners";

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
    return (
      <div className="h-100 d-flex justify-content-center align-items-center mx-auto ">
        <div className="row gy-4 mt-lg-4">
          <PropagateLoader color="#0aad0a" />
        </div>
      </div>
    );
  } else if (isAuthed) {
    return children;
  } else {
    localStorage.clear("token");
    return <Navigate to={"/guest/home"} />;
  }
};

export default ProtectedRoutes;
