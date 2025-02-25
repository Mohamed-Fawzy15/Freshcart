import { Helmet } from "react-helmet";
import { motion, AnimatePresence } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ResetCode.module.css";
import { MdOutlineLockReset } from "react-icons/md";
import { useRef } from "react";
import { PiLockKeyFill } from "react-icons/pi";
import { RiLoader2Fill } from "react-icons/ri";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { resetCode } from "../../Redux/Auth/AuthSlice";

export default function ResetCode() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const initialValues = {
    resetCode: ["", "", "", "", "", ""],
  };

  const validationSchema = Yup.object({
    resetCode: Yup.array()
      .of(Yup.number().required("Digit is required"))
      .length(6, "Reset code must be 6 digits"),
  });

  const handleResetCode = (values) => {
    setIsLoading(true);

    const code = values.resetCode.join("");

    dispatch(resetCode({ resetCode: code }))
      .then((res) => {
        if (res.payload.status === "Success") {
          navigate("/setnewpassword/newpassword");
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
        Swal.fire({
          icon: "error",
          text: "Wrong  code",
        });
      });

    // await axios
    //   .post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", {
    //     resetCode,
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //     if (res.data.status === "Success") {
    //       navigate("/newpassword");
    //       setIsLoading(false);
    //     }
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //     setIsLoading(false);
    //     Swal.fire({
    //       icon: "error",
    //       text: "Wrong  code",
    //     });
    //   });
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleResetCode,
  });

  const handleInputChange = (index, e) => {
    const value = e.target.value;

    const newResetCode = [...formik.values.resetCode];
    newResetCode[index] = value;
    formik.setFieldValue("resetCode", newResetCode);

    if (value && index < 5) {
      inputRefs[index + 1].current.focus();
    }
  };

  return (
    <div className="container flex justify-center items-center h-[50vh]">
      <Helmet>
        <title>Forget Password</title>
      </Helmet>
      <AnimatePresence>
        <motion.div
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -200, opacity: 0 }}
          transition={{ duration: 2 }}
          className={`${styles.formContainer} w-full md:w-1/2 lg:w-1/3`}
        >
          <h2 className="capitalize text-2xl font-semibold ">
            <MdOutlineLockReset className="inline me-2 text-4xl text-green-500" />
            Reset code sent to your email
          </h2>
          <form
            onSubmit={formik.handleSubmit}
            className="w-full flex gap-2 justify-center items-center flex-col my-4"
          >
            <div className="mb-5  ">
              <label
                htmlFor="resetCode"
                className="block my-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Enter The Code
              </label>
              <div className="flex gap-2 justify-center items-center">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <input
                    key={index}
                    type="tel"
                    id={`resetCode-${index}`}
                    name={`resetCode[${index}]`}
                    className="w-10  rounded-lg  text-center "
                    placeholder="-"
                    maxLength={1}
                    ref={inputRefs[index]}
                    onChange={(e) => handleInputChange(index, e)}
                    value={formik.values.resetCode[index]}
                    onBlur={formik.handleBlur}
                  />
                ))}
              </div>
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
                  <PiLockKeyFill className="text-white text-lg me-2" />
                </span>
                <p className="text">Send code</p>
              </button>
            )}
          </form>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
