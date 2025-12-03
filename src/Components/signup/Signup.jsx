import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import React from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navegate = useNavigate();
  const validate = Yup.object().shape({
    name: Yup.string().min(3).max(20).required(),
    email: Yup.string().required().email(),
    password: Yup.string()
      .matches(
        /^[A-Z][a-zA-Z0-9]{6,}$/,
        "The password must: Start with capital letter ,  7 characters long at least , Ends with a dolar sign $"
      )
      .required(),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "rePassword and password must be the same")
      .required(),
  });

  const register = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema: validate,
    onSubmit: (values) => {
      sendData(values);
    },
  });

  function sendData(values) {
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then((data) => {
        if (data.statusText == "Created") {
          toast.success("Account created successfully");
          navegate("/login");
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }

  return (
    <>
      <div className="w-75 mx-auto my-5">
        <h2>Register Now:</h2>
        <form className="my-4" action="" onSubmit={register.handleSubmit}>
          <label htmlFor="Name">Name:</label>
          <input
            onChange={register.handleChange}
            onBlur={register.handleBlur}
            className={`mb-3 form-control ${
              register.errors.name && register.touched.name ? "is-invalid" : ""
            } ${
              !register.errors.name && register.touched.name ? "is-valid" : ""
            }`}
            value={register.values.name}
            name="name"
            type="text"
            id="Name"
          />
          {register.errors.name && register.touched.name ? (
            <div className="alert alert-danger">{register.errors.name}</div>
          ) : (
            ""
          )}

          <label htmlFor="Email">Email:</label>
          <input
            onChange={register.handleChange}
            onBlur={register.handleBlur}
            className={`mb-3 form-control ${
              register.errors.email && register.touched.email
                ? "is-invalid"
                : ""
            } ${
              !register.errors.email && register.touched.email ? "is-valid" : ""
            }`}
            value={register.values.email}
            name="email"
            type="email"
            id="Email"
          />
          {register.errors.email && register.touched.email ? (
            <div className="alert alert-danger">{register.errors.email}</div>
          ) : (
            ""
          )}

          <label htmlFor="Password">Password:</label>
          <input
            onChange={register.handleChange}
            onBlur={register.handleBlur}
            className={`mb-3 form-control ${
              register.errors.password && register.touched.password
                ? "is-invalid"
                : ""
            } ${
              !register.errors.password && register.touched.password
                ? "is-valid"
                : ""
            }`}
            value={register.values.password}
            name="password"
            type="password"
            id="Password"
          />
          {register.errors.password && register.touched.password ? (
            <div className="alert alert-danger">{register.errors.password}</div>
          ) : (
            ""
          )}

          <label htmlFor="rePassword">rePassword:</label>
          <input
            onChange={register.handleChange}
            onBlur={register.handleBlur}
            className={`mb-3 form-control ${
              register.errors.rePassword && register.touched.rePassword
                ? "is-invalid"
                : ""
            } ${
              !register.errors.rePassword && register.touched.rePassword
                ? "is-valid"
                : ""
            }`}
            value={register.values.rePassword}
            name="rePassword"
            type="password"
            id="rePassword"
          />
          {register.errors.rePassword && register.touched.rePassword ? (
            <div className="alert alert-danger">
              {register.errors.rePassword}
            </div>
          ) : (
            ""
          )}

          <button
            disabled={!(register.dirty && register.isValid)}
            className="btn bg-main text-white mt-4 "
            type="submit"
          >
            Sign up
          </button>
        </form>
      </div>
    </>
  );
};

export default Signup;
