import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
export default function CatrgorySlider() {
  const [Categories, setCategories] = useState([]);
  async function getCategories() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories`
    );
    setCategories(data.data);
  }
  useEffect(() => {
    getCategories();
  }, []);
    //slider
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 7,
      slidesToScroll: 1,
    };
  return <>
  <h3 className='mt-5'>Main Slider</h3>
  <Slider className='mb-5' {...settings}>
            {Categories?.map((Category)=> 
            <div key={Category._id} > 
            <img height={200} className='w-100' src={Category.image} alt="" />
            <h2 className='h6 pt-2'> {Category.name} </h2>
            
            </div>  
            )}
          </Slider>
  </>
}
