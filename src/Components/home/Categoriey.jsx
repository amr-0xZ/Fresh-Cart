import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { authContext } from '../../Contexts/AuthContext'

const Categoriey = ({cat}) => {

    let {authed} = useContext(authContext)
    let [productsPath, setProductsPath] = useState("/guest/products")


    useEffect(()=>{
        if(authed){
            setProductsPath("/products")
        }else{
            setProductsPath("/guest/products")
        }
    },[authed])

  return (
    <div className="col">
            
            {/* Category Card */}
            <Link to={productsPath+"?cat="+cat.name}>
              <div className="card h-100 border-0 shadow-sm category-card text-center">
              
              {/* Image Container (with hidden overflow for zoom effect) */}
              <div className="overflow-hidden rounded-top" style={{ height: '180px' }}>
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-100 h-100 object-fit-cover cat-img"
                />
              </div>
              
              <div className="card-body">
                <h6 className="card-title m-0 fw-bold text-dark">{cat.name}</h6>
              </div>

            </div>
            </Link>
          </div>
  )
}

export default Categoriey