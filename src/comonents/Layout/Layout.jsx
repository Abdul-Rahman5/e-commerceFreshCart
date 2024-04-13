import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from './../Footer/Footer';
import { Outlet } from 'react-router-dom';
import { Offline, Online } from "react-detect-offline";


export default function Layout({userData,logOut}) {
  return<>
  <div className="pb-4 mb-5">
  <Navbar   userData={userData} logOut={logOut} />
  </div>

  <div className="container">
  <Outlet></Outlet>
  </div>
  <div>
    {/* <Online>Only shown when you're online</Online> */}
    <Offline>
      <div className="network">
        <i className='fas fa-wifi'></i>

      you are offline (surprise!)
      </div>
      </Offline>
  </div>


  <Footer/>

  
  
  
  
  </>
}
