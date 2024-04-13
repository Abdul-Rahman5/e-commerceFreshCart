import React from 'react'
import logo from "../../assets/images/freshcart-logo.svg"
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { cartContext, cartCotext } from "../../Cotext/CartContext";
export default function Navbar({userData ,logOut}) {
  
  let {numOfCartItems}=useContext(cartCotext);


  return <>
 <nav className="navbar fixed-top navbar-expand-sm navbar-light bg-light">
    <div className="container">
    <Link className="navbar-brand" to="/">
      <img src={logo} alt="d" />
    </Link>
    <button className="navbar-toggler fixed-top d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
      aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="collapsibleNavId">
      {localStorage.getItem('userToken') !== null?<ul className="navbar-nav me-auto mt-2 mt-lg-0">
        
        <li className="nav-item">
          <Link className="nav-link" to="/">Home</Link>
        </li>
      
        <li className="nav-item">
          <Link className="nav-link" to="product">Product</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="categories">Categories</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="brands">Brands</Link>
        </li>
        
        
      </ul>:'' }
      
      <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
        
       
        {localStorage.getItem('userToken') ===null? <> <li className="nav-item">
          <Link className="nav-link" to="login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="register">Register</Link>
        </li> </>
        :<>
        
        <li className="nav-item px-2">
          <Link className="nav-link" to="cart">  <i className='fas  fa-shopping-cart fa-lg'></i> 
          
          <sup className=' badge bg-main text-white' > {numOfCartItems}</sup>
          </Link>
        </li>
        <li className="nav-item">
        <Link onClick={logOut} className="nav-link" >Logout</Link>
      </li>
        </> }
      
      
     
        
        
      </ul>
       
     
    </div>
   </div>
 </nav>
 
  </>

}

