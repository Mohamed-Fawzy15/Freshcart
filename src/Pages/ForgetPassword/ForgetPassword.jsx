import { Helmet } from "react-helmet";
import "./ForgetPassword.module.css";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./ForgetPassword.module.css";
import { RiLoader2Fill, RiLockPasswordFill } from "react-icons/ri";
import { IoSend } from "react-icons/io5";

export default function ForgetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const navigate = useNavigate();

  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().required("Email Is Required").email(),
  });

  const handleForgetPassword = async (values) => {
    setIsLoading(true);
    console.log(values);

    await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      )
      .then((res) => {
        console.log(res.data);
        if (res.data?.statusMsg === "success") {
          setIsExiting(true); // Trigger exit animation

          navigate("/setnewpassword/resetcode");
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
    <div className=" container flex justify-center items-center h-[50vh]">
      <Helmet>
        <title>Forget Password</title>
      </Helmet>

      <AnimatePresence>
        {!isExiting && (
          <motion.div
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 200, opacity: 0 }} // Exit animation
            transition={{ duration: 2 }}
            className={`${styles.formContainer} w-full md:w-1/2 lg:w-1/4`}
          >
            <h2 className="capitalize text-2xl font-semibold flex items-center">
              <RiLockPasswordFill className="inline me-2 text-3xl text-green-500" />
              forget your password
            </h2>
            <p className="my-4">
              Don&apos;t fret! Just type in your email and we will send you a
              code to reset your password!
            </p>
            <form
              className={`${styles.form} w-full`}
              onSubmit={formik.handleSubmit}
            >
              <div className="w-full">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm ps-2 font-medium text-gray-900 dark:text-white"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  className={styles.input}
                  placeholder="Email"
                  name="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                />
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
                    <IoSend className="text-white text-lg me-2" />
                  </span>
                  <p className="text">Send code</p>
                </button>
              )}
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
