import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { authState } from '../../../store/features/authSlice/AuthSlice';
import { signOut } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux'
import { auth,db } from '../../../config/firebase'
import { collection,getDocs } from 'firebase/firestore/lite'
import { addUserData } from '../../../store/features/userUidSlice/UserUidSlice';
import { fetchCards } from '../../../store/features/userUidSlice/UserUidSlice';
import axios from 'axios';
export default function Navbar() {
    const {uid,userCardData}=useSelector((state)=>state.uid)
    const { auth } = useSelector((state) => state.auth)
    const { authStateChange, userEmail } = useSelector((state) => state.auth)

    const { cardData, } = useSelector((state) => state.carddata)
    console.log("CARD DATA ",)
    console.log("Auth ", auth)

    const [documents, setDocuments] = useState([])

    //URL
    const URL = "http://localhost:8000";
    //useNavigate
    const navigate=useNavigate("")

    //useDispatch
    const dispatch = useDispatch()
    const userCardDetail = () => {
        if (authStateChange === false) {
            return alert("Pleas login")
        }
    }

    //logout
    const logout = (e) => {
        e.prevantDefault()
        signOut(auth).then(() => {
            // Sign-out successful.
            dispatch(authState(false))
            
        }).catch((error) => {
            // An error happened.
        });
        navigate("/")
    }

      //
  const getDocuments=async()=>{
    let arry=[]
    const querySnapshot = await getDocs(collection(db, `products${uid}`));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log("dataaaaa", doc.id, " => ", doc.data());
      arry.push({...doc.data()})
      console.log("ttttt ",typeof(doc.data()))
      console.log("....aaaa ",arry)
      dispatch(addUserData(documents))
           
    });
    setDocuments(arry)
    console.log("userCccc.... ",documents)
  }

  useEffect(() => {
    getDocuments();    
    dispatch(fetchCards(uid))
  }, [])
    return (
        <>
            <div className="container-fluid">
                <div className="row bg-dark  justify-content-between">
                    <div className=" col-md-11">
                        <ul className="nav nav-pills   ">
                            <li className="nav-item ">
                                <Link className="nav-link text-white " aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/about">About Us</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/login">Login</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/signUp">SignUp</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link text-white" to={"/"} onClick={logout}>Logout</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to={"/adminLogin"} >Admin Side</Link>
                            </li>

                        </ul>
                    </div>
                    <div className=" col-md-1">
                        <Link type="button" className="btn btn-primary position-relative mt-2" to="/userCardDetail" onClick={userCardDetail}>
                            {userCardData.length}
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">

                                <span className="">add card</span>
                            </span>
                        </Link>
                    </div>
                </div>
            </div>



        </>
    )
}
