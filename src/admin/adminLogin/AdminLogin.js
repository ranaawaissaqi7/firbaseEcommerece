import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
export default function AdminLogin() {
    const[adminState,setAdminState]=useState({
        email:"",
        password:"",
    })

    const onChangeHandler=(e)=>{
        setAdminState({...adminState,[e.target.name]:e.target.value})
    }

    // useNavigate
    const navigate=useNavigate("")


    const onSubmitHandler=(e)=>{
        e.preventDefault();
        const {email,password}=adminState
        if (!email||!password) {
            return alert("please fill all fields")
        }
        console.log("Admin State ",adminState)
        if (email==="awaisilyas800@gmail.com" && password==="1234567") {
          navigate("/adminSide")  
        } else {
          alert("Only Access For Admin ")
        }
        
    }
  return (
    <>
    <div className="container-fluid ">
      <div className="row vh-100 bg-dark align-items-center justify-content-center">
        <div className="col-md-4">
          <h2 className=' text-center text-light'>Login</h2>
          
          <div className="row">
            <form>
            <div className="col-12">
              <input type="email" name='email' className="form-control" placeholder="Enter Valid Email" aria-label="First name" onChange={onChangeHandler}  />
            </div>

            <div className="col-12 mt-2">
              <input type="password" name='password' className="form-control" placeholder="Enter Password" aria-label="First name" onChange={onChangeHandler}   />
            </div>

            
            <div className="col-12 mt-2">
            <div className="d-grid gap-2">
            <button className='btn btn-outline-success' onClick={onSubmitHandler} >Login</button>
            </div>
              
            </div>
       
            </form>
          </div>
          
        </div>
      </div>
    </div>


  </>
  )
}
