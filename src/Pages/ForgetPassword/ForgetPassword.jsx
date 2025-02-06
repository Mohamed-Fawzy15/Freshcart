import { Helmet } from "react-helmet";
import "./ForgetPassword.module.css";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import image from "../../assets/mobile-login-concept-illustration_114360-83.avif";
import { motion } from "framer-motion";

export default function ForgetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().required("Email Is Required").email(),
  });

  const handleForgetPassword = async (values) => {
    setIsLoading(true);
    await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      )
      .then((res) => {
        console.log(res.data);
        if (res.data?.statusMsg === "success") {
          navigate("/resetcode");
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleForgetPassword,
  });
  return (
    <div className="flex justify-center items-center h-[90vh]">
      <Helmet>
        <title>Forget Password</title>
      </Helmet>

      <motion.div
        initial={{ y: -200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 2 }}
        className="rounded-lg bg-gray-100 p-10 shadow-lg border-2 border-green-400"
      >
        <h2 className="capitalize text-2xl font-semibold">
          forget your password
        </h2>
        <p className="my-4">
          Don&apos;t fret! Just type in your email and we will send you a code
          to reset your password!
        </p>
        <form onSubmit={formik.handleSubmit}>
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

          {isLoading ? (
            <button className="btn-main">loading...</button>
          ) : (
            <button
              type="submit"
              className="btn-main mt-0"
              disabled={!formik.isValid}
            >
              Log In
            </button>
          )}
          <small>
            don&apos;t have account{" "}
            <Link to={"/register"} className="text-green-500 underline">
              Register
            </Link>
          </small>
        </form>
      </motion.div>

      <div>
        <img src={image} className="w-full" alt="forget password image" />
      </div>
    </div>
  );
}
