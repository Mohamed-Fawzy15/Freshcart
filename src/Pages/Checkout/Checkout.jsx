import { useFormik } from "formik";
import { useContext } from "react";
import { Helmet } from "react-helmet";
import * as Yup from "yup";
import { CartContext } from "../../Context/CartContext/CartContext";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import styles from "./Checkout.module.css";
import image from "../../assets/logo.svg";
import { CgDetailsMore } from "react-icons/cg";
import { FaCity, FaPhoneAlt } from "react-icons/fa";
import { IoBagCheckOutline } from "react-icons/io5";

export default function Checkout() {
  const {
    cashOrder,
    setNumOfCartItems,
    setCartId,
    onlineOrder,
    clearCartItem,
  } = useContext(CartContext);
  const navigate = useNavigate();

  const { state } = useLocation();
  const initialValues = {
    details: "",
    phone: "",
    city: "",
  };

  const validationSchema = Yup.object({
    details: Yup.string().required(),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^[01][0-1-2-5][0-9]{9}$/, "Invalid Phone number"),
    city: Yup.string().required(),
  });

  const pay = async (values) => {
    if (state === "online") {
      let data = await onlineOrder({ shippingAddress: values });
      if (data.status === "success") {
        setNumOfCartItems(0);
        setCartId(null);
        window.location.href = data.session.url;
        clearCartItem();
      }
    } else {
      let data = await cashOrder({ shippingAddress: values });
      if (data.status === "success") {
        setNumOfCartItems(0);
        setCartId(null);
        navigate("/");
      }
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: pay,
  });
  return (
    <div className="h-screen justify-center items-center ">
      <Helmet>
        <title>Checkout</title>
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

        <form className={styles.form} onSubmit={formik.handleSubmit}>
          <div className="w-full">
            <label
              htmlFor="details"
              className="block mb-2 text-sm ps-2 font-medium text-gray-900 dark:text-white"
            >
              Your details
            </label>
            <div className="relative">
              <CgDetailsMore className="absolute top-3 left-2 text-green-500 text-lg" />

              <input
                type="details"
                id="details"
                name="details"
                className="input-style"
                placeholder="Enter Your details"
                onChange={formik.handleChange}
                value={formik.values.details}
                onBlur={formik.handleBlur}
              />
            </div>

            {formik.touched.details && formik.errors.details && (
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
                    {formik.errors.details}
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
              Your phone
            </label>

            <div className="relative">
              <FaPhoneAlt className="absolute top-3 left-2 text-green-500 text-lg" />
              <input
                type="phone"
                id="phone"
                name="phone"
                className="input-style"
                placeholder="Enter Your phone"
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
              htmlFor="city"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              City
            </label>

            <div className="relative">
              <FaCity className="absolute top-3 left-2 text-green-500 text-lg" />
              <input
                type="city"
                id="city"
                name="city"
                className="input-style"
                placeholder="Enter Your city"
                onChange={formik.handleChange}
                value={formik.values.city}
                onBlur={formik.handleBlur}
              />
            </div>

            {formik.touched.city && formik.errors.city && (
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
                    {formik.errors.city}
                  </p>
                </div>
              </div>
            )}
          </div>

          <button
            className="CartBtn"
            type="submit"
            disabled={!formik.isValid || !formik.dirty}
          >
            <span className="IconContainer">
              <IoBagCheckOutline className="text-white text-lg me-2" />
            </span>
            <p className="text">Checkout</p>
          </button>
        </form>
      </motion.div>
    </div>
  );
}
