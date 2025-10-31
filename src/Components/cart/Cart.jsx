import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../../Contexts/CartContext";
import CartItem from "../cartItem/CartItem";
import { PropagateLoader } from "react-spinners";

const Cart = () => {
  let { fitchCartCount, addToCart } = useContext(cartContext);
  let [cart, setCart] = useState({});

  async function getCartData() {
    let data = await fitchCartCount();
    setCart(data);
    console.log(cart);
  }

  useEffect(() => {
    getCartData();
  }, []);

  return (
    <>
      <div className="container w-75 mt-4 bg-light">
        <div className="pb-2">
          <h2>Shop Cart</h2>
          <p className="text-main">
            Total Cart Price: {cart.data?.totalCartPrice}
          </p>
        </div>
        {cart.data?.products.map((product) => {
          return <CartItem key={product._id} product={product} />;
        })}
      </div>
    </>
  );
};

export default Cart;
