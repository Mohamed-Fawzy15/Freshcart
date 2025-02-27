import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { motion } from "framer-motion";
import image from "../../assets/logo.svg";
import styles from "./Register.module.css";
import { MdEmail } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { FaEye, FaEyeSlash, FaPhoneAlt, FaSignOutAlt } from "react-icons/fa";
import { RiLoader2Fill, RiLockPasswordFill } from "react-icons/ri";
import signupImage from "../../assets/signup.jpg";

// import styles from "./Register.module.css";
export default function Register() {
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
        setErrorMsg(null);
        setIsLoading(false);
        navigate("/signin");
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

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <section className=" mx-auto  ">
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <div className="flex justify-center min-h-screen">
        <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-2/5">
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 2 }}
            className={styles.formContainer}
          >
            <p className={styles.title}>
              <img src={image} alt="logo image" />
            </p>
            {errorMsg && (
              <p className="bg-red-300 p-3 rounded-md my-2">{errorMsg}</p>
            )}
            <form onSubmit={formik.handleSubmit} className={styles.form}>
              <div className="w-full">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm ps-2 font-medium text-gray-900 dark:text-white"
                >
                  Your Name
                </label>
                <div className="relative">
                  <IoPerson className="absolute top-3 left-2 text-green-500 text-lg" />

                  <input
                    type="text"
                    id="name"
                    className="input-style"
                    placeholder="Your Name"
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    onBlur={formik.handleBlur}
                  />
                </div>
                {formik.touched.name && formik.errors.name && (
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
                        {formik.errors.name}
                      </p>
                    </div>
                  </div>
                )}
              </div>
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
                    className="input-style"
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
                  htmlFor="phone"
                  className="block mb-2 text-sm ps-2 font-medium text-gray-900 dark:text-white"
                >
                  Your Email
                </label>

                <div className="relative">
                  <FaPhoneAlt className="absolute top-3 left-2 text-green-500 text-lg" />

                  <input
                    type="tel"
                    id="phone"
                    className="input-style "
                    placeholder="Phone"
                    name="phone"
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                    onBlur={formik.handleBlur}
                  />
                </div>

                {formik.touched.phone && formik.errors.phone && (
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
                        {formik.errors.phone}
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
                  Your Email
                </label>
                <div className="relative">
                  <RiLockPasswordFill className="absolute top-3 left-2 text-green-500 text-lg" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="input-style"
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
              <div className="w-full">
                <label
                  htmlFor="rePassword"
                  className="block mb-2 text-sm ps-2 font-medium text-gray-900 dark:text-white"
                >
                  Your rePassword
                </label>

                <div className="relative">
                  <RiLockPasswordFill className="absolute top-3 left-2 text-green-500 text-lg" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="rePassword"
                    className="input-style"
                    placeholder="rePassword"
                    name="rePassword"
                    onChange={formik.handleChange}
                    value={formik.values.rePassword}
                    onBlur={formik.handleBlur}
                  />

                  <button
                    type="button"
                    className="absolute right-2 top-3 text-lg"
                    onClick={togglePassword}
                  ></button>
                </div>

                {formik.touched.rePassword && formik.errors.rePassword && (
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
                        {formik.errors.rePassword}
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
                  <p className="text">...loading</p>
                </button>
              ) : (
                <button
                  className="CartBtn"
                  type="submit"
                  disabled={!formik.isValid || !formik.dirty}
                >
                  <span className="IconContainer">
                    <FaSignOutAlt className="text-white text-lg me-2" />
                  </span>
                  <p className="text">Sign Up</p>
                </button>
              )}
              <small>
                Already have account?
                <Link to={"/signin"} className="text-green-500 underline">
                  login
                </Link>
              </small>
            </form>
          </motion.div>
        </div>
        <div
          className="hidden bg-cover rounded-lg lg:block lg:w-3/5"
          style={{
            backgroundImage: `url(${signupImage})`,
          }}
        ></div>
      </div>
    </section>
  );
}
