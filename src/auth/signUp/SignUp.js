import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { auth,db } from '../../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore/lite";
//import { collection, addDoc } from "firebase/firestore/lite";
//import { async } from '@firebase/util';
export default function SignUp() {
  
   //userUID
  //useNavigate Variable
  const navigate = useNavigate("")
  //state
  const [state, setStete] = useState({
    fullName: "",
    phoneNo: "",
    adress: "",
    email: "",
    password: "",
    cpassword: ""
  })
  console.log("state", state)
  //URL
  const URL = "http://localhost:8000"

  //onChangeHandler
  const onChangeHandler = e => {
    setStete({ ...state, [e.target.name]: e.target.value })
  }

  //submitHandler
  const onSubmitHandler =(e) => {
    e.preventDefault();
    const { fullName, phoneNo, adress, email, password, cpassword} = state
    if (!fullName || !phoneNo || !adress || !email || !password || !cpassword) {
      return alert("Fill All Fields")
    }
    
    if (cpassword!==password) {
      return alert("Password No Match")
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log("USER EMAIL ", user)
        console.log("USER ID ", user.uid)
       // setUserUid(user.uid)
        // ...
        try {
          // Add a new document in collection "cities"
           setDoc(doc(db, "users", user.uid), {
            userUid:user.uid,
            fullName,
            phoneNo,
            adress,
            email,
            password,
            cpassword
          });
          console.log("User Register Success")
          navigate("/login")
        } catch (error) {
          console.log("ERROR ", error)
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("C ",errorCode)
        console.log("M ",errorMessage)
        if (errorCode==="auth/email-already-in-use") {
          alert ("User is Already Exit ")
        }
        // ..
      });

   //try {
  //  const docRef =  addDoc(collection(db, "users"), {
   //   userUid,
   //   fullName,
   //   phoneNo,
  //    adress,
  //    email,
  //    password,
 //     cpassword
//    });
//    console.log("Document written with ID: ", docRef.id);
//  } catch (e) {
//    console.error("Error adding document: ", e);
//  }

}


  return (
    <>
      <div className="container-fluid ">
        <div className="row vh-100 bg-info align-items-center justify-content-center">
          <div className="col-md-4">
            <h2 className=' text-center text-light'>Sign Up</h2>

            <div className="row">
              <form>
                <div className="col-12">
                  <input type="text" name='fullName' className="form-control" placeholder="Enter Full Name " aria-label="Enter Full Name" onChange={onChangeHandler} />
                </div>
                <div className="col-12 mt-2">
                  <input type="number" name='phoneNo' className="form-control" placeholder="Enter Phone Number" aria-label="Enter Phone Number" onChange={onChangeHandler} />
                </div>
                <div className="col-12 mt-2">
                  <textarea className="form-control" name='adress' id="exampleFormControlTextarea1" placeholder='Enter Your Adress' rows="3" onChange={onChangeHandler}></textarea>

                </div>
                <div className="col-12 mt-2">
                  <input type="email" name='email' className="form-control" placeholder="Enter Email" aria-label="Enter Email" onChange={onChangeHandler} />
                </div>
                <div className="col-12 mt-2">
                  <input type="password" name='password' className="form-control" placeholder="Enter  Password" aria-label="Enter Password" onChange={onChangeHandler} />
                </div>

                <div className="col-12 mt-2">
                  <input type="password" name='cpassword' className="form-control" placeholder="Enter Confrom Password" aria-label="Enter Confrom Password" onChange={onChangeHandler} />
                </div>

                <div className="col-12 mt-2">
                  <div className=' d-grid g-2'>
                    <button className='btn btn-outline-warning' onClick={onSubmitHandler}>SignUp</button>
                  </div>
                </div>

                <div className="col-12 mt-2">
                  <div className=' d-grid g-2'>
                    <Link className='btn btn-outline-dark' to="/login" >Login</Link>
                  </div>
                </div>
                <div className="col-12 mt-2">
                  <div className=' d-grid g-2'>
                    <Link className='btn btn-outline-danger' to="/" >Home</Link>
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
