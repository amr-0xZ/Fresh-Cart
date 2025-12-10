import React, { useContext } from "react";
import { cartContext } from "../../Contexts/CartContext";
import { toast } from "react-toastify";

const CartItem = ({ product, getCartData }) => {
  let { addToCart, oneLessItem, removeProduct } = useContext(cartContext);

  async function addItemToCart(id) {
    await addToCart(id);
    await getCartData();
    toast.success("One more " + product.product.title + " added to your cart");
  }

  async function minusItem(productId, currentCount) {
    await oneLessItem(productId, currentCount);
    await getCartData();
    toast.success("Removed one " + product.product.title + " from your cart");
  }

  async function removeCartProduct(productId) {
    let data = await removeProduct(productId);
    await getCartData();
    console.log(data);

    toast.success(product.product.title + "removed from your cart");
  }

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
            <button
              className="btn"
              onClick={() => {
                removeCartProduct(product.product._id);
              }}
            >
              <i className="fa-solid fa-trash-can text-redd"></i> Remove
            </button>
          </div>
          <div className="py-4 ms-auto text-center">
            <button
              className="btn border-main font-sm"
              onClick={() => {
                addItemToCart(product.product._id);
              }}
            >
              <i className="fa-solid fa-plus"></i>
            </button>
            <p className="mx-3" style={{ margin: "16px" }}>
              {product.count}
            </p>
            <button
              className="btn border-main font-sm"
              onClick={() => {
                minusItem(product.product._id, product.count);
              }}
            >
              <i className="fa-solid fa-minus"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
