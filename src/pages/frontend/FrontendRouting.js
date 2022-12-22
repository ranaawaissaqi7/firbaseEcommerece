import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Footer from '../../components/frontendComponets/footer/Footer'
import Navbar from '../../components/frontendComponets/navbar/Navbar'
import About from './about/About'
import Home from './home/Home'
import ProductDetail from './productDetail/ProductDetail'
import UserCardDetail from './userCardDetail/UserCardDetail'
import { useSelector } from 'react-redux'
export default function FrontendRouting() {
  const {authStateChange}=useSelector((state)=>state.auth)
  return (
    <>
    <Navbar/>
    <main>
    <Routes>
        <Route path='/'>
            <Route index element={<Home/>} />
            <Route path='about' element={<About/>} />
            <Route path='productDetail/:id' element={<ProductDetail/>} />
            <Route path='userCardDetail' element={!authStateChange ?<Home/> :<UserCardDetail/>} />
        </Route>
    </Routes>
    </main>
    <Footer/>
    
    </>
  )
}
