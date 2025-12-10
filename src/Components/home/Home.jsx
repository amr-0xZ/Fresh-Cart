import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { PropagateLoader } from "react-spinners";
import { authContext } from "../../Contexts/AuthContext";
import Categoriey from "./Categoriey";

const Home = () => {
  let [brands, setBrands] = useState([])
  let [categories, setCategories] = useState([])
  let [loading, setLoading] = useState(true)

  function getBrands(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/brands').then(({data})=>{
      setBrands(data.data)
    }).catch(({error})=>{
      console.log(error);
    })
  }

    function getCategories(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories').then(({data})=>{
      setCategories(data.data)
      setLoading(false)
    }).catch(({error})=>{
      console.log(error);
    })
  }

  useEffect(()=>{
    getCategories()
    getBrands()
  },[])


  if (loading) {
    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center mx-auto ">
        <div className="row gy-4 mt-lg-4">
          <PropagateLoader color="#0aad0a" />
        </div>
      </div>
    );
  } else {
  return (
  <div className="min-vh-100">
    <div className="container py-5 text-center">
      <h3 className="mb-5 mt-4 fw-bold">Shop by Category</h3>
      
      {/* THE GRID LAYOUT:
         row-cols-2:      2 items per row on Mobile
         row-cols-md-3:   3 items per row on Tablets
         row-cols-lg-5:   5 items per row on Desktop (Perfect for 10 items)
         g-4:             Gap (spacing) between items
      */}
      <div className="row row-cols-2 row-cols-md-3 row-cols-lg-5 g-4">
        
        {categories.map((cat) => (
          <Categoriey key={cat._id} cat={cat} />
        ))}

      </div>
    <div className="container py-5">
      <h3 className="mb-4 mt-5 text-center">Our Trusted Brands</h3>

      {/* --- SLIDER CONTAINER --- */}
      <div className="slider-container">
        
        {/* --- MOVING TRACK --- */}
        {/* We map over the data TWICE to create the seamless loop effect */}
        <div className="slider-track">
          
          {/* First Set of Brands */}
          {brands.map((brand) => (
            <div className="slide" key={brand._id}>
              <img src={brand.image} alt={brand.name} className="brand-img" />
              <p className="brand-name">{brand.name}</p>
            </div>
          ))}

          {/* Second Set (Duplicate) */}
          {brands.map((brand) => (
            <div className="slide" key={`dup-${brand._id}`}>
              <img src={brand.image} alt={brand.name} className="brand-img" />
              <p className="brand-name">{brand.name}</p>
            </div>
          ))}

        </div>
      </div>
      </div>
    </div>
  </div>)
  }
};

export default Home;
