import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const Signup = () => {
  const navegate = useNavigate();
  const { t } = useTranslation();
  let [loading, setLoading] = useState(false)
  const validate = Yup.object().shape({
    name: Yup.string().min(3,t('forms.min',{num: '3'})).max(20,t('forms.max',{num: 20})).required(t('forms.required')),
    email: Yup.string().required(t('forms.required')).email(t('forms.email')),
    password: Yup.string()
      .matches(
        /^[A-Z][a-zA-Z0-9]{6,}$/,
        t('forms.password')
      )
      .required(t('forms.required')),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], t('forms.repassword'))
      .required(t('forms.required')),
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
    setLoading(true)
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then((data) => {
        if (data.statusText == "Created") {
          toast.success("Account created successfully");
          setLoading(false)
          navegate("/login");
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setLoading(false)
      });
  }
  
  return (
    <div className="min-vh-100">
      <div className="w-75 mx-auto my-5 text-center">
        <h2>{t('auth.registerTitle')}</h2>
        <form className="mt-5 p-5 shadow text-start" style={{borderRadius: 10}} action="" onSubmit={register.handleSubmit}>
          <label htmlFor="Name">{t('auth.name')}:</label>
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

          <label htmlFor="Email">{t('auth.email')}:</label>
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

          <label htmlFor="Password">{t('auth.password')}:</label>
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

          <label htmlFor="rePassword">{t('auth.confirmPassword')}:</label>
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


          <div className="d-flex justify-content-between align-items-center mt-5">
            <button
            disabled={!(register.dirty && register.isValid)}
            className="btn bg-main text-white"
            type="submit"
          >
            {loading? (
              <i className="fa-solid fa-spinner"></i>
            ) : (
              t('buttons.signUp')
            )}
          </button>

          <div className=" text-center">
            <p><Link to={"/guest/login"}><span className="text-main">{t('buttons.login')}</span></Link></p>
          </div>
          </div>






        </form>
      </div>
    </div>
  );
};

export default Signup;
