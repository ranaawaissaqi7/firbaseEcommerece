import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useSelector,useDispatch } from 'react-redux';
import { authState,getUserEmail } from '../../store/features/authSlice/AuthSlice';
import { auth } from '../../config/firebase';
import { signInWithEmailAndPassword,onAuthStateChanged } from 'firebase/auth';
import { removeUData } from '../../store/features/userUidSlice/UserUidSlice';
export default function Login() {
  const {authStateChange}=useSelector((state)=>state.auth)
  console.log("AUTH ",authStateChange)
  //useNavigate
  const navigate=useNavigate("/")
  //dispatch
  const dispatch=useDispatch()
 
  //state
  const [state,setStete]=useState({
    email:"",
    password:"",
  })
console.log("state",state)
  //URL
  const URL="http://localhost:8000"

  //onChangeHandler
  const onChangeHandler=e=>{
    setStete({...state,[e.target.name]:e.target.value})
  }
  

  //onSubmitHandler
  const onSubmitHandler=(e)=>{
    e.preventDefault();
    const {email,password}=state
    if (!email || !password ) {
      return alert("Please Fill All Fields")
    }
   // let formData={...state}
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log("USER ",user)
    console.log("Login Success ")
    dispatch(authState(true))
    
    navigate("/")
    // ...
  })
  .catch((error) => {
    console.log("ERROR ",error)   
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("CODE ",errorCode)
    console.log("M ",errorMessage)
    if (errorCode==="auth/user-not-found") {
      alert ("please SignUp")
    }else{
      alert("Wrong Password")
    }
  });
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
                <input type="email" name='email' className="form-control" placeholder="Enter Valid Email" aria-label="First name"  onChange={onChangeHandler} />
              </div>

              <div className="col-12 mt-2">
                <input type="password" name='password' className="form-control" placeholder="Enter Password" aria-label="First name"  onChange={onChangeHandler} />
              </div>

              
              <div className="col-12 mt-2">
              <div className="d-grid gap-2">
              <button className='btn btn-outline-success' onClick={onSubmitHandler}>Login</button>
              </div>
                
              </div>
              <div className="col-12 mt-2">
                <div className=' d-grid gap-2'>
                <Link className='btn btn-outline-warning' to="/signUp" >SignUp</Link>
                </div>
              </div>

              <div className="col-12 mt-2">
                <div className=' d-grid gap-2'>
                <Link className='btn btn-outline-info' to="/" >Home</Link>
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
