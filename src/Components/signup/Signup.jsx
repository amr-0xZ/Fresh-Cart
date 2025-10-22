import { useFormik } from "formik";
import React from "react";

const Signup = () => {
  const register = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <>
      <div className="w-75 mx-auto my-5">
        <h2>Register Now:</h2>
        <form className="my-4" action="" onSubmit={register.handleSubmit}>
          <label htmlFor="Name">Name:</label>
          <input
            onChange={register.handleChange}
            className="mb-3 form-control"
            value={register.values.name}
            name="name"
            type="text"
            id="Name"
          />

          <label htmlFor="Email">Email:</label>
          <input
            onChange={register.handleChange}
            className="mb-3 form-control"
            value={register.values.email}
            name="email"
            type="email"
            id="Email"
          />

          <label htmlFor="Password">Password:</label>
          <input
            onChange={register.handleChange}
            className="mb-3 form-control"
            value={register.values.password}
            name="password"
            type="password"
            id="Password"
          />

          <label htmlFor="rePassword">rePassword:</label>
          <input
            onChange={register.handleChange}
            className="mb-3 form-control"
            value={register.values.rePassword}
            name="rePassword"
            type="password"
            id="rePassword"
          />

          <label htmlFor="Phone">Phone:</label>
          <input
            onChange={register.handleChange}
            className="mb-3 form-control"
            value={register.values.phone}
            name="phone"
            type="tel"
            id="Phone"
          />
          <button className="btn bg-main text-white mt-4 " type="submit">
            Sign up
          </button>
        </form>
      </div>
    </>
  );
};

export default Signup;
