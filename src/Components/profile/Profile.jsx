import React, { useContext, useEffect, useState } from 'react'
import { authContext } from '../../Contexts/AuthContext'
import { toast } from 'react-toastify'
import * as Yup from "yup";
import { useFormik } from "formik";
import ProfileAddress from './ProfileAddress';
import { useTranslation } from 'react-i18next';

const Profile = () => {
  let {getAdresses, adresses,editUser, addAddress} = useContext(authContext)
  let userData = JSON.parse(localStorage.getItem("user"))
  let [edit, setEdit] = useState(false)
  let [addressForm, setAddressForm] = useState(false)
  let [editName, setEditName] = useState(userData.name)
  let [editEmail, setEditEmail] = useState(userData.email)
  let [loading, setLoading] = useState("")
  const {t} = useTranslation()


  async function saveAddr(values) {
    setLoading("saveaddrr")
    await addAddress(values)
    setLoading("")
    toast.success(t('profile.newAddressSaved'))
    setAddressForm(!addressForm)
  }  


  const validate = Yup.object().shape({
      name: Yup.string().required(t('forms.required')).max(15,t('forms.max',{num: 15})),
      phone: Yup.string().required(t('forms.required')).matches(/^\d+$/, t('forms.phone')).min(11,t('forms.min',{num: 11})).max(11,t('forms.max',{num: 11})),
      city: Yup.string()
        .min(5, t('forms.min',{num: 5}))
        .max(15,t('forms.max',{num: 15}))
        .required(t('forms.required'))
        .matches(/^[a-zA-Z0-9\u0600-\u06FF\s.,!?'"-]*$/, t('forms.city')),
      details: Yup.string()
        .required(t('forms.required'))
        .trim(t('forms.trim'))
        .min(5, t('forms.min',{num: 5}))
        .max(40, t('forms.max',{num: 40}))
        .matches(/^[a-zA-Z0-9\u0600-\u06FF\s.,!?'"-]*$/, t('forms.detailes'))
    });


    const register = useFormik({
        initialValues: {
          name : "",
          phone: "",
          city: "",
          details: "",
        },
        validationSchema: validate,
        onSubmit: (values, {resetForm}) => {
          saveAddr(values)
          resetForm()
        },
      });


  
  

  async function editData() {
    if(editName!==userData.name && editEmail!==userData.email){
      setLoading("saveuser")
      let data = {name: editName, email: editEmail}
      let response = await editUser(data)
      setLoading("")
      if(response.message=="success"){
        localStorage.setItem("user", JSON.stringify(response.user))
        toast.success(t('profile.yourDataUpdated'))
        setEdit(false)
      }
    }else if(editName!==userData.name && editEmail==userData.email){
      setLoading("saveuser")
      const data = {name: editName}
      let response = await editUser(data)
      setLoading("")
      if(response.message=="success"){
        localStorage.setItem("user", JSON.stringify(response.user))
        toast.success(t('profile.yourNameUpdated'))
        setEdit(false)
      }
    }else if(editName==userData.name && editEmail!==userData.email){
      setLoading("saveuser")
      let data = {email: editEmail}
      let response = await editUser(data)
      setLoading("")
      if(response.message=="success"){
        localStorage.setItem("user", JSON.stringify(response.user))
        toast.success(t('profile.yourEmailUpdated'))
        setEdit(false)
      }
    }
  }


  

  useEffect(()=>{
    getAdresses()
  },[])
  
  return (
    <div className='min-vh-100 container'>
      <div style={{marginTop: 90}} className='container w-75 py-5 text-center prof '>
        <i className="fa-solid fa-user-circle fs-1 text-secondary mt"></i>
        <h4 className='mt-2'>{userData.name}</h4>
        <div className='border border-bottom w-75 mx-auto'></div>
        <div className='text-start p-4 mt-3'>

          {edit? (
          <div className='form'>
            <div className='d-flex justify-content-between align-items-center'>
              <div><h5 className='d-inline-block'>{t('auth.name')}:</h5> </div>
              <div className='mb-3'>
                <button className='btn me-3 text-white bg-danger fs-6' onClick={()=>{setEdit(!edit)}}>{t('buttons.cancel')}</button>
                <button className='btn me-3 text-white bg-main fs-6' onClick={()=>{editData()}}>
                  {loading==="saveuser"? (
                    <i className="fa-solid fa-spinner"></i>
                  ) : (
                    t('buttons.save')
                  )}
                </button>
              </div>
            </div>
            <input className='form-control' onChange={(e)=>{setEditName(e.target.value)}} value={editName}></input>
              <div><h5 className='d-inline-block mt-3'>{t('auth.email')}:</h5> <input className='d-inline-block form-control' onChange={(e)=>{setEditEmail(e.target.value)}} value={editEmail}></input></div>
          </div>
          ) : (
          <div>
            <div className='d-flex justify-content-between '>
              <div className=''>
                <div className='w-100'>
                <h5 className='d-inline-block text-start'>{t('auth.name')}:</h5> <p className='d-inline-block'>{userData.name}</p>
                </div>
                <div><h5 className='d-inline-block text-start'>{t('auth.email')}:</h5> <p className='d-inline-block'>{userData.email}</p></div>
              </div>
              <button className='btn me-3 text-white bg-main fs-6 h-50' onClick={()=>{setEdit(!edit)}}><i class="fa-regular fa-pen-to-square"></i></button>
            </div>
              
          </div>)}


            <div className='d-flex justify-content-between align-items-center mt-5'>
              <div>
                <h5 className='d-inline-block'>{t('order.savedAddresses')}</h5> 
              </div>
              <button className='btn me-3 text-white bg-main fs-6' onClick={()=>{setAddressForm(!addressForm)}}><i class="fa-solid fa-plus"></i></button>
            </div>


          {addressForm? (
            <div style={{borderRadius: 10}} className='w-100 mt-3 p-3 border border-1'>
        <form className="mt-4" action="" onSubmit={register.handleSubmit}>

            <label htmlFor="name">{t('auth.name')}</label>
          <input
            className={`form-control mb-3 ${
              register.errors.name && register.touched.name
                ? "is-invalid"
                : ""
            }`}
            type=""
            name="name"
            id="name"
            value={register.values.name}
            onChange={register.handleChange}
            onBlur={register.handleBlur}
          />
          {register.errors.name && register.touched.name ? (
            <div className="alert alert-danger">{register.errors.name}</div>
          ) : (
            ""
          )}

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
          <div className='d-flex justify-content-between align-items-center'>
            <button
            className="btn bg-danger text-white mt-4 "
            onClick={()=>{setAddressForm(!addressForm)}}
          >
            {t('buttons.cancel')}
          </button>
            <button
            disabled={!(register.dirty && register.isValid)}
            className="btn bg-main text-white mt-4 "
            type="submit"
          >
            {loading==="saveaddrr"? (
              <i className="fa-solid fa-spinner"></i>
            ) : (
              t('buttons.save')
            )}
          </button>
          </div>
        </form>
      </div>
          ) : ""}
          

          {adresses.length > 0? (
            adresses.map((address)=>{
            return(
              <ProfileAddress key={address._id} address={address}/>
            )
          })) : (<h5 className='mt-5 w-100 text-center'>{t('profile.youHaveNoAddresses')}</h5>) }
          
          

        </div>
      </div>
    </div>
  )
}

export default Profile