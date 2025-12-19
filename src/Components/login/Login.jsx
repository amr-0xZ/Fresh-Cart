import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../../Contexts/AuthContext";
import { useTranslation } from 'react-i18next';


export default function Login() {
  let { setAuthed } = useContext(authContext);
  let [loading, setLoading] = useState(false)
  const navegate = useNavigate();
  const {t} = useTranslation()

  const validate = Yup.object().shape({
    email: Yup.string().required(t('forms.required')).email(t('forms.email')),
    password: Yup.string()
      .matches(/^[A-Z][a-zA-Z0-9]{6,}$/, t('forms.inPass'))
      .required(t('forms.required')),
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
    setLoading(true)
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then((data) => {
        if (data.status == 200) {
          localStorage.setItem("token", data.data.token);
          localStorage.setItem("user", JSON.stringify(data.data.user));
          setAuthed(true);
          setLoading(false)
          navegate("/home", { replace: true });
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
        <h2>{t('auth.loginTitle')}</h2>
        <form className="mt-5 p-5 shadow text-start" style={{borderRadius: 10}} action="" onSubmit={register.handleSubmit}>
          <label htmlFor="Email">{t('auth.email')}:</label>
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

          <label htmlFor="Password">{t('auth.password')}:</label>
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

          <div className="d-flex justify-content-between align-items-center mt-5">
            <button
            disabled={!(register.dirty && register.isValid)}
            className="btn bg-main text-white "
            type="submit"
          >
            {loading? (
              <i className="fa-solid fa-spinner"></i>
            ) : (
              t('buttons.login')
            )}
          </button>

          <div className="text-center">
            <p className="d-inline-block my-auto"><Link to={"/guest/resetpass"}><span className="text-main">{t('auth.forgotPassword')}</span></Link></p>
            <span className="d-inline-block text-black-50 mx-2">{"|"}</span>
            <p className="d-inline-block my-auto"><Link to={"/guest/signup"}> <span className="text-main">{t('buttons.signUp')}</span></Link></p>
          </div>

          </div>

          

        </form>
      </div>
    </div>
  );
}
