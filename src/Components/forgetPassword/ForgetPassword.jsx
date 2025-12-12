import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const ForgetPassword = () => {

    let [stage, setStage] = useState(1)
    let [email, setEmail] = useState("")
    let [vcode, setVcode] = useState("")
    let [newPass, setNewPass] = useState("")
    let [loading, setLoading] = useState(false)
    let navegate = useNavigate()

    async function sendMail(e) {
        e.preventDefault()
        setLoading(true)
        await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',{email: email}).then(({data})=>{
            if(data.statusMsg==="success"){
                setLoading(false)
                toast.success("Reset code sent to your email")
                setStage(2)
            }
        }).catch(({response})=>{
            setLoading(false)
            toast.error(response.data.message)
        })
    }


    async function sendCode(e) {
        e.preventDefault()
        setLoading(true)
        await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',{resetCode: vcode}).then(({data})=>{
            if(data.status==="Success"){
                setLoading(false)
                setStage(3)
                setVcode("")
            }else{
                setLoading(false)
                setVcode("")
                toast.error("Reset code is invalid or has expired")
            }
        }).catch(()=>{
            setLoading(false)
            setVcode("")
            toast.error("Reset code is invalid or has expired")
        })
    }


    async function sendNewPass(e) {
        e.preventDefault()
        setLoading(true)
        await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',
            {
                email: email,
                newPassword: newPass
            }
            ).then(({data})=>{
                console.log(data);
            
                if(data.token){
                setLoading(false)
                setVcode("")
                setEmail("")
                setNewPass("")
                toast.success("Your new password saved")
                navegate("/guest/login")
            }
        }).catch(({response})=>{
            console.log(response);
            
            setLoading(false)
            toast.error("Reset code has expired")
            setVcode("")
            setNewPass("")
            setStage(1)
        })
    }


  return (
    <div className="min-vh-100">
      <div className="w-50 mx-auto my-5 text-center">
        <h2>
            {stage===1&& "Forget Password"}
            {stage===2&& "Verify Code"}
            {stage===3&& "Reset Password"}
        </h2>
        <div className='mt-5 p-5 shadow' style={{borderRadius: 10}}>
            
            {stage===1&& (
            <form className=""  action="" onSubmit={sendMail}>
                <label htmlFor="Email">Enter your email:</label>
                <input
                onChange={(e)=>{setEmail(e.target.value)}}
                className='mb-4 mt-3 form-control w-50 mx-auto text-center'
                value={email}
                name="email"
                type="email"
                id="Email"
                required
                />
                <button
                disabled={!(email.includes("@")&&email.includes(".")&&email.length>7&&email.split(".").slice(1,2).join().length>1)}
                className="btn bg-main mt-4 text-white text-center"
                type="submit"
                >
                    {loading? (
                        <i className="fa-solid fa-spinner"></i>
                    ) : (
                    "Get Verification Code"
                    )}
                </button>
            </form>
            )}


            {stage===2&& (
            <form className=""  action="" onSubmit={sendCode}>
                <label htmlFor="vcode">We sent a 6 digits code to your email</label>
                <input
                onChange={(e)=>{setVcode(e.target.value)}}
                className='mb-4 form-control mt-3 w-25 mx-auto text-center'
                value={vcode}
                name="vcode"
                type="vcode"
                id="vcode"
                required
                />
                <div className='position-relative'>
                    <button
                        disabled={!(vcode>99999)}
                        className="btn bg-main text-white text-center mt-4"
                        ype="submit"
                        >
                            {loading? (
                                <i className="fa-solid fa-spinner"></i>
                            ) : (
                            "Verify Code"
                            )}
                    </button>
                    <span className='text-dark position-absolute start-0 bottom-0 cursor-pointer' style={{fontSize: 16}} onClick={()=>{setStage(1); setVcode("")}}><i className="fa-solid fa-arrow-left"></i> Email</span>
                </div>
            </form>
            )}


            {stage===3&& (
            <form className=""  action="" onSubmit={sendNewPass}>
                <label htmlFor="pass">Enter new password:</label>
                <input
                onChange={(e)=>{setNewPass(e.target.value)}}
                className=' form-control mt-3 w-75 mx-auto'
                value={newPass}
                name="pass"
                type="pass"
                id="pass"
                required
                />
                <div className='text-start mb-4 w-75 mx-auto' style={{fontSize: 12, marginTop: 3}}>
                    <p className='my-0'>-Password must start with capital letter.</p>
                    <p>-At least 7 characters long.</p>
                </div>
                <button
                disabled={!(newPass.length>6&&(newPass.slice(0,1)===newPass.slice(0,1).toUpperCase()))}
                className="btn bg-main text-white text-center mt-4"
                type="submit"
                >
                    {loading? (
                        <i className="fa-solid fa-spinner"></i>
                    ) : (
                    "Save Passowrd"
                    )}
                </button>
            </form>
            )}
        
        
        </div>
      </div>
    </div>
  )
}

export default ForgetPassword