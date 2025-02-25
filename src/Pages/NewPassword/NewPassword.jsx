import { Helmet } from "react-helmet";
import { motion, AnimatePresence } from "framer-motion";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import styles from "./NewPassword.module.css";
import axios from "axios";
import { MdEmail } from "react-icons/md";
import { RiLoader2Fill, RiLockPasswordFill } from "react-icons/ri";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { CiLogin } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { newPassword } from "../../Redux/Auth/AuthSlice";

export default function NewPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    newPassword: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().required("Email is required").email(),
    newPassword: Yup.string()
      .required("Password is required")
      .matches(/^[A-Za-z0-9]{8,16}$/, "Invalid Password"),
  });

  const handleNewPassword = (values) => {
    setIsLoading(true);

    dispatch(newPassword(values))
      .then(() => {
        setIsLoading(false);
        Swal.fire({
          title: "Password Updated Successfully",
          icon: "success",
          draggable: true,
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/signin");
          }
        });
      })
      .catch((err) => console.log(err));
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleNewPassword,
  });

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <div className="md:w-2/3 lg:w-1/2 mx-auto h-[50vh] flex items-center my-4 rounded-md p-4">
      <Helmet>
        <title>Forget Password</title>
      </Helmet>
      <AnimatePresence>
        <motion.div
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 200, opacity: 0 }}
          transition={{ duration: 2 }}
          className={styles.formContainer}
        >
          {/* <p className={styles.title}>
          <img src={image} alt="logo image" />
        </p> */}

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
                htmlFor="newPassword"
                className="block mb-2 text-sm ps-2 font-medium text-gray-900 dark:text-white"
              >
                Your Password
              </label>

              <div className="relative">
                <RiLockPasswordFill className="absolute top-3 left-2 text-green-500 text-lg" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="newPassword"
                  className="input-style px-7"
                  placeholder="Password"
                  name="newPassword"
                  onChange={formik.handleChange}
                  value={formik.values.newPassword}
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

              {formik.touched.newPassword && formik.errors.newPassword && (
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
                      {formik.errors.newPassword}
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
                className="CartBtn disabled:cursor-not-allowed"
                type="submit"
                disabled={!formik.isValid || !formik.dirty}
              >
                <span className="IconContainer">
                  <CiLogin className="text-white text-lg me-2" />
                </span>
                <p className="text">Log In</p>
              </button>
            )}
          </form>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
