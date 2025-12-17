import React from "react";
import { Outlet } from "react-router-dom";
import logo from "../assets/images/freshcart-logo.svg";
import { NavLink } from "react-router-dom";
import Footer from "../Components/footer/Footer";
import LangSwitch from "../Components/langSwitch/LangSwitch";
import { useTranslation } from "react-i18next";

const AuthLayout = () => {

  const {t} = useTranslation()

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid mx-4 py-1">
          <NavLink className="navbar-brand" to="/guest">
            <img src={logo} alt="" />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  aria-current="page"
                  to="/guest/home"
                >
                  {t('nav.home')}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/guest/products">
                  {t('nav.products')}
                </NavLink>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  aria-current="page"
                  to="/guest/login"
                >
                  {t('nav.login')}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  aria-current="page"
                  to="/guest/signup"
                >
                  {t('nav.signup')}
                </NavLink>
              </li>
              <li className="nav-item">
                  <LangSwitch/>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
      <Footer />
    </>
  );
};

export default AuthLayout;
