import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { tokenContext } from "../../Context/Token/TokenContext";
import { Helmet } from "react-helmet";
import styles from "./SignIn.module.css";
import { motion } from "framer-motion";
import image from "../../assets/logo.svg";
import { MdEmail } from "react-icons/md";
import { RiLoader2Fill, RiLockPasswordFill } from "react-icons/ri";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoLogIn } from "react-icons/io5";

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
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

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <section className="md:w-2/3 lg:w-1/2 mx-auto h-[80vh] flex items-center my-4 rounded-md p-4">
      <Helmet>
        <title>Log In</title>
      </Helmet>
      <motion.div
        initial={{ y: -300, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 2 }}
        className={styles.formContainer}
      >
        <p className={styles.title}>
          <img src={image} alt="logo image" />
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
            <Link to={"/forgetpassword"} className={styles.pageLinkLabel}>
              Forgot Password?
            </Link>
          </p>
        </form>
        <p className={styles.signUpLabel}>
          Don&apos;t have an account?
          <Link to={"/register"} className={styles.signUpLink}>
            Sign up
          </Link>
        </p>
      </motion.div>
    </section>
  );
}
