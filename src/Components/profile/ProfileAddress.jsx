import React, { useContext, useState } from 'react'
import { authContext } from '../../Contexts/AuthContext'
import { toast } from 'react-toastify'

const ProfileAddress = ({address}) => {
  let {DeleteAddress} = useContext(authContext)
  let [loading, setLoading] = useState(false)

      async function deleteAddr(id) {
        setLoading(true)
        await DeleteAddress(id)
        setLoading()
        toast.success("One address deleted")
      }

  return (
    <div  style={{borderRadius: 10}} className='w-100 mt-3 p-3 border border-1 text-center'>
                <h5>{address.name}</h5>
                <div className='d-flex justify-content-between align-items-center mt-3'>
                  <p>City: {address.city}</p>
                  <p>{address.details}</p>
                </div>
                <div className='d-flex justify-content-between align-items-center mt-2'>
                  <p className='my-auto'>Phone: {address.phone}</p>
                  <button className='btn fs text-white bg-danger' onClick={()=>{deleteAddr(address._id)}}>
                    {loading? (
                      <i className="fa-solid fa-spinner"></i>
                    ) : (
                      <i class="fa-solid fa-trash"></i>
                    )}
                  </button>
                </div>
              </div>
  )
}

export default ProfileAddress