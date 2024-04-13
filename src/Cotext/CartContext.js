import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let cartCotext=createContext();


export  function CartContextProvider(props) { 
    const [cartId, setcartId] = useState(null)
    const [numOfCartItems, setnumOfCartItems] = useState(0)

    
 async function getCart() { 
    let response= await getLoggedUserCart();
    if (response?.data?.status==='success') {
        setnumOfCartItems(response.data.numOfCartItems)
        setcartId(response.data.data._id)
    }
 }
useEffect(()=>{
    getCart();
},[])


    let headers = {
            token: localStorage.getItem("userToken"),
          };
          // add cart
    async function addToCart(productId) {
            return axios
              .post(
                `https://ecommerce.routemisr.com/api/v1/cart`,
                {
                  productId,
                },
                {
                  headers: headers,
                }
              )
              .then((response) => response)
              .catch((error) => error);
          }
          // show all product
          async function getLoggedUserCart() {
            return axios
              .get(
                `https://ecommerce.routemisr.com/api/v1/cart`,
                {
                  headers: headers,
                }
              )
              .then((response) => response)
              .catch((error) => error);
          }
             // show all orders
             async function getOrders(userCartID) {
              return axios
                .get(
                  `https://ecommerce.routemisr.com/api/v1/orders/user/${userCartID}`
                )
                .then((response) => response)
                .catch((error) => error);
            }
          // remove
          async function removeItem(productId) {
            return axios
              .delete(
                `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                {
                  headers: headers,
                }
              )
              .then((response) => response)
              .catch((error) => error);
          }
           // remove
           async function clearCart() {
            return axios
              .delete(
                `https://ecommerce.routemisr.com/api/v1/cart`,
                {
                  headers: headers,
                }
              )
              .then((response) => response)
              .catch((error) => error);
          }
          // Update product Count
          async function updateProductCount(productId,count) {
            return axios
              .put(
                `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                {
                   count:count
                },
                {
                  headers: headers,
                }
              )
              .then((response) => response)
              .catch((error) => error);
          }
          // onlinePayment
          async function onlinePayment(cartId,shippingAddress) {
            return axios
              .post(
                `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000/`,
                {
                    shippingAddress:shippingAddress
                },
                {
                  headers: headers,
                }
              )
              .then((response) => response)
              .catch((error) => error);
          }



    return <cartCotext.Provider value={{setnumOfCartItems ,getLoggedUserCart ,getOrders,cartId,numOfCartItems ,clearCart , onlinePayment,addToCart,getLoggedUserCart,removeItem,updateProductCount}}>
        {props.children}
    </cartCotext.Provider>
 }
// import axios from "axios";
// import { createContext } from "react";
// import { cartContext } from './CartContext';

// export let cartContext = createContext();
// export function cartContextProvider(props) {
//   let headers = {
//     token: localStorage.getItem("userToken"),
//   };
//   async function addToCart(x) {
//     return axios
//       .post(
//         `https://ecommerce.routemisr.com/api/v1/cart`,
//         {
//           productId: x,
//         },
//         {
//           headers: headers,
//         }
//       )
//       .then((response) => response)
//       .catch((error) => error);
//   }
//   return ( <cartContext.Provider value={{ addToCart }}>

//       {props.children}
//     </cartContext.Provider>
//   );
// }
