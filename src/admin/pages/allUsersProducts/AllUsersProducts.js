import React, { useEffect, useState } from 'react'
import { auth,db } from '../../../config/firebase'
import { collection,getDocs } from 'firebase/firestore/lite'
import { useSelector,useDispatch } from 'react-redux'
import { fetchAdminCard,removeAdminCardf } from '../../../store/features/adminAllProducts/AdminAllProducts'
export default function AllUsersProducts() {
const {adminProducts}=useSelector((state)=>state.admin)

console.log("adminData... ",adminProducts)
const dispatch=useDispatch()

    useEffect(() => {
      
      dispatch(fetchAdminCard())      
    }, [])


  return (
    <>
        <div className="container-fluid">
        <div className="row justify-content-center">
            <div className=" col-6">
              <h2>All Products Data Users</h2>
            
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
                  <th scope="col">User Uid</th>
                  <th scope="col">Title</th>
                  <th scope="col">Category</th>
                  <th scope="col">price</th>
                  <th scope="col">Image</th>
                
                                  
                </tr>
              </thead>
              <tbody>
                {
                  
                  adminProducts.map((items,index)=>{
                    return <tr>
                       
                    <th scope="row">{index+1}</th>
                    <td>{items.uid}</td>
                    <td>{items.title}</td>
                    <td>{items.category}</td>
                    <td>{items.price}</td>
                    <td><img src={items.imageUrl} style={{width:"50px"}} /></td>
                    
               
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
