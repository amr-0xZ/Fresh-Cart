import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../../Contexts/CartContext";
import { toast } from "react-toastify";
import { useTranslation } from 'react-i18next';


const WishItem = ({product}) => {
    let { getWishlist, remFromWishlist, wishlist, addToCart } = useContext(cartContext);
    let [loading, setLoading] = useState("");
    const { t } = useTranslation();

  async function addProductToCart(id, title) {
    setLoading("add")
    let data = await addToCart(id);
    setLoading("")
    toast.success(
      t('messages.addedToCart', { title: title.split(" ").slice(0, 2).join(" ") })
    );
  }


  async function remFromList(id, title) {
    setLoading("remove")
    let data = await remFromWishlist(id)
    setLoading("")
    if(data){
      toast.success(
      t('messages.removedFromWishlist', { title: title.split(" ").slice(0, 2).join(" ") })
    );
    }
  }


  return (
    <div className=" bg-light mt-4 border-1 shadow p-3">
        <div className="row">
          <div className="col-md-3">
            <img className="w-75 " src={product.imageCover} alt="" />
          </div>
          <div className="col-md-9">
            <div className="w-100 pt-5 pb-3">
              <h3>{product.title}</h3>
              <p className="font-sm px-3">{product.description}</p>
            </div>
            <h6>{product.category.name}</h6>
            <div className="d-flex justify-content-between">
              <div className="font-sm">{product.price} EGP</div>
              <div className="font-sm">
                <i className="fa-solid fa-star rating-color"></i>
                {product.ratingsAverage}
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <button
                className="btn bg-danger text-white w-25 mt-4"
                onClick={() => {
                  remFromList(product._id, product.title);
                }}
              >
              {loading==="remove"? (
                <i className="fa-solid fa-spinner"></i>
              ) : (
                <>
                <i className="fa-regular fa-trash-can"></i> {t('cartItem.remove')}
                </>
              )}
              </button>
              <button
                className="btn bg-main text-white w-auto mt-4"
                onClick={() => {
                  addProductToCart(product._id, product.title);
                }}
              >
              {loading==="add"? (
                <i className="fa-solid fa-spinner"></i>
              ) : (
                <>
                <i className="fa-solid fa-cart-arrow-down"></i> {t('buttons.addToCart')}
                </>
              )}
              </button>
            </div>
          </div>
        </div>
      </div>
  )
}

export default WishItem