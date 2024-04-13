import axios from "axios";
import { useFormik } from "formik";
import React, { useContext ,useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { BallTriangle } from 'react-loader-spinner'
import { UserCotext } from './../../Cotext/UserContext';

export default function Login({saveUserData}) {
  let navigate = useNavigate();

  const [isLoading, setisLoading] = useState(false);
  const [messageError, setmessageError] = useState("");

  //send api to back end AbdoOmar11@code.com //AbdoOmar112@code.com //Abdrrrr@gmail.com



  
  async function handelLogin(values) {
    setisLoading(true);
    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .catch((errr) => {
        setisLoading(false);
        setmessageError(
          `${errr.response.data.errors.param} : ${errr.response.data.errors.msg} `
        );
      });

    if (data.message === "success") {

      localStorage.setItem("userToken",data.token);
      saveUserData(data.token);
      setisLoading(false);
      navigate("/");
    }
    // console.log(data);
  }
  //validtion input
  let validationSchema = Yup.object({
  
    email: Yup.string().required("email is required").email("email is invalid"),
    password: Yup.string()
      .required("password is required")
      .min(5, "password minlengh in 5")
      .max(30, "password maxlengh in 30"),
  });
  // function validate(values) {
  //   let errors={};

  //   return errors;

  // }
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handelLogin,
  });

  return (
    <>
      <div className="w-75 mx-auto py-4">
        <h3>Login Now : </h3>

        {messageError.length > 0 ? (
          <div className="alert alert-danger">{messageError}</div>
        ) : null}

        <form onSubmit={formik.handleSubmit}>
         

          <label htmlFor="email">Email: </label>
          <input
            onBlur={formik.handleBlur}
            className="form-control mb-2"
            onChange={formik.handleChange}
            value={formik.values.email}
            name="email"
            id="email"
            type="email"
          />
          {formik.errors.email && formik.touched.email ? (
            <div class="alert alert-danger" role="alert">
              {formik.errors.email}
            </div>
          ) : null}

          <label htmlFor="password">Password: </label>
          <input
            onBlur={formik.handleBlur}
            className="form-control mb-2"
            onChange={formik.handleChange}
            value={formik.values.password}
            name="password"
            id="password"
            type="password"
          />
          {formik.errors.password && formik.touched.password ? (
            <div class="alert alert-danger" role="alert">
              {formik.errors.password}
            </div>
          ) : null}

         
          {isLoading ? (
            <button className="btn bg-main text-white" type="button">
              
              <BallTriangle
  height={30}
  width={100}
  radius={5}
  color="#fff"
  ariaLabel="ball-triangle-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  />
            </button>
          ) : (
            <button
              disabled={!(formik.isValid && formik.dirty)}
              className="btn bg-main text-white"
              type="submit"
            >
              Login
            </button>
          )}
        </form>
      </div>
    </>
  );
}
