import React, { useContext, useEffect } from "react";
import logo from "../../assets/images/freshcart-logo.svg";
import { NavLink } from "react-router-dom";
import { authContext } from "../../Contexts/AuthContext";
import { cartContext } from "../../Contexts/CartContext";
import { useTranslation } from "react-i18next";
import LangSwitch from "../langSwitch/LangSwitch";

const NavBar = () => {
  let { setAuthed, userData } = useContext(authContext);
  let { cartCount, oerdersCount, userOrders, fitchCartCount, wishlistCount, getWishlist } = useContext(cartContext);
  let user = JSON.parse(localStorage.getItem("user"))
  const {t} = useTranslation()

  useEffect(() => {
    fitchCartCount();
    userOrders(userData.id)
    getWishlist()
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid mx-4 py-1">
          <NavLink className="navbar-brand" to="/">
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
                <NavLink className="nav-link" aria-current="page" to="/home">
                  {t('nav.home')}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/products">
                  {t('nav.products')}
                </NavLink>
              </li>
            </ul>

          
              <LangSwitch/>

              <div className=" dropdown mx-2 ">
                <button className="btn btn-outline-success dropdown-toggle d-flex align-items-center"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="fa-solid fa-user-circle fs-4 me-2 text-secondary position-relative">
                    <span class="badge position-absolute top-0 end-100  bg-danger rounded-pill text-danger" style={{fontSize: 5}}>{cartCount>0||oerdersCount>0||wishlistCount>0? (".") : ("")}</span>
                  </i>
                  <span>{t('nav.welcome')}, {user.name}</span>
                </button>

                <ul className="dropdown-menu dropdown-menu-end shadow mt-2" style={{minWidth: 250}}>

                  <li className="mb-1">
                    <NavLink className="dropdown-item" to={"/profile"}>
                      <i className="fa-solid fa-id-card me-2"></i> {t('nav.profile')}
                    </NavLink>
                  </li>

                  <li className="mb-1">
                    <NavLink className="dropdown-item d-flex justify-content-between align-items-center" to={"/wishlist"}>
                      <span>
                        <i className="fa-regular fa-heart me-2"></i> {t('nav.wishlist')}
                      </span>
                      <span class="badge bg-danger rounded-pill">{wishlistCount > 0 && wishlistCount}</span>
                    </NavLink>
                  </li>

                  <li className="mb-1">
                    <NavLink className="dropdown-item d-flex justify-content-between align-items-center" to={"/cart"}>
                      <span>
                        <i className="fa-solid fa-cart-shopping me-2"></i> {t('nav.cart')}
                      </span>
                      <span class="badge bg-danger rounded-pill">{cartCount > 0 && cartCount}</span>
                    </NavLink>
                  </li>

                  <li className="mb-1">
                    <NavLink className="dropdown-item d-flex justify-content-between align-items-center" to={"/allorders"}>
                      <span>
                        <i className="fa-solid fa-receipt me-2"></i> {t('nav.orders')}
                      </span>
                      <span class="badge bg-danger rounded-pill">{oerdersCount>0 && oerdersCount}</span>
                    </NavLink>
                  </li>

                  <li><hr className="dropdown-divider"></hr></li>

                  <li>
                    <NavLink className="dropdown-item text-danger" to="/guest/home"
                      onClick={() => {
                        setAuthed(false);
                        localStorage.clear("token");
                      }}>
                      <i className="fa-solid fa-right-from-bracket me-2"></i> {t('nav.logout')}
                    </NavLink>
                  </li>
                </ul>
              </div>
          

          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
