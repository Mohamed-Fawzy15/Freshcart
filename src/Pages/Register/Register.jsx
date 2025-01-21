import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

// import styles from "./Register.module.css";
export default function Register() {
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const initialValues = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is Required")
      .matches(/^[A-Z][a-z]*$/, "Invalid Name"),
    email: Yup.string().required("Email is required").email(),
    password: Yup.string()
      .required("This Field is required")
      .matches(/^[A-Za-z0-9]{8,16}$/, "Invalid Password"),
    rePassword: Yup.string()
      .required("This Field is required")
      .oneOf([Yup.ref("password")], "rePassword not matching password"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^[01][0-1-2-5][0-9]{9}$/, "Invalid Phone number"),
  });

  const handleRegister = async (values) => {
    setIsLoading(true);
    await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then(() => {
        navigate("/signin");
        setErrorMsg(null);
        setIsLoading(false);
      })
      .catch((error) => {
        setErrorMsg(error.response.data.message);
        setIsLoading(false);
      });
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleRegister,
  });

  return (
    <section className="md:w-2/3 lg:w-1/2 mx-auto bg-gray-100 my-4 rounded-md shadow p-4">
      <h1 className="text-3xl font-semibold my-3 text-center">Register Now</h1>
      {errorMsg && <p className="bg-red-300 p-3 rounded-md my-2">{errorMsg}</p>}
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Name
          </label>
          <input
            type="name"
            id="name"
            name="name"
            className="input-style"
            placeholder="Enter Your Name"
            onChange={formik.handleChange}
            value={formik.values.name}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500">{formik.errors.name}</p>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="input-style"
            placeholder="Enter Your Email"
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500">{formik.errors.email}</p>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="phone"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="input-style"
            placeholder="Enter Your Phone"
            onChange={formik.handleChange}
            value={formik.values.phone}
            onBlur={formik.handleBlur}
          />
          {formik.touched.phone && formik.errors.phone && (
            <p className="text-red-500">{formik.errors.phone}</p>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="input-style"
            placeholder="Enter Your Password"
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500">{formik.errors.password}</p>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="rePassword"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your rePassword
          </label>
          <input
            type="password"
            id="rePassword"
            name="rePassword"
            className="input-style"
            placeholder="Enter Your rePassword"
            onChange={formik.handleChange}
            value={formik.values.rePassword}
            onBlur={formik.handleBlur}
          />
          {formik.touched.rePassword && formik.errors.rePassword && (
            <p className="text-red-500">{formik.errors.rePassword}</p>
          )}
        </div>

        {isLoading ? (
          <button className="btn-main">loading...</button>
        ) : (
          <button type="submit" className="btn-main" disabled={!formik.isValid}>
            Register
          </button>
        )}
        <small>
          Already have account{" "}
          <Link to={"/signin"} className="text-blue-500 underline">
            login
          </Link>
        </small>
      </form>
    </section>
  );
}
