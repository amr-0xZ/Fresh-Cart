import axios from "axios";
import React, { useEffect, useState } from "react";
import { PropagateLoader } from "react-spinners";

const Products = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  async function getProducts() {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products"
    );
    setLoading(false);
    console.log(data.data);

    setProducts(data.data);
  }

  useEffect(() => {
    getProducts();
  }, []);

  if (loading) {
    return (
      <div className="h-100 d-flex justify-content-center align-items-center mx-auto ">
        <div className="row gy-4 mt-lg-4">
          <PropagateLoader color="#0aad0a" />
        </div>
      </div>
    );
  } else {
    return (
      <>
        <div className="container">
          <div className="row">
            {products.map((item) => {
              return (
                <div key={item._id} className="col-md-2">
                  <div className="product cursor-pointer rounded-3 p-3">
                    <img className="w-100 mb-2" src={item.imageCover} alt="" />
                    <span className="text-main font-sm mt-2">
                      {item.category.name}
                    </span>
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
                    <button className="btn bg-main text-white w-100 mt-2">
                      Add to cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }
};

export default Products;
