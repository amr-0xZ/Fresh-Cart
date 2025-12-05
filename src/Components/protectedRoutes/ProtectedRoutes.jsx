import React, { useEffect, useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { PropagateLoader } from "react-spinners";
import { authContext } from "../../Contexts/AuthContext";

const ProtectedRoutes = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  let { authed, setAuthed, setUserData} = useContext(authContext);
  const token = localStorage.getItem("token");

  const verify = async (token) => {
    if (!token) {
      setIsLoading(false);
      setAuthed(false);
      return;
    } else {
      await axios
        .get("https://ecommerce.routemisr.com/api/v1/auth/verifyToken", {
          headers: {
            token: token,
          },
        })
        .then(({data}) => {
          if(data.message=="verified"){
            setAuthed(true);
            setUserData(data.decoded);
            console.log(data);
            setIsLoading(false);
            return data
          }
          setAuthed(true);
          setIsLoading(false);
          return data
        })
        .catch((err) => {
          setIsLoading(false);
          setAuthed(false);
          localStorage.clear("token");
        });
    }
  };

  useEffect(() => {
    verify(token);
  }, [localStorage.getItem("token")]);

  if (isLoading) {
    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center mx-auto ">
        <div className="row gy-4 mt-lg-4">
          <PropagateLoader color="#0aad0a" />
        </div>
      </div>
    );
  } else if (authed) {
    return children;
  } else {
    localStorage.clear("token");
    return <Navigate to={"/guest/login"} />;
  }
};

export default ProtectedRoutes;
