import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";

const Order = () => {
  const validate = Yup.object().shape({
    phone: Yup.string().required().min(11).max(11),
    city: Yup.string()
      .min(5, "Must be at least 5 characters long.")
      .max(15, "Cannot exceed 15 characters.")
      .required()
      .matches(/^[a-zA-Z0-9\s.,!?'"-]*$/, "Contains invalid characters."),
    address: Yup.string()
      .required("This field is required.")
      .min(10, "Must be at least 10 characters long.")
      .max(500, "Cannot exceed 500 characters.")
      .trim("Leading and trailing spaces are not allowed.")
      .matches(/^[a-zA-Z0-9\s.,!?'"-]*$/, "Contains invalid characters."),
  });

  const register = useFormik({
    initialValues: {
      phone: "",
      city: "",
      address: "",
    },
    validationSchema: validate,
    onsubmit: (values) => {},
  });

  return (
    <>
      <div className="container w-75 my-5">
        <h2>Enter your order details:</h2>
        <form action="" onSubmit={register.handleSubmit}>
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
          <label htmlFor="address">Address:</label>
          <textarea
            className={`form-control mb-3 ${
              register.errors.address && register.touched.address
                ? "is-invalid"
                : ""
            }`}
            name="address"
            id="address"
            value={register.values.address}
            onChange={register.handleChange}
            onBlur={register.handleBlur}
          />
          {register.errors.address && register.touched.address ? (
            <div className="alert alert-danger">{register.errors.address}</div>
          ) : (
            ""
          )}
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
