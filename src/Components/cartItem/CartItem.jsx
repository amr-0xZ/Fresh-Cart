import React, { useEffect, useState } from "react";
import { PropagateLoader } from "react-spinners";

const CartItem = ({ product }) => {
  return (
    <>
      <div className="row my-3 border-bottom border-2">
        <div className="col-md-2">
          <img className="w-100 mx-3" src={product.product.imageCover} alt="" />
        </div>
        <div className="col-md-10 d-flex align-content-between">
          <div className="py-3 me-auto">
            <div className="px-3">
              <h5>{product.product.title}</h5>
              <p className="text-main">Price: {product.price}</p>
            </div>
            <button className="btn">
              <i className="fa-solid fa-trash-can text-main"></i> Remove
            </button>
          </div>
          <div className="py-4 ms-auto text-center">
            <button className="btn border-main font-sm">
              <i className="fa-solid fa-plus"></i>
            </button>
            <p className="mx-3" style={{ margin: "16px" }}>
              {product.count}
            </p>
            <button className="btn border-main font-sm">
              <i className="fa-solid fa-minus"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
