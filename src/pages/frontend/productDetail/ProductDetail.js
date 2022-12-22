import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios";
export default function ProductDetail() {
    const {id}=useParams()
console.log("idData ",id)
//loading
const [loading,setloading]=useState(false)
// State
const[productsData,setProductsData]=useState({})

//useEffects Hook
useEffect(()=>{
    getOneProductsData();
},[])
//getOneProductsData
const getOneProductsData=async()=>{
   await axios.get(`https://fakestoreapi.com/products/${id}`)
.then((res)=>{
    console.log("data ",res.data)
    setProductsData(res.data)
    setloading(true)
}).catch((err)=>{
    console.log("ERROR ",err)
})

}

  return (
    <>
    {
        !loading ? <>
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className=" col-4">
                    <h4 className=' text-danger text-center'>loading Please Wait...</h4>
                </div>
            </div>
        </div>

        </> :<>
        <div className="container-fluid">
        <div className="row">
            <div className="col">
                <h1 className=' text-center'>Products Details</h1>
            </div>
        </div>
    </div>

    <div className="row justify-content-center ">
            <div className=" col-md-6 ">
                <table className='table table-bordered border table-responsive'>
                   
                    <tr>
                        <th scope="row">ID</th>
                        <td className=' ms-2 border '>{productsData.id}</td>
                    </tr>
                    <tr>
                        <th scope="row">Image</th>
                        <td className=' ms-2 border'><img src={productsData.image} style={{width:"5rem"}}  /></td>
                    </tr>
                    
                    <tr>
                    <th scope="row">Category</th>
                        <td>{productsData.category}</td>
                    </tr>
                    <tr>
                        <th scope="row">Title</th>
                        <td className=' ms-2 border'>{productsData.title}</td>
                    </tr>
                    <tr>
                        <th scope="row">Detail</th>
                        <td className=' ms-2 border'>{productsData.description}</td>
                    </tr>
                    <tr>
                        <th scope="row">Price</th>
                        <td className=' ms-2 border'>{productsData.price}</td>
                    </tr>
                </table>
            </div>
        </div>
        </>
    }
    
    </>
  )
}
