import React, { useContext, useEffect } from 'react'
import { cartCotext } from '../../Cotext/CartContext'
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import {Helmet} from "react-helmet";
import { BallTriangle } from "react-loader-spinner";

export default function Cart() {
  let {getLoggedUserCart ,clearCart,removeItem,updateProductCount,setnumOfCartItems}=useContext(cartCotext);


const [cartDateils, setcartDateils] = useState(null)

//show
 async function getCart() {
   let response= await    getLoggedUserCart();
   if (response?.data?.status==="success") {
    console.log(response);
    setcartDateils(response.data.data);
  }
  console.log(response);

  }
  //delete
  async function deleteItem(productId) {
    let response= await  removeItem(productId);
    setnumOfCartItems(response.data.numOfCartItems)
    setcartDateils(response.data.data);
    toast('product removed')

 
   }
  //Clear
  async function clearItem() {
    let response= await  clearCart();
    setcartDateils(null);
    toast.success('The car has been cleaned')

 
   }
  //Update
  async function updateProductQuantity(productId,count) {
    let response= await  updateProductCount(productId,count);
    setcartDateils(response.data.data);
    toast('Product updated successfully')

 
   }


  useEffect(()=>{
    getCart();
  },[])





  return <>
   <Helmet>
                <title>Cart Details</title>
            </Helmet>
  {cartDateils!==null?
  <div className="bg-main-light p-4 my-4">
  <h3>Shop Cart</h3>
  <h6 className='text-main'>Total Cart Price: {cartDateils.totalCartPrice} EGP</h6>
  {cartDateils.products.map((product)=> <div key={product.product._id} className="row align-items-center border-bottom py-2 my-2">
    <div className="col-md-1">
      <img className='w-100' src={product.product.imageCover} alt="" />
      
    </div>
    <div className="col-md-11 d-flex justify-content-between">
      <div>

      <h6> {product.product.title} </h6>
      <h6 className='text-main'> Price : {product.price} </h6>
      <button onClick={()=>deleteItem(product.product._id)} className=' btn m-0 p-0'> <i className='fa-regular text-main fa-trash-can'></i> Remove</button>

      </div>
      <div>
        <button onClick={()=>updateProductQuantity(product.product._id,product.count+1)} className='btn border-main btn-sm'>+</button>
        <span className='mx-2'> {product.count} </span>
        <button onClick={()=>updateProductQuantity(product.product._id,product.count-1)} className='btn border-main btn-sm'>-</button>
      </div>

    </div>
  </div> )}
  <button className='btn bg-main '>
    <Link className='text-white text-decoration-none' to={'/checkout'}>
    checkout
    </Link>
  </button>
  <button className='btn bg-danger mx-2 '>
    <Link className='text-white text-decoration-none ' onClick={()=>clearItem()}>
    Clear
    </Link>
  </button>

</div>:
<section className='d-flex flex-column justify-content-center align-items-center  '>
  <div className="alert alert-info w-50 text-center">
  There are no products in the cart
  </div>
<BallTriangle
  height={100}
  width={200}
  radius={5}
  color="#4fa94d"
  ariaLabel="ball-triangle-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  />
   </section>  
}

  
  </>
}
