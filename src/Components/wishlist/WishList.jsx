import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../../Contexts/CartContext";
import { PropagateLoader } from "react-spinners";
import { toast } from "react-toastify";

const WishList = () => {

  let { getWishlist, remFromWishlist, wishlist, addToCart } = useContext(cartContext);
  let [loading, setLoading] = useState(true);
  let [empty, setEmpty] = useState(true);

  async function getWishlistData() {
    let data = await getWishlist();
    console.log(data);
    if(data){
      setLoading(false)
    }
  }

  async function addProductToCart(id, title) {
    let data = await addToCart(id);
    console.log(data);
    toast.success(
      title.split(" ").slice(0, 2).join(" ") + " added to your cart"
    );
  }

  async function remFromList(id, title) {
    let data = await remFromWishlist(id)
    if(data){
      toast.success(
      title.split(" ").slice(0, 2).join(" ") + " removed from wish list"
    );
    }
  }

  useEffect(()=>{
    getWishlistData()
  },[])

  useEffect(()=>{
    console.log(wishlist);
    
    if(wishlist.length>0){
      setEmpty(false)
    }else{
      setEmpty(true)
    }
  },[wishlist])

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
            <h2>Your Wish List:</h2>
            <h4>Your Wish List Is Empty</h4>
          </div>
        </div>
      </div>
      </>
    );
  } else {
    return(
      <>
      <div className="container my-5">
      <h2>Your Wish List:</h2>
      {wishlist.map((product)=>{
        return (
      <div key={product._id} className=" bg-light mt-4 border-1 shadow p-3">
        <div className="row">
          <div className="col-md-3">
            <img className="w-100 " src={product.imageCover} alt="" />
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
                <i className="fa-regular fa-trash-can"></i> Remove
              </button>
              <button
                className="btn bg-main text-white w-25 mt-4"
                onClick={() => {
                  addProductToCart(product._id, product.title);
                }}
              >
                <i className="fa-solid fa-cart-arrow-down"></i> Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  })}
   </div></> )
  }
};

export default WishList;
