import { useFormik } from "formik";
import React from "react";

const Signup = () => {
  function validate(values) {
    const myErrors = {};

    if (!values.name) {
      myErrors.name = "Your name is required.";
    }
    if (!values.email) {
      myErrors.email = "Your email is required.";
    }
    if (!values.password) {
      myErrors.password = "Password is required.";
    }
    if (!values.rePassword) {
      myErrors.rePassword = "re enter the password.";
    } else if (values.password !== values.rePassword) {
      myErrors.rePassword = "Password and rePassword must match.";
    }
    if (!values.phone) {
      myErrors.phone = "Phone number is required.";
    }

    return myErrors;
  }

  const register = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validate,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  console.log(register.errors);

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

          <label htmlFor="Phone">Phone:</label>
          <input
            onChange={register.handleChange}
            onBlur={register.handleBlur}
            className={`mb-3 form-control ${
              register.errors.phone && register.touched.phone
                ? "is-invalid"
                : ""
            } ${
              !register.errors.phone && register.touched.phone ? "is-valid" : ""
            }`}
            value={register.values.phone}
            name="phone"
            type="tel"
            id="Phone"
          />
          {register.errors.phone && register.touched.phone ? (
            <div className="alert alert-danger">{register.errors.phone}</div>
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
