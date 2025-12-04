import React from 'react'

const OrderCartItem = ({item}) => {
  return (
    <div className="order-body">
                <div className="row align-items-center">
                    <div className="col-md-2 col-3">
                        <img src={item.product.imageCover}
                             alt="Archer VR300" 
                             className="product-img"></img>
                    </div>
                    <div className="col-md-6 col-9">
                        <h6 className="mb-1">{item.product.title}</h6>
                        <p className="text-muted small mb-0">Brand: {item.product.brand.name}</p> <p className="text-muted small mb-0">Category: {item.product.category.name}</p>
                    </div>
                    <div className="col-md-2 col-6 mt-3 mt-md-0">
                        <small className="text-muted">Qty: {item.count}</small>
                    </div>
                    <div className="col-md-2 col-6 mt-3 mt-md-0 text-end text-md-start">
                        <span className="fw-bold">{item.price} EGP</span>
                    </div>
                </div>
    </div>
  )
}

export default OrderCartItem