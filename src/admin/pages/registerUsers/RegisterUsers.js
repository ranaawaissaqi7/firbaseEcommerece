import React from 'react'
import { auth, db } from "../../../config/firebase";
import { collection, getDocs } from 'firebase/firestore/lite';
import { useEffect, useState } from 'react';
import { async } from '@firebase/util';
export default function RegisterUsers() {

  //
  const [users, setUsers] = useState([])
  const getUsers = async () => {
    let arry = []
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      arry.push({ ...doc.data(), id: doc.id })
      console.log("arraya ", arry)
    });
    setUsers(arry)
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className=" col-6">
            <h2>All Register Users</h2>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row table-responsive">
          <div className=" col-12">
            <table className="table table-dark table-hover ">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">UID</th>
                  <th scope="col">Full Name</th>
                  <th scope="col">Phone No</th>
                  <th scope="col">Adress</th>
                  <th scope="col">Email</th>
                  <th scope="col">Password</th>
                                  
                </tr>
              </thead>
              <tbody>
                {
                  
                  users.map((items,index)=>{
                    return <tr>
                       
                    <th scope="row">{index+1}</th>
                    <td>{items.userUid}</td>
                    <td>{items.fullName}</td>
                    <td>{items.phoneNo}</td>
                    <td>{items.adress}</td>
                    <td>{items.email}</td>
                    <td>{items.password}</td>
               
                  </tr>
                  
                  })
              
                }
                
                </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
