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
  let { addToCart, addToWishlist, wishlist, remFromWishlist } = useContext(cartContext);
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  let [fullStars, setFullStars] = useState(0)
  let [halfStar, setHalfStar] = useState(false)
  let [emptyStars, setEmptyStars] = useState(0)
  let [liked, setLiked] = useState(false)
  let [addLoading, setAddLoading] = useState(false)


  function wishChick(id){
    let likedItems = wishlist.filter((item)=>{
      return item._id === id
    })
    likedItems.length>0? setLiked(true) : setLiked(false)
  }


  function starsHandele(stars){
    setFullStars(Math.floor(stars))
    setHalfStar(stars%1 !== 0)
    setEmptyStars(5-Math.ceil(stars))
  }


  async function addProductToCart(id) {
    setAddLoading(true)
    let data = await addToCart(id);
    console.log(data);
    setAddLoading(false)
    toast.success(
      product.title.split(" ").slice(0, 2).join(" ") + " added to your cart"
    );
  }
  

  async function addProductToWish(id) {
      setLiked(!liked)
      let data = await addToWishlist(id);
      console.log(data);
      toast.success(
        product.title.split(" ").slice(0, 2).join(" ") + " added to your wish list"
      );
  }


  async function remProductFromWish(id) {
      setLiked(!liked)
      let data = await remFromWishlist(id);
      console.log(data);
      toast.success(
        product.title.split(" ").slice(0, 2).join(" ") + " removed from your wish list"
      );
  }


  async function getProduct() {
    let data = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${params.id}`
    );
    setProduct(data.data.data);
    wishChick(data.data.data._id)
    starsHandele(data.data.data.ratingsAverage)
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
            {fullStars>0? (
              Array.from({length: fullStars}).map((_,i)=>(
                <i key={i} className="fa-solid fa-star text-warning" />
              ))
            ) : ("")}
            {halfStar? (
              <i className="fa-solid fa-star-half-stroke text-warning" />
            ) : ("")}
            {emptyStars>0? (
              Array.from({length: emptyStars}).map((_,i)=>(
                <i key={i} class="fa-regular fa-star text-warning"></i>
              ))
            ) : ("")}
            <span className="ms-1 text-muted small">{product.ratingsAverage}</span>
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
            {addLoading? (
              <i className="fa-solid fa-spinner"></i>
            ) : (
              <>
              <i className="fa-solid fa-cart-plus me-2" /> Add to Cart
              </>
            )}
          </button>

          {liked? (
            <button className="btn text-white bg-danger px-3" title="Remove from Wishlist" onClick={() => {
                  remProductFromWish(product._id);
                }}>
              <i className="fa-solid fa-heart" />
            </button>
          ) : (
            <button className="btn text-white bg-danger px-3" title="Add to Wishlist" onClick={() => {
                  addProductToWish(product._id);
                }}>
              <i className="fa-regular fa-heart" />
            </button>
          )}

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



    );
  }
};

export default ProductDetails;
