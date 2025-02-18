import { AnimatePresence, motion } from "framer-motion";
import styles from "./EditModal.module.css";
import { FaPhoneAlt, FaSave } from "react-icons/fa";
import { MdDriveFileRenameOutline, MdEmail } from "react-icons/md";
import { useContext } from "react";
import { ApiContext } from "../../Context/APi/ApiContext";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function EditModal({ isOpen, setIsOpen }) {
  const { updateUserInfo } = useContext(ApiContext);

  const initialValues = {
    name: "",
    phone: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    phone: Yup.string()
      .matches(/^\+?[0-9]{1,4}?[-. ]?[0-9]{1,12}?$/, "Invalid phone number")
      .required("Phone number is required"),
  });

  const handleEditProfile = async (values) => {
    const data = await updateUserInfo(values);
    console.log(data);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleEditProfile,
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br bg-white text-black p-6 rounded-lg w-full max-w-4xl shadow-xl cursor-default relative overflow-hidden"
          >
            <form className={styles.form} onSubmit={formik.handleSubmit}>
              <div className="w-full">
                <label
                  htmlFor="neam"
                  className="block mb-2 text-sm ps-2 font-medium text-gray-900 dark:text-white"
                >
                  Your Name
                </label>
                <div className="relative">
                  <MdDriveFileRenameOutline className="absolute top-3 left-2 text-green-500 text-lg" />

                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="input-style"
                    placeholder="Enter Your new name"
                    onChange={formik.handleChange}
                    value={formik.values.details}
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

              {/* <div className="w-full">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Eamil
                </label>

                <div className="relative">
                  <MdEmail className="absolute top-3 left-2 text-green-500 text-lg" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="input-style"
                    placeholder="Enter Your new email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                    disabled
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
              </div> */}

              <button
                className="CartBtn"
                type="submit"
                disabled={!formik.isValid || !formik.dirty}
              >
                <span className="IconContainer">
                  <FaSave className="text-white text-lg me-2" />
                </span>
                <p className="text">Save Data</p>
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
