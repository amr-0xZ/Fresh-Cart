import React, { useContext, useEffect, useState } from 'react'
import { authContext } from '../../Contexts/AuthContext'
import { toast } from 'react-toastify'
import * as Yup from "yup";
import { useFormik } from "formik";
import ProfileAddress from './ProfileAddress';

const Profile = () => {
  let {getAdresses, adresses,editUser, addAddress} = useContext(authContext)
  let userData = JSON.parse(localStorage.getItem("user"))
  let [edit, setEdit] = useState(false)
  let [addressForm, setAddressForm] = useState(false)
  let [editName, setEditName] = useState(userData.name)
  let [editEmail, setEditEmail] = useState(userData.email)
  let [loading, setLoading] = useState("")


  async function saveAddr(values) {
    setLoading("saveaddrr")
    await addAddress(values)
    setLoading("")
    toast.success("New address saved")
    setAddressForm(!addressForm)
  }  


  const validate = Yup.object().shape({
      name: Yup.string().required().max(15),
      phone: Yup.string().required().min(11).max(11),
      city: Yup.string()
        .min(5, "Must be at least 5 characters long.")
        .max(15, "Cannot exceed 15 characters.")
        .required()
        .matches(/^[a-zA-Z0-9\s.,!?'"-]*$/, "Contains invalid characters."),
      details: Yup.string()
        .required("This field is required.")
        .min(5, "Must be at least 5 characters long.")
        .max(500, "Cannot exceed 500 characters.")
        .trim("Leading and trailing spaces are not allowed.")
        .matches(/^[a-zA-Z0-9\s.,!?'"-]*$/, "Contains invalid characters.")
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
        toast.success("Your data updated")
        setEdit(false)
      }
    }else if(editName!==userData.name && editEmail==userData.email){
      setLoading("saveuser")
      const data = {name: editName}
      let response = await editUser(data)
      setLoading("")
      if(response.message=="success"){
        console.log(response);
        
        localStorage.setItem("user", JSON.stringify(response.user))
        toast.success("Your name updated")
        setEdit(false)
      }
    }else if(editName==userData.name && editEmail!==userData.email){
      setLoading("saveuser")
      let data = {email: editEmail}
      let response = await editUser(data)
      setLoading("")
      if(response.message=="success"){
        localStorage.setItem("user", JSON.stringify(response.user))
        toast.success("Your email updated")
        setEdit(false)
      }
    }
  }


  

  useEffect(()=>{
    getAdresses()
    console.log(adresses);
    
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
              <div><h5 className='d-inline-block'>Name:</h5> </div>
              <div className='mb-3'>
                <button className='btn me-3 text-white bg-danger fs-6' onClick={()=>{setEdit(!edit)}}>Cancle</button>
                <button className='btn me-3 text-white bg-main fs-6' onClick={()=>{editData()}}>
                  {loading==="saveuser"? (
                    <i className="fa-solid fa-spinner"></i>
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            </div>
            <input className='form-control' onChange={(e)=>{setEditName(e.target.value)}} value={editName}></input>
              <div><h5 className='d-inline-block mt-3'>Email:</h5> <input className='d-inline-block form-control' onChange={(e)=>{setEditEmail(e.target.value)}} value={editEmail}></input></div>
          </div>
          ) : (
          <div>
            <div className='d-flex justify-content-between align-items-center'>
              <div><h5 className='d-inline-block'>Name:</h5> <p className='d-inline-block'>{userData.name}</p></div>
              <button className='btn me-3 text-white bg-main fs-6' onClick={()=>{setEdit(!edit)}}><i class="fa-regular fa-pen-to-square"></i></button>
            </div>
              <div><h5 className='d-inline-block'>Email:</h5> <p className='d-inline-block'>{userData.email}</p></div>
          </div>)}


            <div className='d-flex justify-content-between align-items-center mt-5'>
              <div>
                <h5 className='d-inline-block'>Addresses:</h5> 
              </div>
              <button className='btn me-3 text-white bg-main fs-6' onClick={()=>{setAddressForm(!addressForm)}}><i class="fa-solid fa-plus"></i></button>
            </div>


          {addressForm? (
            <div style={{borderRadius: 10}} className='w-100 mt-3 p-3 border border-1'>
        <form className="mt-4" action="" onSubmit={register.handleSubmit}>

            <label htmlFor="name">Name:</label>
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
          <label htmlFor="details">Details:</label>
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
            Cancle
          </button>
            <button
            disabled={!(register.dirty && register.isValid)}
            className="btn bg-main text-white mt-4 "
            type="submit"
          >
            {loading==="saveaddrr"? (
              <i className="fa-solid fa-spinner"></i>
            ) : (
              "Save"
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
          })) : (<h5 className='mt-5 w-100 text-center'>You have not saved any addresses</h5>) }
          
          

        </div>
      </div>
    </div>
  )
}

export default Profile