import React, { useContext, useEffect, useState } from "react";
import { BallTriangle } from "react-loader-spinner";
import { cartCotext } from "../../Cotext/CartContext";

export default function Orders() {
  let { getOrders , cartId  } = useContext(cartCotext);
  const [cartuserOrder, setCartuserOrder] = useState(null);

  console.log(cartId);
  //show
  async function getOrder() {

    console.log(cartId);

    let response = await getOrders(cartId);
    console.log(response);
    if (response?.statusText === "OK") {
      setCartuserOrder(response.data);
    }
  }
  useEffect(() => {
    getOrder();
  }, []);
  return (
    <>
      {cartuserOrder !== null ? (
        <div className="bg-main-light p-4 my-4">
          <h3>Shop Cart</h3>
          <h6 className="text-main">
            Total Cart Price: {cartuserOrder.totalOrderPrice} EGP
          </h6>
          {cartuserOrder.map((order, index) => (
            <div
              key={order._id}
              className="row align-items-center border-bottom py-2 my-2"
            >
              <h6 className=" fw-bolder fs-3 text-center">
                {" "}
                Cart Number: {index + 1}{" "}
              </h6>
              <h6 className="text-main">
                Total Cart Price: {order.totalOrderPrice}EGP{" "}
              </h6>
              {order.cartItems.map((product) => (
                <div key={product.product.id}>
                  <div className="col-md-1">
                    {/* {console.log();} */}
                    <img
                      className="w-100"
                      src={product.product.imageCover}
                      alt=""
                    />
                  </div>
                  <div className="col-md-11 d-flex justify-content-between">
                    <div>
                      <h6 className="text-main">
                        Total Cart Price: {product.product.totalOrderPrice} EGP
                      </h6>
                      {/* {console.log(product.product)} */}

                      <h6 className="lead my-1"> {product.product.title} </h6>
                      {/* <h6 className='text-main'> Price : {product.price} </h6> */}
                    </div>
                    <div>
                      <span className="mx-2"> {product.count} </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <section className="d-flex flex-column justify-content-center align-items-center  ">
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
      )}
    </>
  );
}
