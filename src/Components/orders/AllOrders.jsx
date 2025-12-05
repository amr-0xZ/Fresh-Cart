import React, { useContext, useEffect, useState } from "react";
import { authContext } from "../../Contexts/AuthContext";
import {cartContext} from "../../Contexts/CartContext"
import { PropagateLoader } from "react-spinners";
import OrdersItem from "./OrdersItem";

const AllOrders = () => {

  let {userData} = useContext(authContext)
  let {userOrders} = useContext(cartContext)
  let [orders, setOrders] = useState([])
  let [loading, setLoading] = useState(true);
  let [empty, setEmpty] = useState(false)


  async function getOrders(id) {
    let data = await userOrders(id)
    console.log(data);
    if(data){
      setLoading(false)
      setOrders(data)
    }
  }

  useEffect(()=>{
    console.log(userData.id)
    getOrders(userData.id)
  },[])

  useEffect(()=>{
    console.log(orders);
    if(orders.length>0){
      setEmpty(false)
    }else{
      setEmpty(true)
    }
  },[orders])

  if (loading) {
      return (
        <div className="min-vh-100 d-flex justify-content-center align-items-center mx-auto ">
          <div className="row gy-4 mt-lg-4">
            <PropagateLoader color="#0aad0a" />
          </div>
        </div>
      );
    }else{
      if(empty){
        return( 
        <div className="min-vh-100">
          <div className="w-100 d-flex justify-content-center mt-5">
            <h3 className="">You have not made any orders yet</h3>
          </div>
        </div>)
      }else{
        return(
          <div className="min-vh-100">
          <div className="container py-5 min-vh-100">
          <h2 className="mb-4">Your Orders:</h2>
            {orders.map((order)=>{
          return <OrdersItem key={order._id} order={order}/>
        })}

          </div>
          
          </div>
        )
      }
    }
};

export default AllOrders;
