import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import AdminLogin from '../admin/adminLogin/AdminLogin'
import AdminRoutes from '../admin/routes/AdminRoutes'
import Login from '../auth/login/Login'
import SignUp from '../auth/signUp/SignUp'
import FrontendRouting from '../pages/frontend/FrontendRouting'
export default function Routing() {
  return (
    <>
    <BrowserRouter>
    <Routes>
        <Route path='/*' element={<FrontendRouting/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signUp' element={<SignUp/>} />
        <Route path='/adminLogin' element={<AdminLogin/>} />
        <Route path='/adminSide/*' element={<AdminRoutes/>} />
    </Routes>
    </BrowserRouter>
    </>
  )
}
