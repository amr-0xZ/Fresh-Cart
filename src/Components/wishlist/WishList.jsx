import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../../Contexts/CartContext";
import { PropagateLoader } from "react-spinners";
import { Link } from "react-router-dom";
import WishItem from "./WishItem";
import { useTranslation } from 'react-i18next';

const WishList = () => {

  let { getWishlist, wishlist} = useContext(cartContext);
  let [loading, setLoading] = useState(true);
  let [empty, setEmpty] = useState(true);
  const { t } = useTranslation();

  async function getWishlistData() {
    let data = await getWishlist();
    if(data){
      setLoading(false)
    }
  }

  useEffect(()=>{
    getWishlistData()
  },[])

  useEffect(()=>{
    if(wishlist.length>0){
      setEmpty(false)
    }else{
      setEmpty(true)
    }
  },[wishlist])

  if (loading) {
    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center mx-auto ">
        <div className="row gy-4 mt-lg-4">
          <PropagateLoader color="#0aad0a" />
        </div>
      </div>
    );
  } else if (empty) {
    return (
      <>
      <div className="min-vh-100">
        <div className="container w-75 mt-5 text-center">
          
            <h2>{t('wishlist.title')}</h2>
            <div className=" w-50 mx-auto mt-5 p-5 shadow text-center" style={{borderRadius: 10}}>
              <h4 className="my-4">{t('wishlist.emptyTitle')}</h4>
              <p className="d-inline-block my-auto"><Link to={"/products"}><span className="text-main">{t('wishlist.explore')}</span></Link></p>
            </div>
          
        </div>
      </div>
      </>
    );
  } else {
    return(
      <>
      <div className="container my-5">
      <div className="w-100 text-center">
        <h2>{t('wishlist.yourList')}</h2>
      </div>
        {wishlist.map((product)=>{
        return (
            <WishItem key={product._id} product={product}/>
          );
        })}
   </div></> )
  }
};

export default WishList;
