import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import { authContext } from "../../Contexts/AuthContext";
import { toast } from "react-toastify";
import { cartContext } from "../../Contexts/CartContext";

const ProductDetails = () => {
  let params = useParams();
  let { authed } = useContext(authContext);
  let { addToCart, addToWishlist } = useContext(cartContext);
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

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
    toast.success(
      product.title.split(" ").slice(0, 2).join(" ") + " added to your wish list"
    );
  }

  async function getProduct() {
    let data = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${params.id}`
    );
    setProduct(data.data.data);
    setLoading(false);
  }

  useEffect(() => {
    getProduct();
  }, []);

  if (loading) {
    return (
      <div className="min-vh-100 my-4 d-flex justify-content-center align-products-center mx-auto ">
        <div className="row gy-4 mt-lg-4">
          <PropagateLoader color="#0aad0a" />
        </div>
      </div>
    );
  } else {
    return (

      <div className="min-vh-100 container py-5">
  <div className="product-container p-4">
    <div className="row g-5 align-items-center">
      <div className="col-md-5 text-center">
        <img src={product.imageCover} alt="product image" className="img-fluid main-image border bg-light" />
      </div>
      <div className="col-md-7">
        <small className="text-muted text-uppercase fw-bold ls-md">
          {product.category.name} · {product.brand.name}
        </small>
        <h1 className="display-6 fw-bold text-dark mt-2">
          {product.title.split(" ").slice(0, 2).join(" ")}
        </h1>
        <div className="d-flex align-items-center mb-3">
          <div className="me-3">
            <i className="fa-solid fa-star text-warning" />
            <i className="fa-solid fa-star text-warning" />
            <i className="fa-solid fa-star text-warning" />
            <i className="fa-solid fa-star text-warning" />
            <i className="fa-solid fa-star-half-stroke text-warning" />
            <span className="ms-1 text-muted small">({product.ratingsAverage})</span>
          </div>
          <span className="text-muted small border-start ps-3">
            <i className="fa-solid fa-basket-shopping me-1" /> {product.sold} Sold
          </span>
        </div>
        <div className="mb-4">
          <span className="h2 fw-bold text-success-theme">{product.price} EGP</span>
        </div>
        <p className="text-secondary mb-4" style={{lineHeight: '1.6'}}>
          {product.description}
        </p>
        <hr className="text-muted my-4" />
        {authed ? (
        <div className="d-flex gap-2">
          <button className="btn btn-success-theme flex-grow-1" onClick={() => {
                addProductToCart(product._id);
              }}>
            <i className="fa-solid fa-cart-plus me-2" /> Add to Cart
          </button>
          <button className="btn text-white bg-danger px-3" title="Add to Wishlist" onClick={() => {
                addProductToWish(product._id);
              }}>
            <i className="fa-regular fa-heart" />
          </button>
        </div>
            ) : (
              <Link to={"/guest/login"}
              >
              <button className="btn text-white bg-main px-3 w-25">
                Login To Buy
              </button>
              </Link>
          )}
      </div>
    </div>
  </div>
</div>








      /* // <div classNameName="container my-5">
      //   <div classNameName="row">
      //     <div classNameName="col-md-3">
      //       <img classNameName="w-100 " src={product.imageCover} alt="" />
      //     </div>
      //     <div classNameName="col-md-9">
      //       <div classNameName="w-100 pt-5 pb-3">
      //         <h3>{product.title}</h3>
      //         <p classNameName="font-sm px-3">{product.description}</p>
      //       </div>
      //       <h6>{product.category.name}</h6>
      //       <div classNameName="d-flex justify-content-between">
      //         <div classNameName="font-sm">{product.price} EGP</div>
      //         <div classNameName="font-sm">
      //           <i classNameName="fa-solid fa-star rating-color"></i>
      //           {product.ratingsAverage}
      //         </div>
      //       </div>
      //       {authed ? (
      //     <div classNameName="d-flex justify-content-between align-items-center px-2">
      //       <button
      //         classNameName="btn bg-danger text-white w-auto mt-2 text-center"
      //         onClick={() => {
      //           addProductToWish(product._id);
      //         }}
      //       >
      //         <i className="fa-regular fa-heart"></i>
      //       </button>
      //       <button
      //         classNameName="btn bg-main text-white w-auto mt-2 text-center"
      //         onClick={() => {
      //           addProductToCart(product._id);
      //         }}
      //       >
      //         <i classNameName="fa-solid fa-cart-arrow-down"></i> Add To Cart
      //       </button>
      //     </div>
      //       ) : (
      //         <Link
      //           classNameName="btn bg-main text-white w-100 mt-4"
      //           to={"/guest/login"}
      //         >
      //           Login to buy
      //         </Link>
      //       )}
      //     </div>
      //   </div>
      // </div> */
    );
  }
};

export default ProductDetails;
