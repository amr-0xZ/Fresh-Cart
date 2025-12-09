import React, { createContext, useState } from "react";
import axios from "axios";
import { data } from "react-router-dom";

export let authContext = createContext();

const AuthContext = ({ children }) => {
  let [authed, setAuthed] = useState(false);
  let [userData, setUserData] = useState([]);
  let [adresses, setAdresses] = useState([])

  function getAdresses(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/addresses',
      {
        headers:{token: localStorage.getItem("token")}
      }
    ).then(({data})=>{
      console.log(data);
      
      setAdresses(data.data)
      return data
    }).catch((err)=>{
      return err
    })
  }

  function addAddress(values){
    return axios.post('https://ecommerce.routemisr.com/api/v1/addresses',
      values,
      {
        headers:{token: localStorage.getItem("token")}
      }
    ).then(({data})=>{
      console.log(data);
      
      getAdresses()
      return data
    }).catch((err)=>{
      console.log(err);
      
      return err
    })
  }


  function DeleteAddress(id){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/addresses/${id}`,
      {
        headers:{token: localStorage.getItem("token")}
      }
    ).then(({data})=>{
      getAdresses()
      return data
    }).catch((err)=>{
      return err
    })
  }

  function editUser(values){
    console.log(values);
    
    return axios.put('https://ecommerce.routemisr.com/api/v1/users/updateMe/',
      values,
      {headers: {token: localStorage.getItem("token")}}
    ).then(({data})=>{
      
      return data
    }).catch(({error})=>{
      return error
    })
  }

  return (
    <authContext.Provider value={{ addAddress, DeleteAddress, authed, setAuthed, userData, setUserData, getAdresses, adresses ,editUser }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthContext;
