import React, { useEffect, useState } from 'react'


export default function useNetwork() {
    const [isOnline, setIsOnline] = useState(true)
    useEffect(() => {
        detectOnline()
    
    }, [])
    function detectOnline() {
        window.addEventListener("online",function () {
            setIsOnline(true)
        })
        window.addEventListener("offline",function () {
            setIsOnline(false)
            ;
        })
    }
  
    
    console.log(isOnline);
  return <>
  {!isOnline?<div className='network'>
    <i className='fas fa-wifi mx-2'></i>
    you are offonline
  </div>:''}
  
  </>
}
