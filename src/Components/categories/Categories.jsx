import React, { useState, useEffect } from "react";
import { PropagateLoader } from "react-spinners";
import { Link } from "react-router-dom";
import axios from "axios";
import { data } from "react-router-dom";

const Categories = () => {
  let [loading, setLoading] = useState(true);
  let [categories, setCategories] = useState({});

  async function getCategories() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then(({ data }) => {
        setCategories(data);
        return data;
      })
      .catch(({ err }) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (categories.data) {
      setLoading(false);
      console.log(categories);
    }
  }, [categories]);

  if (loading) {
    return (
      <div className="h-100 d-flex justify-content-center align-items-center mx-auto ">
        <div className="row gy-4 mt-lg-4">
          <PropagateLoader color="#0aad0a" />
        </div>
      </div>
    );
  } else {
    return (
      <>
        <div className="container w-75 mt-4">
          <div className="row my-5  d-flex justify-content-center ">
            {categories.data.map((categoriy) => {
              return (
                <div className="col-md-3 bg-light my-4 p-3 text-center  ">
                  <Link>
                    <img
                      src={categoriy.image}
                      className="w-100 d-block "
                      alt=""
                    />
                    <h4 className="my-2 d-block">{categoriy.name}</h4>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }
};

export default Categories;
