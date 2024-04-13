import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Brands() {
  const [brands, setBrands] = useState([]);
  async function getBrands() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/Brands`
    );
    setBrands(data);
  }
  useEffect(() => {
    getBrands();
  }, []);
  console.log(brands);
  return <>
   <div  className='mb-5  row g-2' >
      {brands.data?.map((brand)=><div key={brand._id} className="col-md-3 rounded-2  product">
        <Link className="item  text-decoration-none border border-1 border-white rounded-2">
        <img className='w-100 text-center rounded-2' height={250} src={brand.image} alt="" />
        <h2 className='h6 text-center text-main mt-2 '> {brand.name} </h2>
        </Link>
       
          

          </div>)}

          </div>
  
  
  </>
}
