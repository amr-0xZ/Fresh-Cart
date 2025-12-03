import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import React, { useContext, useEffect } from "react";
import { replace, useNavigate } from "react-router-dom";
import { authContext } from "../../Contexts/AuthContext";

const Login = () => {
  let { setAuthed } = useContext(authContext);
  const navegate = useNavigate();
  const validate = Yup.object().shape({
    email: Yup.string().required().email(),
    password: Yup.string()
      .matches(/^[A-Z][a-zA-Z0-9]{6,}$/, "Invalid Password")
      .required(),
  });

  const register = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validate,
    onSubmit: (values) => {
      sendData(values);
    },
  });

  function sendData(values) {
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then((data) => {
        if (data.status == 200) {
          // console.log(data.data.token);
          console.log(data);

          localStorage.setItem("token", data.data.token);
          setAuthed(true);
          navegate("/home", { replace: true });
        }
      })
      .catch((err) => {
        // console.log(err);
        toast.error(err.response.data.message);
      });
  }

  return (
    <>
      <div className="w-75 mx-auto my-5">
        <h2>Login To Your Account:</h2>
        <form className="my-4" action="" onSubmit={register.handleSubmit}>
          <label htmlFor="Email">Email:</label>
          <input
            onChange={register.handleChange}
            onBlur={register.handleBlur}
            className={`mb-3 form-control ${
              register.errors.email && register.touched.email
                ? "is-invalid"
                : ""
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

          <button
            disabled={!(register.dirty && register.isValid)}
            className="btn bg-main text-white mt-4 "
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
