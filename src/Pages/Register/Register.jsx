import { useFormik } from "formik";
import { Link } from "react-router-dom";

// import styles from "./Register.module.css";
export default function Register() {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };

  const handleRegister = (values) => {
    // here we will call the axios
    console.log(values);
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleRegister,
  });
  return (
    <section className="md:w-2/3 lg:w-1/2 mx-auto bg-gray-100 my-4 rounded-md shadow p-4">
      <h1 className="text-3xl font-semibold my-3 text-center">Register Now</h1>

      <form onSubmit={formik.handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Name
          </label>
          <input
            type="name"
            id="name"
            name="name"
            className="input-style"
            placeholder="Enter Your Name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="input-style"
            placeholder="Enter Your Email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="phone"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="input-style"
            placeholder="Enter Your Phone"
            onChange={formik.handleChange}
            value={formik.values.phone}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="input-style"
            placeholder="Enter Your Password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="rePassword"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your rePassword
          </label>
          <input
            type="password"
            id="rePassword"
            name="rePassword"
            className="input-style"
            placeholder="Enter Your rePassword"
            onChange={formik.handleChange}
            value={formik.values.rePassword}
          />
        </div>

        <button type="submit" className="btn-main">
          Register
        </button>
        <small>
          Already have account{" "}
          <Link to={"/signin"} className="text-blue-500 underline">
            login
          </Link>
        </small>
      </form>
    </section>
  );
}
