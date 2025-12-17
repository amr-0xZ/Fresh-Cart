import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../../Contexts/AuthContext";
import { toast } from "react-toastify";
import { cartContext } from "../../Contexts/CartContext";
import { useTranslation } from 'react-i18next';

const Product = ({ product }) => {
  let { authed } = useContext(authContext);
  let { addToCart, addToWishlist, wishlist, remFromWishlist } = useContext(cartContext);
  let productPath = authed ? "/product/" : "/guest/product/";
  let [liked, setLiked] = useState(false)
  let [loading, setLoading] = useState(false)
  const { t } = useTranslation();

  console.log(product);
  
  function wishChick(){
    let likedItems = wishlist.filter((item)=>{
      return item._id === product._id
    })
    likedItems.length>0? setLiked(true) : setLiked(false)
  }

  async function addProductToCart(id) {
    setLoading(true)
    let data = await addToCart(id);
    console.log(data);
    setLoading(false)
    toast.success(
      t('messages.addedToCart', { title: product.title.split(" ").slice(0, 2).join(" ") })
    );
  }

  async function addProductToWish(id) {
    setLiked(!liked)
    let data = await addToWishlist(id);
    console.log(data);
    toast.success(
      t('messages.addedToWishlist', { title: product.title.split(" ").slice(0, 2).join(" ") })
    );
  }

  async function remProductFromWish(id) {
    setLiked(!liked)
    let data = await remFromWishlist(id);
    console.log(data);
    toast.success(
      t('messages.removedFromWishlist', { title: product.title.split(" ").slice(0, 2).join(" ") })
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
                        <button className="btn btn-sm btn-light rounded-circle shadow-sm me-2" title={t('buttons.removeFromWishlist')}
                          onClick={() => {
                           remProductFromWish(product._id);
                          }}
                        >
                          <i class="fa-solid fa-heart text-danger"></i>
                        </button>
                        ) : (
                        <button className="btn btn-sm btn-light rounded-circle shadow-sm me-2" title={t('buttons.addToWishlist')}
                          onClick={() => {
                           addProductToWish(product._id);
                          }}
                        >
                          <i className="fa-regular fa-heart text-danger"></i>
                        </button>

                      )
                    ) : ("")}
                      <Link to={productPath + product._id}>
                        <button className="btn btn-sm btn-light rounded-circle shadow-sm me-2" title={t('buttons.viewDetails')}>
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
                    <span className="small text-muted">{product.ratingsAverage} {t('product.rating')}</span>
                  </div>

                  {/* Price & Add Button */}
                  <div className="d-flex justify-content-between align-items-center">
                      <span className=" fw-bold mb-0 text-dark">{t('product.price', { price: product.price })}</span>
                  {authed? (
                    <button className="btn btn-success-theme btn-sm w-auto"
                      style={{}}
                      onClick={() => {
                        addProductToCart(product._id);
                      }}
                    >
                    {loading? (
                      <i className="fa-solid fa-spinner"></i>
                    ) : (
                      <>
                      <i className="fa-solid fa-cart-arrow-down"></i> {t('buttons.add')}
                      </>
                    )}
                    </button>
                  ) : (
                    <Link className="btn btn-success-theme btn-sm"
                      to={"/guest/login"}
                    >
                       <i className="fa-solid fa-cart-arrow-down"></i> {t('buttons.login')}
                    </Link>
                  )}
                  </div>
                </div>
              </div>
              </div>
              

  );
};

export default Product;
