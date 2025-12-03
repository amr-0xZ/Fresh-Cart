import { React, useContext } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { cartContext } from "../../Contexts/CartContext";

const Order = () => {
  let { fitchCartCount } = useContext(cartContext);
  let navigate = useNavigate();
  let { id } = useParams();
  console.log(id);

  function cashOrder(values) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/${id}`,
        { shippingAddress: values },
        { headers: { token: localStorage.getItem("token") } }
      )
      .then(({ data }) => {
        console.log(data);
        if (data.status == "success") {
          fitchCartCount();
          toast.success("We received you order!");
          navigate("/orders", { replace: true });
        }
      })
      .catch(({ error }) => {
        console.log(error);
      });
  }

  const validate = Yup.object().shape({
    phone: Yup.string().required().min(11).max(11),
    city: Yup.string()
      .min(5, "Must be at least 5 characters long.")
      .max(15, "Cannot exceed 15 characters.")
      .required()
      .matches(/^[a-zA-Z0-9\s.,!?'"-]*$/, "Contains invalid characters."),
    details: Yup.string()
      .required("This field is required.")
      .min(10, "Must be at least 10 characters long.")
      .max(500, "Cannot exceed 500 characters.")
      .trim("Leading and trailing spaces are not allowed.")
      .matches(/^[a-zA-Z0-9\s.,!?'"-]*$/, "Contains invalid characters."),
    method: Yup.string().required(),
  });

  const register = useFormik({
    initialValues: {
      phone: "",
      city: "",
      details: "",
      method: "",
    },
    validationSchema: validate,
    onSubmit: (values) => {
      console.log(values);
      if (values.method == "cash") {
        let { method, ...data } = values;
        cashOrder(data);
      } else if (values.method == "visa") {
        let { method, ...data } = values;
        //   visaOrder(data);
      }
    },
  });

  return (
    <>
      <div className="container w-75 my-5">
        <h2>Enter your order details:</h2>
        <form className="mt-4" action="" onSubmit={register.handleSubmit}>
          <label htmlFor="phone">Phone:</label>
          <input
            className={`form-control mb-3 ${
              register.errors.phone && register.touched.phone
                ? "is-invalid"
                : ""
            }`}
            type=""
            name="phone"
            id="phone"
            value={register.values.phone}
            onChange={register.handleChange}
            onBlur={register.handleBlur}
          />
          {register.errors.phone && register.touched.phone ? (
            <div className="alert alert-danger">{register.errors.phone}</div>
          ) : (
            ""
          )}
          <label htmlFor="city">City:</label>
          <input
            className={`form-control mb-3 ${
              register.errors.city && register.touched.city ? "is-invalid" : ""
            }`}
            type="text"
            name="city"
            id="city"
            value={register.values.city}
            onChange={register.handleChange}
            onBlur={register.handleBlur}
          />
          {register.errors.city && register.touched.city ? (
            <div className="alert alert-danger">{register.errors.city}</div>
          ) : (
            ""
          )}
          <label htmlFor="details">Address:</label>
          <textarea
            className={`form-control mb-3 ${
              register.errors.details && register.touched.details
                ? "is-invalid"
                : ""
            }`}
            name="details"
            id="details"
            value={register.values.details}
            onChange={register.handleChange}
            onBlur={register.handleBlur}
          />
          {register.errors.details && register.touched.details ? (
            <div className="alert alert-danger">{register.errors.details}</div>
          ) : (
            ""
          )}
          <label htmlFor="method">Payment method:</label>
          <div role="group" className="d-block my-3 ms-4">
            <label>
              <input
                className="me-2"
                type="radio"
                name="method"
                id="method"
                value="cash"
                onChange={register.handleChange}
              />
              Cash on delevery
            </label>
          </div>
          <div className="d-block my-3 ms-4">
            <label>
              <input
                className="me-2"
                type="radio"
                name="method"
                id="method"
                value="visa"
                onChange={register.handleChange}
              />
              Online Visa
            </label>
          </div>
          <button
            disabled={!(register.dirty && register.isValid)}
            className="btn bg-main text-white mt-4 "
            type="submit"
          >
            Order
          </button>
        </form>
      </div>
    </>
  );
};

export default Order;
