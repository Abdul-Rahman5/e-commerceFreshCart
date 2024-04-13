import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cartContext, cartCotext } from "../../Cotext/CartContext";
import toast from 'react-hot-toast';
import { useQuery } from "react-query";
import { BallTriangle } from "react-loader-spinner";

export default function FeaturedProduct() {


let {addToCart,setnumOfCartItems}=useContext(cartCotext);


async function addProduct(productId) {
  let response=await addToCart(productId);


  if (response?.data?.status==="success") {
    setnumOfCartItems(response.data.numOfCartItems)
    toast.success(response.data.message,{duration:4000});
    // toast("text true")
  }else{
    toast.error('Error adding product',{duration:4000});
    // toast("text falses")


  }
  console.log(response);
}




  // const [products, setproducts] = useState([]);
  // async function getProduct() {
  //   let { data } = await axios.get(
  //     `https://ecommerce.routemisr.com/api/v1/products`
  //   );
  //   setproducts(data.data);
  // }
  // useEffect(() => {
  //   getProduct();
  // }, []);


// react query
function getfeaturedProduct() {
  return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
}

let {isLoading,isError ,data,isFetched ,refetch}=useQuery("featuredProducts",getfeaturedProduct ,{
  // cacheTime:3000,
  // refetchOnMount:false,
  // staleTime:3000,
  // refetchInterval:100,
  // enabled:false

});




  return (
    <>
    {isLoading?<div className="w-100 py-5 d-flex justify-content-center">
    <BallTriangle
  height={60}
  width={200}
  radius={5}
  color="#4fa94d"
  ariaLabel="ball-triangle-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  />
    </div>:<div className="row">
      {/* <button onClick={()=> refetch()} className="btn bg-main text-white w-100">Get Product</button> */}
        {data?.data.data.map((product) => (
          <div key={product._id} className="col-md-2">
            <div className="product rounded-3 cursor-pointer px-2 py-3">
            <Link className="text-decoration-none" to={`/ProductDetalis/${product._id}`}>

              <img className="w-100" src={product.imageCover} alt="" />
              <span className="text-main fw-bold font-sm">{product.category.name}</span>
              <h3 className="h6 fw-bolder">{product.title.split(' ').slice(0,2).join(' ')}</h3>
            <div className="d-flex justify-content-between">
              <span className="text-muted">{product.price}EGP</span>
              <span className="text-muted">
                <i className="fas fa-star rating-color" ></i>
                {product.ratingsAverage}
              </span>

            </div>
            </Link>
            <button onClick={()=>addProduct(product._id)}  to={`/ProductDetalis/${product._id}`} className="btn  bg-main text-white w-100">+ Add</button>
            </div>
          </div>
        ))}
      </div>}
    
      
    </>
  );
}
