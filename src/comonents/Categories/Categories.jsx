import React, { useEffect, useState } from 'react'
import CatrgorySlider from '../CatrgorySlider/CatrgorySlider'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Categories() {
  // context====================================
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
  console.log(Categories);
  //==================================================
  //Redux
  // let {loading ,isError ,categories}=useSelector((state)=>{
  //   console.log(state);

  // })
  return (
    <>
   {/* context */}
    <CatrgorySlider/>
    <div  className='mb-5  row g-2' >
      {Categories?.map((category)=><div className="col-md-3 rounded-2  product">
        <Link className="item  text-decoration-none border border-1 border-main rounded-2">
        <img className='w-100 text-center rounded-2' height={250} src={category.image} alt="" />
        <h2 className='h6 text-center text-main mt-2 '> {category.name} </h2>
        </Link>
       
          

          </div>)}
          
          </div>
   {/* context */}
   {/* Redux */}

   {/* Redux */}





          </>
  )
}
