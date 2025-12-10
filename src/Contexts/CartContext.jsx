import axios from "axios";
import React, { useContext, createContext, useState } from "react";
import { toast } from "react-toastify";

export let cartContext = createContext();

const CartContext = ({ children }) => {
  let [cartCount, setCartCount] = useState(0);
  let [cart, setCart] = useState([]);
  let [oerdersCount, setOrdersCount] = useState(0)
  let [wishlist, setWishlist] = useState([]);
  let [wishlistCount, setWishlistCount] = useState(0)
  

  function fitchCartCount() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: { token: localStorage.getItem("token") },
      })
      .then(({ data }) => {
        setCart(data)
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
        fitchCartCount()
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
        fitchCartCount()
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

    function userOrders(id){
      return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`).then(({data})=>{
        if(data.length>0){
          setOrdersCount(data.length)
        }
        return data
      }).catch(({error})=>{
        return error
      })
    }

    function getWishlist(){
      return axios.get('https://ecommerce.routemisr.com/api/v1/wishlist',
        {headers:{
          token: localStorage.getItem("token")
        }}
      ).then(({data})=>{
        console.log(data);
        setWishlist(data.data)
        setWishlistCount(data.count)
        return data
      }).catch(({error})=>{
        console.log(error);
        return error
      })
    }

    function addToWishlist(id){
      return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
      {productId: id}  ,
      {headers:{
          token: localStorage.getItem("token")
        }
      }).then(({data})=>{
        if(data){
          getWishlist()
          return data
        }
      }).catch(({error})=>{
        console.log(error);
        return error
      })
    }

    function remFromWishlist(id){
      return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{
        headers:{
          token: localStorage.getItem("token")
        }
      }).then(({data})=>{
        if(data){
          getWishlist()
          return data
        }
      }).catch(({error})=>{
        console.log(error);
        return error
      })
    }

  return (
    <cartContext.Provider
      value={{
        cartCount,
        cart,
        oerdersCount,
        fitchCartCount,
        addToCart,
        oneLessItem,
        removeProduct,
        clearCart,
        visaOrder,
        cashOrder,
        userOrders,
        getWishlist,
        wishlist,
        wishlistCount,
        remFromWishlist,
        addToWishlist
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export default CartContext;
