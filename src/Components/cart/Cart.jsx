import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "../../Contexts/CartContext";
import CartItem from "../cartItem/CartItem";
import { PropagateLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useTranslation } from 'react-i18next';

const Cart = () => {
  let { fitchCartCount, clearCart, cart } = useContext(cartContext);
  let [loading, setLoading] = useState(true);
  let [empty, setEmpty] = useState(true);
  let [emptyLoading, setEmptyLoading] = useState(false)
  const {t} = useTranslation()

  async function getCartData() {
    let data = await fitchCartCount();
  }

  async function emptyCart() {
    setEmptyLoading(true)
    await clearCart();
    await getCartData();
    setEmptyLoading(false)
    setEmpty(true);
    toast.success(t('messages.cartEmptied'));
  }

  useEffect(() => {
    getCartData();
  }, []);
  useEffect(() => {
    if (cart.data) {
      setLoading(false);
      if (cart.numOfCartItems > 0) {
        setEmpty(false);
      }else{
        setEmpty(true)
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
        <div className="container w-75 mt-5 text-center">
          
            <h2>{t('cart.title')}</h2>
            <div className=" w-50 mx-auto mt-5 p-5 shadow text-center" style={{borderRadius: 10}}>
              <h4 className="my-4">{t('cart.emptyTitle')}</h4>
              <p className="d-inline-block my-auto"><Link to={"/products"}><span className="text-main">{t('cart.goShopping')}</span></Link></p>
            </div>
          
        </div>
      </div>
      </>
    );
  } else {
    return (
      <div className="min-vh-100">
        <div className="container w-75 mt-5 text-center">
          
            <h2>{t('cart.title')}</h2>
            
          
          <div className=" w-100 mx-auto mt-5 p-5 shadow text-center" style={{borderRadius: 10}}>
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
              {emptyLoading? (
                <i className="fa-solid fa-spinner"></i>
              ) : (
                <><i className="fa-solid fa-trash-can"></i> {t('cart.emptyButton')}</>
              )}
            </button>
            <p className="text-main my-auto" style={{ fontSize: 24}}>
              {t('cart.total',{total:cart.data?.totalCartPrice})}
            </p>
            <Link
              className="btn bg-main text-white"
              to={`/order/${cart.cartId}`}
            >
              <i className="fa-solid fa-check"></i> {t('cart.createOrder')}
            </Link>
          </div>
          </div>


        </div>
      </div>
    );
  }
};

export default Cart;
