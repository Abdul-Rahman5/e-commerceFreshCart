import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
export default function Register() {
  let navigate = useNavigate();

  const [isLoading, setisLoading] = useState(false);
  const [messageError, setmessageError] = useState("");

  //send api to back end AbdoOmar11@code.com //AbdoOmar112@code.com //Abdrrrr@gmail.com
  async function handelRegister(values) {
    setisLoading(true);
    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .catch((errr) => {
        setisLoading(false);
        setmessageError(
          `${errr.response.data.errors.param} : ${errr.response.data.errors.msg} `
        );
      });

    if (data.message === "success") {
      setisLoading(false);
      navigate("/login");
    }
    console.log(data);
  }
  //validtion input
  let validationSchema = Yup.object({
    name: Yup.string()
      .required("name is required")
      .min(3, "name minlengh in 3")
      .max(20, "name maxlengh in 20"),
    email: Yup.string().required("email is required").email("email is invalid"),
    password: Yup.string()
      .required("password is required")
      .min(5, "password minlengh in 5")
      .max(30, "password maxlengh in 30"),
    rePassword: Yup.string()
      .required("rePassword is required")
      .oneOf([Yup.ref("password")], "password and repassword doesnt match"),
    phone: Yup.string().required("phone is required"),
  });
  // function validate(values) {
  //   let errors={};

  //   return errors;

  // }
  let formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: handelRegister,
  });

  return (
    <>
      <div className="w-75 mx-auto py-4">
        <h3>Register Now : </h3>

        {messageError.length > 0 ? (
          <div className="alert alert-danger">{messageError}</div>
        ) : null}

        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="name">Name: </label>
          <input
            onBlur={formik.handleBlur}
            className="form-control mb-2"
            onChange={formik.handleChange}
            value={formik.values.name}
            name="name"
            id="name"
            type="text"
          />
          {formik.errors.name && formik.touched.name ? (
            <div class="alert alert-danger" role="alert">
              {formik.errors.name}
            </div>
          ) : null}

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

          <label onBlur={formik.handleBlur} htmlFor="rePassword">
            RePassword:{" "}
          </label>
          <input
            className="form-control mb-2"
            onChange={formik.handleChange}
            value={formik.values.rePassword}
            name="rePassword"
            id="rePassword"
            type="password"
          />
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div class="alert alert-danger" role="alert">
              {formik.errors.rePassword}
            </div>
          ) : null}

          <label htmlFor="phone">Phone: </label>
          <input
            onBlur={formik.handleBlur}
            className="form-control mb-2"
            onChange={formik.handleChange}
            value={formik.values.phone}
            name="phone"
            id="phone"
            type="tel"
          />
          {formik.errors.phone && formik.touched.phone ? (
            <div class="alert alert-danger" role="alert">
              {formik.errors.phone}
            </div>
          ) : null}
          {isLoading ? (
            <button className="btn bg-main text-white" type="button">
              <i className="fas fa-spinner fa-spin"></i>
            </button>
          ) : (
            <button
              disabled={!(formik.isValid && formik.dirty)}
              className="btn bg-main text-white"
              type="submit"
            >
              Register
            </button>
          )}
        </form>
      </div>
    </>
  );
}
