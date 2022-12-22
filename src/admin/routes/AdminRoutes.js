import React from 'react'
import {Routes,Route} from "react-router-dom"
import Navbar from '../componets/navbar/Navbar'
import AllUsersProducts from '../pages/allUsersProducts/AllUsersProducts'
import Home from '../pages/home/Home'
import RegisterUsers from '../pages/registerUsers/RegisterUsers'

export default function AdminRoutes() {
  return (
   <>
   <Navbar/>
<Routes>
    <Route path='/'>
        <Route index element={<Home/>} />
        <Route path='registerUsers' element={<RegisterUsers/>} />
        <Route path='allUsersProducts' element={<AllUsersProducts/>} />

    </Route>
</Routes>   
   </>
  )
}
