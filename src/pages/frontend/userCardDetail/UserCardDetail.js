import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCards, removeCard } from '../../../store/features/userUidSlice/UserUidSlice'
import { doc, deleteDoc } from 'firebase/firestore/lite'
import { db } from '../../../config/firebase';
import { async } from '@firebase/util'
import { removeAdminCardf,removeAdminCard, fetchAdminCard } from '../../../store/features/adminAllProducts/AdminAllProducts'
//import { removeUData } from '../../../store/features/userUidSlice/UserUidSlice';
export default function UserCardDetail() {

  const { uid, userCardData } = useSelector((state) => state.uid)
  console.log("uid..... ", uid)

  const dispatch = useDispatch()

  useEffect(() => {

    dispatch(fetchCards(uid))

  }, [])

  const deleteCard = async (items) => {
    console.log("itemssssso n", items)

    await deleteDoc(doc(db, `products${uid}`, items.id));

    dispatch(removeCard(items.id))

    dispatch(removeAdminCardf(items.id))
    

  //  dispatch(removeAdminCard(items.id))


  }



  return (
    <>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className=" col-md-4">
            <h2>User Card Details</h2>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-md-6">


            {

              userCardData.map((items, i) => {
                return <>
                  <table className='table table-responsive'>
                    <tbody>
                      <tr>
                        <th scope="row">ID</th>
                        <th scope="row">{items.ide}</th>
                      </tr>
                      <tr>
                        <th scope="row">image</th>
                        <td><img src={items.imageUrl} style={{ width: "5rem", height: "5rem" }} /></td>

                      </tr>
                      <tr>
                        <th scope="row">Category</th>
                        <td >{items.category}</td>
                      </tr>
                      <tr>
                        <th scope="row">Description</th>
                        <td >{items.description}</td>
                      </tr>
                      <tr>
                        <th scope="row">Price</th>
                        <td >{items.price}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="d-grid gap-2">
                    <button className="btn btn-outline-danger" type="button" onClick={() => { deleteCard(items) }}>Delete Order</button>
                  </div>
                  <div className="d-grid gap-2">
                    <hr className=' border-5' />
                  </div>
                </>
              })
            }



          </div>
        </div>
      </div>
    </>
  )
}
