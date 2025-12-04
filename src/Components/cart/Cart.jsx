import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "../../Contexts/CartContext";
import CartItem from "../cartItem/CartItem";
import { PropagateLoader } from "react-spinners";
import { toast } from "react-toastify";

const Cart = () => {
  let { fitchCartCount, clearCart } = useContext(cartContext);
  let [cart, setCart] = useState({});
  let [loading, setLoading] = useState(true);
  let [empty, setEmpty] = useState(true);

  async function getCartData() {
    let data = await fitchCartCount();
    setCart(data);
    console.log(data);
  }

  async function emptyCart() {
    await clearCart();
    await getCartData();
    setEmpty(true);
    toast.success("Your cart is empty now");
  }

  useEffect(() => {
    getCartData();
  }, []);
  useEffect(() => {
    if (cart.data) {
      setLoading(false);
      if (cart.data.totalCartPrice !== 0) {
        setEmpty(false);
      }
    }
  }, [cart]);

  if (loading) {
    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center mx-auto ">
        <div className="row gy-4 mt-lg-4">
          <PropagateLoader color="#0aad0a" />
        </div>
      </div>
    );
  } else if (empty) {
    return (
      <>
      <div className="min-vh-100">
        <div className="container w-75 mt-4 bg-light">
          <div className="pb-2">
            <h2>Shop Cart</h2>
            <p className="text-main">
              Total Cart Price: {cart.data?.totalCartPrice}
            </p>
            <h4>Your Cart Is Empty</h4>
          </div>
        </div>
      </div>
      </>
    );
  } else {
    return (
      <div className="min-vh-100">
        <div className="container w-75 mt-4 bg-light">
          <div className="pb-2">
            <h2>Shop Cart</h2>
            <p className="text-main">
              Total Cart Price: {cart.data?.totalCartPrice}
            </p>
          </div>
          {cart.data?.products.map((product) => {
            return (
              <CartItem
                key={product._id}
                product={product}
                getCartData={getCartData}
              />
            );
          })}
          <div className="d-flex justify-content-between align-items-center w-100 mt-5">
            <button
              className="btn pg-redd text-white"
              onClick={() => {
                emptyCart();
              }}
            >
              <i className="fa-solid fa-trash-can"></i> Empty Cart
            </button>
            <Link
              className="btn bg-main text-white"
              to={`/order/${cart.cartId}`}
            >
              <i className="fa-solid fa-check"></i> Create Order
            </Link>
          </div>
        </div>
      </div>
    );
  }
};

export default Cart;
