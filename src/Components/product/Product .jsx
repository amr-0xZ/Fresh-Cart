import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../../Contexts/AuthContext";
import { toast } from "react-toastify";
import { cartContext } from "../../Contexts/CartContext";

const Product = ({ product }) => {
  let { authed } = useContext(authContext);
  let { addToCart, addToWishlist, wishlist, remFromWishlist } = useContext(cartContext);
  let productPath = authed ? "/product/" : "/guest/product/";
  let [liked, setLiked] = useState(false)

  console.log(product);
  
  function wishChick(){
    let likedItems = wishlist.filter((item)=>{
      return item._id === product._id
    })
    likedItems.length>0? setLiked(true) : setLiked(false)
  }

  async function addProductToCart(id) {
    let data = await addToCart(id);
    console.log(data);
    toast.success(
      product.title.split(" ").slice(0, 2).join(" ") + " added to your cart"
    );
  }

  async function addProductToWish(id) {
    let data = await addToWishlist(id);
    console.log(data);
    wishChick()
    toast.success(
      product.title.split(" ").slice(0, 2).join(" ") + " added to your wish list"
    );
  }

  async function remProductFromWish(id) {
    let data = await remFromWishlist(id);
    console.log(data);
    wishChick()
    toast.success(
      product.title.split(" ").slice(0, 2).join(" ") + " removed from your wish list"
    );
  }

  useEffect(()=>{
    wishChick()
  },[wishlist])

  return (


    <div key={product._id} className="col-sm-6 col-md-4 col-lg-3">
              
              {/* PRODUCT CARD */}
              <div className="card h-100 product-card border-0 shadow-sm">
                
                {/* Image Section */}
                <div className="position-relative overflow-hidden p-3" style={{height: '220px'}}>
                   <img 
                      src={product.imageCover} 
                      className="card-img-top h-100 w-100 object-fit-contain product-img" 
                      alt={product.title} 
                   />
                   
                  
                   {/* Hover Action Buttons (Optional) */}
                   <div className="action-overlay my-3">
                    {authed? (
                      liked? (
                        <button className="btn btn-sm btn-light rounded-circle shadow-sm me-2" title="Remove from Wishlist"
                          onClick={() => {
                           remProductFromWish(product._id);
                          }}
                        >
                          <i class="fa-solid fa-heart text-danger"></i>
                        </button>
                        ) : (
                        <button className="btn btn-sm btn-light rounded-circle shadow-sm me-2" title="Add to Wishlist"
                          onClick={() => {
                           addProductToWish(product._id);
                          }}
                        >
                          <i className="fa-regular fa-heart text-danger"></i>
                        </button>

                      )
                    ) : ("")}
                      <Link to={productPath + product._id}>
                        <button className="btn btn-sm btn-light rounded-circle shadow-sm me-2" title="View Details">
                          <i className="fa-regular fa-eye text-dark"></i>
                        </button>
                      </Link>
                   </div>

                  

                </div>

                {/* Body Section */}
                <div className="card-body pt-0 mt-3">
                  {/* Category Name (Green) */}
                    
                      <small className="text-success-theme fw-bold mb-2 d-block">
                    {product.category.name}
                  </small>
                  
                  {/* Title (Truncated) */}
                  <h6 className="card-title text-dark fw-bold mb-2" style={{height: '40px', overflow: 'hidden'}}>
                    {product.title.split(" ").slice(0, 4).join(" ")}...
                  </h6>
                 
                  
                  {/* Rating Stars */}
                  <div className="d-flex align-items-center mb-3">
                    <i className="fa-solid fa-star text-warning small me-1"></i>
                    <span className="small text-muted">{product.ratingsAverage} Rating</span>
                  </div>

                  {/* Price & Add Button */}
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="h5 fw-bold mb-0 text-dark">{product.price} EGP</span>
                  {authed? (
                    <button className="btn btn-success-theme btn-sm"
                      onClick={() => {
                        addProductToCart(product._id);
                      }}
                    >
                       <i className="fa-solid fa-cart-arrow-down"></i> Add
                    </button>
                  ) : (
                    <Link className="btn btn-success-theme btn-sm"
                      to={"/guest/login"}
                    >
                       <i className="fa-solid fa-cart-arrow-down"></i> Login
                    </Link>
                  )}
                  </div>
                </div>
              </div>
              </div>
              

  );
};

export default Product;
