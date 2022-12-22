import React, { useState,useEffect } from 'react'

import { auth,db } from '../../../config/firebase'
import { collection,getDocs } from 'firebase/firestore/lite'
//import { fetchCardData } from '../../../store/features/userUidSlice/UserUidSlice'
import { useDispatch,useSelector } from 'react-redux'

export default function About() {
  const {uid,userData,}=useSelector((state)=>state.uid)
  
const dispatch=useDispatch()
  const [documents, setDocuments] =useState([])

  useEffect(() => {
    fireF();    
    
  }, [])

    //
    const fireF=async()=>{
      let arry=[]
      const querySnapshot = await getDocs(collection(db, `users`));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log("dataaaaa", doc.id, " => ", doc.data());
        arry.push({...doc.data(),id:doc.id})
        console.log("ttttt ",typeof(doc.data()))
        
        console.log("....aaaa ",arry)
        setDocuments(arry)
        console.log("userCccc.... ",documents)     
      });
      
    }



  return (
   <>
   <h2>About Us</h2>
   <button>fetch</button>
   </>
  )
}
