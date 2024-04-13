import React from 'react'
import FeaturedProduct from '../FeaturedProduct/FeaturedProduct'
import CatrgorySlider from '../CatrgorySlider/CatrgorySlider'
import MainSlider from '../MainSlider/MainSlider'
import useNetwork from '../../Hooks/useNetwork'

export default function Home() {
  let network=useNetwork()
  return <>
  {network}
  <MainSlider/>
   <CatrgorySlider/>
    <FeaturedProduct/>
    
    </>
}
