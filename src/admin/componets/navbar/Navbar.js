import React from 'react'
import { Link } from 'react-router-dom'
export default function Navbar() {
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
                                <Link className="nav-link text-white" to="/adminSide">Admin</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/adminSide/registerUsers">Register Users</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/adminSide/allUsersProducts">All Users Products</Link>
                            </li>

                           

                        </ul>
                    </div>
              
                </div>
            </div>
   </>
  )
}
