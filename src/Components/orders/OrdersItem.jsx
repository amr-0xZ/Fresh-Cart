import React from 'react'
import OrderCartItem from './OrderCartItem'
import { useTranslation } from 'react-i18next'

const OrdersItem = ({order}) => {
    let orderItems = order.cartItems

    const { t } = useTranslation()

    return (
        <div className="card order-card mb-4 shadow">
            
            <div className="d-flex flex-wrap justify-content-between align-items-center order-header">
                <div>
                    <span className="text-muted small">{t('orders.orderId')}</span>
                    <h6 className="mb-0">{order.id}</h6> </div>
                <div>
                    <span className="text-muted small">{t('orders.datePlaced')}</span>
                    <h6 className="mb-0">{new Date(order.createdAt).toLocaleDateString('en-US',{
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}</h6>
                </div>
                <div className=''>
                    <span className="text-muted small">{t('orders.address')}</span>
                    <h6 className="mb-0">{order.shippingAddress.details+"-"+order.shippingAddress.city}</h6>
                </div>
                <div>
                    <span className="badge bg-primary bg-opacity-10 text-primary status-badge mx-2">
                        {order.paymentMethodType}
                    </span>
                    <span className="badge bg-primary bg-opacity-10 text-primary status-badge">
                        {order.isDelivered? t('orders.delivered') : t('orders.processing')}
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
                    <span className="text-muted me-2">{t('orders.totalAmount',{total: order.totalOrderPrice})}</span>
                </div>
                <div>
                    <button className="btn btn-success bg-main btn-sm">{t('buttons.trackOrder')}</button>
                </div>
            </div>

        </div>

    
  )
}

export default OrdersItem