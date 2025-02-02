import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { tokenContext } from "../../Context/Token/TokenContext";
import { Helmet } from "react-helmet";

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const { setToken } = useContext(tokenContext);

  const navigate = useNavigate();
  const validationSchema = Yup.object({
    email: Yup.string().required("Email Is Required").email(),
    password: Yup.string()
      .required("This Field is required")
      .matches(/^[A-Za-z0-9]{8,16}$/, "Invalid Password"),
  });
  const initialValues = {
    email: "",
    password: "",
  };

  const handleLogin = async (values) => {
    setIsLoading(true);
    await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then((res) => {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        setIsLoading(false);
        setErrorMsg(null);
        navigate("/");
      })
      .catch((error) => {
        setErrorMsg(error.response.data.message);
        setIsLoading(false);
      });
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleLogin,
  });
  return (
    <section className="md:w-2/3 lg:w-1/2 mx-auto bg-gray-100  my-4 rounded-md shadow p-4">
      <Helmet>
        <title>Log In</title>
      </Helmet>
      <h1 className="text-3xl font-semibold my-3 text-center">Login Now</h1>
      {errorMsg && <p className="bg-red-300 p-3 rounded-md my-2">{errorMsg}</p>}
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
        {isLoading ? (
          <button className="btn-main">loading...</button>
        ) : (
          <button type="submit" className="btn-main" disabled={!formik.isValid}>
            Log In
          </button>
        )}
        <small>
          don&apos;t have account{" "}
          <Link to={"/register"} className="text-blue-500 underline">
            Register
          </Link>
        </small>
      </form>
    </section>
  );
}
