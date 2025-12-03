import axios from "axios";
import { PropagateLoader } from "react-spinners";
import Product from "../product/Product ";
import { useQuery } from "@tanstack/react-query";

const Products = () => {
  function getProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  let { data, isLoading } = useQuery({
    queryKey: ["getProducts"],
    queryFn: getProducts,
    gcTime: 30 * 60 * 1000,
  });

  if (isLoading) {
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
        <div className="container">
          <div className="row">
            {data?.data.data.map((item) => {
              return <Product key={item._id} item={item} />;
            })}
          </div>
        </div>
      </>
    );
  }
};

export default Products;
