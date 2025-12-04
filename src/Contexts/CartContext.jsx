import axios from "axios";
import React, { useContext, createContext, useState } from "react";
import { toast } from "react-toastify";
import { authContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export let cartContext = createContext();

const CartContext = ({ children }) => {
  let { setUId } = useContext(authContext);
  let [cartCount, setCartCount] = useState(0);

  function fitchCartCount() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: { token: localStorage.getItem("token") },
      })
      .then(({ data }) => {
        setCartCount(data.numOfCartItems);
        setUId(data.data.cartOwner);
        console.log(data.data.cartOwner);
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

  function visaOrder(values, id){
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`,
        { shippingAddress: values },
        { headers: { token: localStorage.getItem("token") } }
      )
      .then(({ data }) => {
        console.log(data);
        if (data.status == "success") {
          window.location.href = data.session.url
        }
      })
      .catch(({ error }) => {
        console.log(error);
      });
  }

  function cashOrder(values, id) {
      return axios
        .post(
          `https://ecommerce.routemisr.com/api/v1/orders/${id}`,
          { shippingAddress: values },
          { headers: { token: localStorage.getItem("token") } }
        )
        .then(({ data }) => {
          console.log(data);
          if (data.status == "success") {
            fitchCartCount();
            toast.success("We received you order!");
          }
        })
        .catch(({ error }) => {
          console.log(error);
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
        visaOrder,
        cashOrder
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export default CartContext;
