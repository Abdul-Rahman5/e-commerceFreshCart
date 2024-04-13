
import React, { useContext } from 'react'
// import { useContext } from 'react';
// import { cartContext } from './../../Cotext/CartContext';
import { useFormik } from 'formik';
import { cartContext, cartCotext } from "../../Cotext/CartContext";

export default function Checkout() {


  
  let {onlinePayment , cartId}=useContext(cartCotext);

  async function handleSubmit(values) {
   let response=await onlinePayment(cartId,values);


   if (response?.data?.status==="success") {
   window.location.href=response.data.session.url;
  }
  }
  //initialValues
 let formaik= useFormik({
  initialValues:{
details:'',
city:'',
phone:''
  },
  onSubmit:handleSubmit
 })







  return <>
  <div className="w-50 py-5 mx-auto ">
    <form onSubmit={formaik.handleSubmit}>
      <label htmlFor="details">details : </label>
      <input type="text" name='details' id='details' className='form-control mb-3' value={formaik.values.details} onChange={formaik.handleChange} />


      <label htmlFor="phone">phone : </label>
      <input type="tel" name='phone' id='phone' className='form-control mb-3' value={formaik.values.phone} onChange={formaik.handleChange} />


      <label htmlFor="city">city : </label>
      <input type="text" name='city' id='city' className='form-control mb-3' value={formaik.values.city} onChange={formaik.handleChange} />

<button type='submit' className='btn border-main w-100'>Pay</button>

    </form>

  </div>
  </>
}
