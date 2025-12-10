import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../../Contexts/AuthContext";
import { toast } from "react-toastify";
import { cartContext } from "../../Contexts/CartContext";

const Product = ({ item }) => {
  let { authed } = useContext(authContext);
  let { addToCart, addToWishlist } = useContext(cartContext);
  let productPath = authed ? "/product/" : "/guest/product/";

  async function addProductToCart(id) {
    let data = await addToCart(id);
    console.log(data);
    toast.success(
      item.title.split(" ").slice(0, 2).join(" ") + " added to your cart"
    );
  }

  async function addProductToWish(id) {
    let data = await addToWishlist(id);
    console.log(data);
    toast.success(
      item.title.split(" ").slice(0, 2).join(" ") + " added to your wish list"
    );
  }

  return (
    <div className="col-md-2 my-2">
      <div className="product cursor-pointer rounded-3 p-3">
        <Link to={productPath + item._id}>
          <img className="w-100 mb-2" src={item.imageCover} alt="" />
          <span className="text-main font-sm mt-2">{item.category.name}</span>
          <h6 className="mt-2">
            {item.title.split(" ").slice(0, 2).join(" ")}
          </h6>
          <div className="d-flex justify-content-between">
            <div className="font-sm">{item.price} EGP</div>
            <div className="font-sm">
              <i className="fa-solid fa-star rating-color"></i>
              {item.ratingsAverage}{" "}
            </div>
          </div>
        </Link>
        {authed ? (
          <div className="d-flex justify-content-between align-items-center px-2">
            <button
              className="btn bg-danger text-white w-auto mt-2 text-center"
              onClick={() => {
                addProductToWish(item._id);
              }}
            >
              <i class="fa-regular fa-heart"></i>
            </button>
            <button
              className="btn bg-main text-white w-auto mt-2 text-center"
              onClick={() => {
                addProductToCart(item._id);
              }}
            >
              <i className="fa-solid fa-cart-arrow-down"></i>
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Product;
