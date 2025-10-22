import React from "react";
import NavBar from "../Components/navbar/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../Components/footer/Footer";

const MainLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
