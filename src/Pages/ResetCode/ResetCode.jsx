import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";

export default function ResetCode() {
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    resetCode: ["", "", "", "", "", ""],
  };

  const validationSchema = Yup.object({
    resetCode: Yup.array()
      .of(Yup.number().required("Digit is required"))
      .length(6, "Reset code must be 6 digits"),
  });

  const handleResetCode = async (values) => {
    setIsLoading(true);

    const resetCode = values.resetCode.join("");

    await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", {
        resetCode,
      })
      .then((res) => {
        console.log(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleResetCode,
  });
  return (
    <div className="container flex justify-center items-center h-[90vh]">
      <Helmet>
        <title>Forget Password</title>
      </Helmet>

      <motion.div
        initial={{ y: -200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 2 }}
        className="rounded-lg bg-gray-100 p-10 shadow-lg border-2 border-green-400 w-1/3 "
      >
        <h2 className="capitalize text-2xl font-semibold">
          Reset code sent to your email
        </h2>
        <form
          onSubmit={formik.handleSubmit}
          className="w-full flex gap-2 justify-center items-center flex-col"
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
                  className="input-style text-center"
                  placeholder="0"
                  maxLength={1}
                  onChange={(e) => {
                    const value = e.target.value;
                    const newResetCode = [...formik.values.resetCode];
                    newResetCode[index] = value;
                    formik.setFieldValue("resetCode", newResetCode);
                  }}
                  value={formik.values.resetCode[index]}
                  onBlur={formik.handleBlur}
                />
              ))}
            </div>
          </div>

          {isLoading ? (
            <button className="btn-main">loading...</button>
          ) : (
            <button
              type="submit"
              className="btn-main mt-0"
              disabled={!formik.isValid || !formik.dirty}
            >
              Verify Code
            </button>
          )}
        </form>
      </motion.div>
    </div>
  );
}
