import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import { cartCotext } from "../../Cotext/CartContext";
import toast from "react-hot-toast";

export default function ProductDetalis() {
  // const [productDetails, setproductDetails] = useState(null);
  // const [isLoading, setisLoading] = useState(false);
  let param = useParams();
  // async function getProductDetails(id) {
  //   // setisLoading(true)
  //   let { data } = await axios.get(
  //     `https://ecommerce.routemisr.com/api/v1/products/${id}`
  //   );
  //   setproductDetails(data.data);
  //   // setisLoading(false)
  // }
  // useEffect(() => {
  //   getProductDetails(param.id);
  // }, []);

  //slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };



  function getProductDetalis(id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    
  }

let {data , isLoading ,isError}= useQuery("ProductDetalis",()=>getProductDetalis(param.id))
console.log(data);

//add product

let {addToCart,setnumOfCartItems}=useContext(cartCotext);


async function addProduct(productId) {
  let response=await addToCart(productId);


  if (response?.data?.status==="success") {
    setnumOfCartItems(response.data.numOfCartItems)
    toast.success(response.data.message,{duration:4000});
  }else{
    toast.error('Error adding product',{duration:4000});


  }
  console.log(response);
}



  return (
    <>
     <Helmet>
                <meta charSet="utf-8" />
                <title>Product Detalis</title>
            </Helmet>
      <div className="row justify-content-center align-items-center py-3">
        {isLoading? <div className="text-center"><i className="fas fa-spinner fa-spin fa-3x text-main"></i></div> :<>
        
        
        <div className="col-md-4">
          <Slider {...settings}>
            {data?.data.data?.images.map((img)=> <img src={img} alt="" /> )}
          </Slider>
          {/* <img className="w-100" src={productDetails?.imageCover} alt="" /> */}
        </div>
        <div className="col-md-8">
          <h3 className=" fw-bolder">{data?.data.data?.title}</h3>
          <p className="lead">{data?.data.data?.description}</p>
          <div className="d-flex justify-content-between">
            {/* <span className="text-main">{data?.data.data?.Category?.name}</span> */}
            <span className="text-main">Price : {data?.data.data?.price}EGP</span>
            <span className="text-muted">
              <i className="fas fa-star rating-color"></i>
              {data?.data.data?.ratingsAverage}
            </span>
          </div>
          <button onClick={()=>addProduct(data?.data.data?.id)} className="btn  mt-3 bg-main text-white w-100">+ Add</button>
        </div>
        
        </> }
        
      </div>
    </>
  );
}
