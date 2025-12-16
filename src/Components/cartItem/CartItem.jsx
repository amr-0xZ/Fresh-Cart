import React, { useContext, useState } from "react";
import { cartContext } from "../../Contexts/CartContext";
import { toast } from "react-toastify";

const CartItem = ({ product, getCartData }) => {
  let { addToCart, oneLessItem, removeProduct } = useContext(cartContext);
  let [loading, setLoading] = useState("")

  async function addItemToCart(id) {
    setLoading("plus")
    await addToCart(id);
    setLoading("")
    await getCartData();
    toast.success("One more " + product.product.title + " added to your cart");
  }

  async function minusItem(productId, currentCount) {
    setLoading("minus")
    await oneLessItem(productId, currentCount);
    setLoading("")
    await getCartData();
    toast.success("Removed one " + product.product.title + " from your cart");
  }

  async function removeCartProduct(productId) {
    setLoading("remove")
    let data = await removeProduct(productId);
    await getCartData();
    setLoading("")
    console.log(data);

    toast.success(product.product.title + "removed from your cart");
  }

  return (
    <>
      <div className="row my-3 border border-2 text-start p-3" style={{borderRadius: 10}}>
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
              className="btn mt-4"
              onClick={() => {
                removeCartProduct(product.product._id);
              }}
            >
            {loading==="remove"? (
              <i className="fa-solid fa-spinner"></i>
            ) : (
              <>
              <i className="fa-solid fa-trash-can text-redd"></i> Remove
              </>
            )}
            </button>
          </div>
          <div className="py-4 ms-auto text-center">
            <button
              className="btn border-main font-sm"
              onClick={() => {
                addItemToCart(product.product._id);
              }}
            >
            {loading==="plus"? (
              <i className="fa-solid fa-spinner"></i>
            ) : (
              <i className="fa-solid fa-plus"></i>
            )}
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
            {loading==="minus"? (
              <i className="fa-solid fa-spinner"></i>
            ) : (
              <i className="fa-solid fa-minus"></i>
            )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
