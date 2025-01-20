import { useFormik } from "formik";
import { Link } from "react-router-dom";

// import styles from "./SignIn.module.css";
export default function SignIn() {
  const initialValues = {
    email: "",
    password: "",
  };

  const handleLogin = (values) => {
    console.log(values);
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleLogin,
  });
  return (
    <section className="md:w-2/3 lg:w-1/2 mx-auto bg-gray-100  my-4 rounded-md shadow p-4">
      <h1 className="text-3xl font-semibold my-3 text-center">Login Now</h1>
      <form onSubmit={formik.handleSubmit}>
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
        <button type="submit" className="btn-main">
          Log In
        </button>
        <small>
          don&apos;t have account{" "}
          <Link to={"/register"} className="text-blue-500 underline">
            SignUp
          </Link>
        </small>
      </form>
    </section>
  );
}
