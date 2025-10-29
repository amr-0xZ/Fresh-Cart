import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { appContext } from "../../Contexts/AppContext";

const Product = ({ item }) => {
  let { authed, cartCounter, setCartCounter } = useContext(appContext);
  let productPath = authed ? "/product/" : "/guest/product/";

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
          <button
            className="btn bg-main text-white w-100 mt-2"
            onClick={() => {
              setCartCounter(cartCounter + 1);
            }}
          >
            Add to cart
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Product;
