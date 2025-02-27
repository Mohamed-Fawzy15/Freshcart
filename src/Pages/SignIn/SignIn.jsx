import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Helmet } from "react-helmet";
import styles from "./SignIn.module.css";
import { motion } from "framer-motion";
import logo from "../../assets/logo.png";
import { MdEmail } from "react-icons/md";
import { RiLoader2Fill, RiLockPasswordFill } from "react-icons/ri";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoLogIn } from "react-icons/io5";
import loginImage from "../../assets/login.jpg";
import { useDispatch } from "react-redux";

import { newToken } from "../../Redux/Token/TokenSlice";
import { loginUser } from "../../Redux/Auth/AuthSlice";

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // redux function
  const dispatch = useDispatch();

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
    dispatch(loginUser(values))
      .then((res) => {
        dispatch(newToken(res.payload.token));
        setIsLoading(false);
        navigate("/");
      })
      .catch((err) => {
        setErrorMsg(err.response?.data?.message);
        setIsLoading(false);
      });
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleLogin,
  });

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <section className=" mx-auto  flex items-center">
      <Helmet>
        <title>Log In</title>
      </Helmet>

      <div className=" w-full flex justify-center min-h-screen">
        <div
          className="hidden bg-cover lg:block lg:w-3/5 rounded-lg"
          style={{
            backgroundImage: `url(${loginImage})`,
          }}
        ></div>
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 2 }}
          className={`${styles.formContainer} lg:w-2/5 dark:bg-[#111827]`}
        >
          <p className={styles.title}>
            <img src={logo} className="h-8" alt="Freshcart Logo" />
            <p className="font-bold text-2xl dark:text-white">FreshCart</p>
          </p>
          {errorMsg && (
            <p className="bg-red-300 p-3 rounded-md my-2">{errorMsg}</p>
          )}
          <form className={styles.form} onSubmit={formik.handleSubmit}>
            <div className="w-full">
              <label
                htmlFor="email"
                className="block mb-2 text-sm ps-2 font-medium text-gray-900 dark:text-white"
              >
                Your Email
              </label>
              <div className="relative">
                <MdEmail className="absolute top-3 left-2 text-green-500 text-lg" />

                <input
                  type="email"
                  id="email"
                  className="input-style px-7"
                  placeholder="Email"
                  name="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                />
              </div>

              {formik.touched.email && formik.errors.email && (
                <div>
                  <div className="relative w-full mt-2 flex flex-wrap items-center justify-center py-1 pl-4 pr-4 rounded-full text-base font-medium [transition:all_0.5s_ease] border-solid border border-[#f85149] text-[#b22b2b] [&_svg]:text-[#b22b2b] group bg-[linear-gradient(#f851491a,#f851491a)]">
                    <p className="flex w-full flex-row items-center mr-auto gap-x-2">
                      <svg
                        stroke="currentColor"
                        fill="none"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        height={28}
                        width={28}
                        className="h-7 w-7"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                        <path d="M12 9v4" />
                        <path d="M12 17h.01" />
                      </svg>
                      {formik.errors.email}
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="w-full">
              <label
                htmlFor="password"
                className="block mb-2 text-sm ps-2 font-medium text-gray-900 dark:text-white"
              >
                Your Password
              </label>

              <div className="relative">
                <RiLockPasswordFill className="absolute top-3 left-2 text-green-500 text-lg" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="input-style px-7"
                  placeholder="Password"
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                />

                <button
                  type="button"
                  className="absolute right-2 top-3 text-lg"
                  onClick={togglePassword}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {formik.touched.password && formik.errors.password && (
                <div>
                  <div className="relative w-full mt-2 flex flex-wrap items-center justify-center py-1 pl-4 pr-4 rounded-full text-base font-medium [transition:all_0.5s_ease] border-solid border border-[#f85149] text-[#b22b2b] [&_svg]:text-[#b22b2b] group bg-[linear-gradient(#f851491a,#f851491a)]">
                    <p className="flex w-full flex-row items-center mr-auto gap-x-2">
                      <svg
                        stroke="currentColor"
                        fill="none"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        height={28}
                        width={28}
                        className="h-7 w-7"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                        <path d="M12 9v4" />
                        <path d="M12 17h.01" />
                      </svg>
                      {formik.errors.password}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {isLoading ? (
              <button
                className="CartBtn"
                type="submit"
                disabled={!formik.isValid || !formik.dirty}
              >
                <span className="IconContainer">
                  <RiLoader2Fill className="text-white text-lg me-2" />
                </span>
                <p className="text">..loading</p>
              </button>
            ) : (
              <button
                className="CartBtn"
                type="submit"
                disabled={!formik.isValid || !formik.dirty}
              >
                <span className="IconContainer">
                  <IoLogIn className="text-white text-lg me-2" />
                </span>
                <p className="text">Log In</p>
              </button>
            )}

            <p className={styles.pageLink}>
              <Link
                to={"/setnewpassword"}
                className={`${styles.pageLinkLabel} dark:text-white`}
              >
                Forgot Password?
              </Link>
            </p>
          </form>
          <p className={`${styles.signUpLabel} dark:text-white `}>
            Don&apos;t have an account?
            <Link to={"/register"} className={styles.signUpLink}>
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
