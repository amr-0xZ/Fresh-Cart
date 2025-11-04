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
        console.log(err);
      });
  }

  function oneLessItem(productId, currentCount) {
    let count = currentCount - 1;
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count },
        { headers: { token: localStorage.getItem("token") } }
      )
      .then(({ data }) => {
        return data;
      })
      .catch(({ err }) => {
        console.log(err);
      });
  }

  function removeProduct(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers: { token: localStorage.getItem("token") },
      })
      .then(({ data }) => {
        return data;
      })
      .catch(({ err }) => {
        console.log(err);
      });
  }

  function clearCart() {
    return axios
      .delete("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: { token: localStorage.getItem("token") },
      })
      .then(({ data }) => {
        return data;
      })
      .catch(({ err }) => {
        console.log(err);
      });
  }

  return (
    <cartContext.Provider
      value={{
        cartCount,
        fitchCartCount,
        addToCart,
        oneLessItem,
        removeProduct,
        clearCart,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export default CartContext;
