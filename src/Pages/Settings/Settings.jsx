import { useFormik } from "formik";
import styles from "./Settings.module.css";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { FaCity, FaPhoneAlt } from "react-icons/fa";
import { CgDetailsMore } from "react-icons/cg";
import * as Yup from "yup";
import { ApiContext } from "../../Context/APi/ApiContext";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { RiLoader2Fill } from "react-icons/ri";
import { IoIosAddCircle } from "react-icons/io";

export default function Settings() {
  const [isLoading, setIsLoading] = useState(false);
  const { addAddress } = useContext(ApiContext);

  const MySwal = withReactContent(Swal);

  const initialValues = {
    name: "",
    details: "",
    phone: "",
    city: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is Required")
      .matches(/^[A-Z][a-z]*$/, "Invalid Name"),
    details: Yup.string().required(),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^[01][0-1-2-5][0-9]{9}$/, "Invalid Phone number"),
    city: Yup.string().required(),
  });

  const handleAddAddress = async (values) => {
    setIsLoading(true);
    const data = await addAddress(values);
    if (data.status === "success") {
      MySwal.fire({
        title: "Address add successfully",
        icon: "success",
        draggable: true,
      });
      setIsLoading(false);
    }
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleAddAddress,
  });
  return (
    <div className="container mx-auto">
      <section className="bg-white dark:bg-gray-900">
        <div className="flex justify-center min-h-screen">
          <div
            className="hidden bg-cover lg:block lg:w-2/5"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1494621930069-4fd4b2e24a11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80")',
            }}
          ></div>
          <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
            <div className="w-full">
              <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize dark:text-white">
                Add your Address
              </h1>
              <p className="mt-4 text-gray-500 dark:text-gray-400">
                Let’s get you all set up so you can add your new address
              </p>
              <div className="mt-6"></div>
              <form className={styles.form} onSubmit={formik.handleSubmit}>
                <div className="w-full">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm ps-2 font-medium text-gray-900 dark:text-white"
                  >
                    Your Name
                  </label>
                  <div className="relative">
                    <MdDriveFileRenameOutline className="absolute top-3 left-2 text-green-500 text-lg" />

                    <input
                      type="name"
                      id="name"
                      name="name"
                      className="input-style"
                      placeholder="Enter Your name"
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
                    htmlFor="details"
                    className="block mb-2 text-sm ps-2 font-medium text-gray-900 dark:text-white"
                  >
                    Your details
                  </label>
                  <div className="relative">
                    <CgDetailsMore className="absolute top-3 left-2 text-green-500 text-lg" />

                    <input
                      type="text"
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
                      <IoIosAddCircle className="text-white text-lg me-2" />
                    </span>
                    <p className="text">Add Address</p>
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
