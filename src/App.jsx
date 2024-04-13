import logo from './logo.svg';
import './App.css';
import  { Toaster } from 'react-hot-toast';

import Layout from './comonents/Layout/Layout';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './comonents/Home/Home';
import Login from './comonents/Login/Login';
import Register from './comonents/Register/Register';
import Cart from './comonents/Cart/Cart';
import Product from './comonents/Product/Product';
import About from './comonents/About/About';
import Categories from './comonents/Categories/Categories';
import NotFound from './comonents/NotFound/NotFound';
import Brands from './comonents/Brands/Brands';
import { useState } from 'react';
import jwtDecode from 'jwt-decode';
import ProtectedRoute from './comonents/ProtectedRoute/ProtectedRoute';
import ProductDetalis from './comonents/ProductDetalis/ProductDetalis';
import CatrgorySlider from './comonents/CatrgorySlider/CatrgorySlider';
import MainSlider from './comonents/MainSlider/MainSlider';
import { CartContextProvider } from './Cotext/CartContext';
import Checkout from './comonents/Checkout/Checkout';
import { Offline, Online } from "react-detect-offline";
import Orders from './comonents/Orders/Orders';




function App() {
const [userData, setuserData] = useState(null);
function saveUserData() {
  let encodedToken= localStorage.getItem("userToken");
  let decodedToken=jwtDecode(encodedToken);
  setuserData(decodedToken);
}
function logOut() {
  localStorage.removeItem("userToken");
  setuserData(null);
 return <Navigate to="/login"/>;
}

  let router =createBrowserRouter([
    {path:'',element:<Layout logOut={logOut} userData={userData} />,children:[
      {index:true,element : <ProtectedRoute><Home/></ProtectedRoute> },
      {path:'cart',element:<ProtectedRoute> <Cart/></ProtectedRoute>},
      {path:'product',element:<ProtectedRoute>  <Product/></ProtectedRoute>},
      {path:'ProductDetalis/:id',element:<ProtectedRoute>  <ProductDetalis/></ProtectedRoute>},
      {path:'CatrgorySlider',element:<ProtectedRoute>  <CatrgorySlider/></ProtectedRoute>},
      {path:'MainSlider',element:<ProtectedRoute>  <MainSlider/></ProtectedRoute>},
    
      {path:'about',element: <ProtectedRoute><About/></ProtectedRoute> },
      {path:'categories',element: <ProtectedRoute> <Categories/></ProtectedRoute>},
      {path:'brands',element:  <ProtectedRoute><Brands/></ProtectedRoute> },
      {path:'checkout',element:  <ProtectedRoute><Checkout/></ProtectedRoute> },
      {path:'//allorders',element:  <ProtectedRoute><Orders/></ProtectedRoute> },

      {path:'login',element:<Login saveUserData={saveUserData} />},
      {path:'register',element:<Register/>},
      {path:'*',element:<NotFound/>},
    ]}
  ])
  
  return <  CartContextProvider>

    <Offline> <div className="network">
    Only shown offline (surprise!)
      </div> </Offline>
  <Toaster />
   <RouterProvider router={router}></RouterProvider>
  </CartContextProvider>


}

export default App;
