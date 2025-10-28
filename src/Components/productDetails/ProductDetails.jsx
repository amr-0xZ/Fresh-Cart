import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PropagateLoader } from "react-spinners";

const ProductDetails = () => {
  let params = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

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
      <div className="my-4 d-flex justify-content-center align-products-center mx-auto ">
        <div className="row gy-4 mt-lg-4">
          <PropagateLoader color="#0aad0a" />
        </div>
      </div>
    );
  } else {
    return (
      <div className="container my-5">
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
            <button className="btn bg-main text-white w-100 mt-4">
              Add to cart
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default ProductDetails;
