import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchApiData } from '../../../store/features/apiDataSlice/ApiDataSlice';
import { collection, addDoc, setDoc, doc } from 'firebase/firestore/lite';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../../config/firebase';
import { addUserData, changeUserUid } from '../../../store/features/userUidSlice/UserUidSlice';
import { fetchCards } from '../../../store/features/userUidSlice/UserUidSlice';
import { fetchAdminCard } from '../../../store/features/adminAllProducts/AdminAllProducts';
export default function Home() {

  const dispatch = useDispatch()
  const { apiData, error, loading } = useSelector((state) => state.apiData)
  const { authStateChange, userEmail } = useSelector((state) => state.auth)
  const { uid } = useSelector((state) => state.uid)

  const { cardData } = useSelector((state) => state.carddata)
  console.log("AUTH ", authStateChange)
  console.log("API DATA ", apiData)
  console.log("ERROR ", error)
  console.log("loading ", loading)
  console.log("USER EMAIL ", userEmail)

  console.log("real DATA ", cardData)

  const [userUid, setUserUid] = useState(null)


  //UseEffect Hook
  useEffect(() => {
    dispatch(fetchApiData());

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        setUserUid(uid)
        dispatch(changeUserUid(uid))
        console.log("UID ", uid)
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }, [])


  // URL Variable


  //AddData
  const addCard = async (i) => {
    if (authStateChange === false) {
      return alert("please Login Here ")
    }
    if (authStateChange === true) {
      const items = i
      console.log("ITEMS ", items)
      //  const {id,image,category,description,price}=state
      let cardState = {
        ide: items.id,
        title: items.title,
        imageUrl: items.image,
        category: items.category,
        description: items.description,
        price: items.price,
        uid: userUid,
      }
      // Add a new document with a generated id
      const newCityRef = doc(collection(db, `products${userUid}`));

      // later...
      let docRefId=""
      try {

        const docRef = await addDoc(collection(db, `products${userUid}`), cardState);
        console.log("Document written with ID: ", docRef.id);
        docRefId=docRef.id
        //dispatch(addUserData(cardState))
        dispatch(fetchCards(uid))



      } catch (e) {
        console.error("Error adding document: ", e);
      }

      try {
        // Add a new document in collection "cities"
        await setDoc(doc(db, "allProducts",docRefId ),cardState);
        // const docRef = await addDoc(collection(db, "allProducts"), cardState);
        // console.log("Document written with ID: ", docRef.id);
    
       
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }

  }


  return (
    <>
 
      {
        !loading ? <>
          <h2 className='text-center'>Add to Card</h2>
          
          <div className="container-fluid">
            <div className="row d-flex justify-content-around">

              {
                apiData.map((items, index) => {
                  return <>

                    <div className="card mt-2" style={{ width: "18rem" }}>
                      <img src={items.image} className="card-img-top" alt="..." style={{ width: "5rem", marginLeft: "80px" }} />
                      <div className="card-body">
                        <h5 className="card-title">{items.category}</h5>
                        <h6 className="card-text">{items.title}</h6>
                        <p className="card-text"> Price :{items.price}</p>
                      </div>
                      <Link className='btn btn-outline-success' to={`/productDetail/${items.id}`}>Product Details</Link>
                      <button className='btn btn-outline-success mt-2' onClick={() => { addCard(items) }}>Add Card</button>
                    </div>

                  </>
                })
              }
            </div>
          </div>

        </> :
          <>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-4">
                  <h4 className=' text-danger text-center'>loading please Waite...</h4>
                </div>
              </div>
            </div>
          </>
      }
    </>
  )
}
