import React from 'react'
import { useTranslation } from 'react-i18next'

const OrderCartItem = ({item}) => {
  const { t } = useTranslation()

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
                        <p className="text-muted small mb-0">{t('labels.brand')} {item.product.brand.name}</p> <p className="text-muted small mb-0">{t('labels.category')} {item.product.category.name}</p>
                    </div>
                    <div className="col-md-2 col-6 mt-3 mt-md-0">
                        <small className="text-muted">{t('labels.qty')} {item.count}</small>
                    </div>
                    <div className="col-md-2 col-6 mt-3 mt-md-0 text-end text-md-start">
                        <span className="fw-bold">{item.price} {t('orders.egp')}</span>
                    </div>
                </div>
    </div>
  )
}

export default OrderCartItem