import { React, useContext, useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { cartContext } from "../../Contexts/CartContext";
import { authContext } from "../../Contexts/AuthContext";

const Order = () => {
  let { visaOrder, cashOrder } = useContext(cartContext);
  let {getAdresses, adresses} = useContext(authContext)
  let [noAddresses, setNoAdresses] = useState(true)
  let { id } = useParams();
  let navigate = useNavigate()
  let [loading, setLoading] = useState(false)
  const { t } = useTranslation()

  async function cashPay(params, id) {
    setLoading(true)
    await cashOrder(params, id)
    setLoading(false)
    navigate("/allorders", { replace: true });
  }

  async function addressesHandele() {
    getAdresses()
    if (adresses.length>0){
      setNoAdresses(false)
    }
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
      .min(5, "Must be at least 5 characters long.")
      .max(100, "Cannot exceed 100 characters.")
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
        cashPay(data, id);
      } else if (values.method == "visa") {
        setLoading(true)
        let { method, ...data } = values;
          visaOrder(data, id);
      }
    },
  });

  function useAddr(address){
      console.log(address);
      register.setFieldValue('phone',address.phone)
      register.setFieldValue('city',address.city)
      register.setFieldValue('details',address.details)
  }

  useEffect(()=>{
    addressesHandele()
  },[])

  return (
    <div className="min-vh-100">
      {noAddresses? (
        <div className="container w-75 my-5">
        <h2>{t('order.enterDetails')}</h2>
        <form className="mt-4" action="" onSubmit={register.handleSubmit}>
          <label htmlFor="phone">{t('order.phone')}</label>
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
          <label htmlFor="city">{t('order.city')}</label>
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
          <label htmlFor="details">{t('order.details')}</label>
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
          <label htmlFor="method">{t('order.paymentMethod')}</label>
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
              {t('order.cash')}
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
              {t('order.visa')}
            </label>
          </div>
          <button
            disabled={!(register.dirty && register.isValid)}
            className="btn bg-main text-white mt-4 "
            type="submit"
          >
          {loading? (
            <i className="fa-solid fa-spinner"></i>
          ) : (
            t('buttons.order')
          )}
          </button>
        </form>
      </div>
      
    ) : (

        <div className="d-flex align-items-center justify-content-between">
          <div className=" w-75 my-5 p-3">
            <div className="container w-75 ">
        <h2>{t('order.enterDetails')}</h2>
        <form className="mt-4" action="" onSubmit={register.handleSubmit}>
          <label htmlFor="phone">{t('order.phone')}</label>
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
          <label htmlFor="city">{t('order.city')}</label>
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
          <label htmlFor="details">{t('order.details')}</label>
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
          <label htmlFor="method">{t('order.paymentMethod')}</label>
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
              {t('order.cash')}
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
              {t('order.visa')}
            </label>
          </div>
          <button
            disabled={!(register.dirty && register.isValid)}
            className="btn bg-main text-white mt-4 "
            type="submit"
          >
          {loading? (
            <i className="fa-solid fa-spinner"></i>
          ) : (
            t('buttons.order')
          )}
          </button>
        </form>
      </div>
          </div>
          <div className=" w-25 text-center me-3">
            <h4>{t('order.savedAddresses')}</h4>
            {adresses.map((address)=>{
            return(
              <div key={address._id} style={{borderRadius: 10}} className='w-100 p-3 mt-3 border border-1 text-center'>
                <h5>{address.name}</h5>
                <div className='d-flex justify-content-between align-items-center mt-3'>
                  <p>{t('order.city')}: {address.city}</p>
                  <p>{address.details}</p>
                </div>
                <div className='d-flex justify-content-between align-items-center mt-2'>
                  <p className='my-auto'>{t('order.phone')}: {address.phone}</p>
                  <button className='btn fs text-white bg-main' onClick={()=>{useAddr(address)}}>{t('order.use')}</button>
                </div>
              </div>
            )
          })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
