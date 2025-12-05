import React from 'react'
import OrderCartItem from './OrderCartItem'

const OrdersItem = ({order}) => {
    let orderItems = order.cartItems

  return (
        <div className="card order-card mb-4 shadow">
            
            <div className="d-flex flex-wrap justify-content-between align-items-center order-header">
                <div>
                    <span className="text-muted small">Order ID</span>
                    <h6 className="mb-0">{order.id}</h6> </div>
                <div>
                    <span className="text-muted small">Date Placed</span>
                    <h6 className="mb-0">{new Date(order.createdAt).toLocaleDateString('en-US',{
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}</h6>
                </div>
                <div className=''>
                    <span className="text-muted small">Address</span>
                    <h6 className="mb-0">{order.shippingAddress.details+"-"+order.shippingAddress.city}</h6>
                </div>
                <div>
                    <span className="badge bg-primary bg-opacity-10 text-primary status-badge mx-2">
                        {order.paymentMethodType}
                    </span>
                    <span className="badge bg-primary bg-opacity-10 text-primary status-badge">
                        {order.isDelivered? "Delivered" : "Processing"}
                    </span>
                </div>
                
            </div>

            
            {orderItems.map((item)=>{
                return(
                    <OrderCartItem key={item._id} item={item}/>
                )
            })}
            

            <div className="d-flex justify-content-between align-items-center order-footer">
                <div>
                    <span className="text-muted me-2">Total Amount:</span>
                    <span className="fs-5 fw-bold text-success">{order.totalOrderPrice} EGP</span>
                </div>
                <div>
                    <button className="btn btn-success bg-main btn-sm">Track Order</button>
                </div>
            </div>

        </div>

    
  )
}

export default OrdersItem