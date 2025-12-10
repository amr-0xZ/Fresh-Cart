import axios from "axios";
import { PropagateLoader } from "react-spinners";
import Product from "../product/Product ";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const Products = () => {

  let [params] = useSearchParams()

  function getProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }


  let { data, isLoading } = useQuery({
    queryKey: ["getProducts"],
    queryFn: getProducts,
    gcTime: 30 * 60 * 1000,
  });


  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState(params.get("cat") || "All");


  const uniqueBrands = ["All", ...new Set(data?.data.data.map(p => p.brand.name))];
  const uniqueCategories = ["All", ...new Set(data?.data.data.map(p => p.category.name))];


  const filteredProducts = data?.data.data.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = selectedBrand === "All" || product.brand.name === selectedBrand;
    const matchesCategory = selectedCategory === "All" || product.category.name === selectedCategory;
    return matchesSearch && matchesBrand && matchesCategory;
  });



  if (isLoading) {
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
        <div className="container py-5">



      <div className="row mb-5 align-items-center">
        <div className="col-12 mb-4">
          <h2 className="fw-bold">All Products</h2>
        </div>


        <div className="col-12">
          <div className="bg-light p-4 rounded-3 shadow-sm">
            <div className="row g-3">
              

              <div className="col-md-6">
                <label className="form-label small text-muted fw-bold">Search</label>
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0">
                    <i className="fa-solid fa-magnifying-glass text-muted"></i>
                  </span>
                  <input 
                    type="text" 
                    className="form-control border-start-0 ps-0" 
                    placeholder="Search for products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>


              <div className="col-md-3">
                <label className="form-label small text-muted fw-bold">Brand</label>
                <select 
                  className="form-select" 
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                >
                  {uniqueBrands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>


              <div className="col-md-3">
                <label className="form-label small text-muted fw-bold">Category</label>
                <select 
                  className="form-select"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {uniqueCategories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

            </div>
          </div>
        </div>
      </div>



        {filteredProducts.length > 0 ? (
          <div className="row g-4">
            {filteredProducts.map((item) => {
              return <Product key={item._id} product={item} />;
            })}
          </div>
          ) : (
            <div className="col-12 text-center py-5">
            <div className="mb-3">
              <i className="fa-solid fa-search fa-3x text-muted opacity-25"></i>
            </div>
            <h5 className="text-muted">No products found matching filters.</h5>
            <button 
              className="btn btn-outline-success mt-3"
              onClick={() => {setSearchTerm(""); setSelectedBrand("All"); setSelectedCategory("All")}}
            >
              Reset Filters
            </button>
          </div>
          ) }


        </div>
      </div>
    );
  }
};

export default Products;
