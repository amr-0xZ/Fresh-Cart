import axios from "axios";
import React, { createContext, useState } from "react";
import { toast } from "react-toastify";

export let cartContext = createContext();

const CartContext = ({ children }) => {
  let [cartCount, setCartCount] = useState(0);

  function fitchCartCount() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: { token: localStorage.getItem("token") },
      })
      .then(({ data }) => {
        setCartCount(data.numOfCartItems);
        return data;
      })
      .catch(({ err }) => {
        toast.error(err.massage);
      });
  }

  function addToCart(productId) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId },
        { headers: { token: localStorage.getItem("token") } }
      )
      .then(({ data }) => {
        fitchCartCount();
        return data;
      })
      .catch(({ err }) => {
        toast.error(err.massage);
      });
  }

  return (
    <cartContext.Provider value={{ cartCount, fitchCartCount, addToCart }}>
      {children}
    </cartContext.Provider>
  );
};

export default CartContext;
