import { useFormik } from "formik";
import { useContext } from "react";
import { Helmet } from "react-helmet";
import * as Yup from "yup";
import { CartContext } from "../../Context/CartContext/CartContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const {
    cashOrder,
    setNumOfCartItems,
    setCartId,
    onlineOrder,
    clearCartItem,
  } = useContext(CartContext);
  //   const navigate = useNavigate();
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
    // let data = await cashOrder({ shippingAddress: values });
    // if (data.status === "success") {
    //   setNumOfCartItems(0);
    //   setCartId(null);
    //   navigate("/");
    // }

    let data = await onlineOrder({ shippingAddress: values });
    if (data.status === "success") {
      setNumOfCartItems(0);
      setCartId(null);
      window.location.href = data.session.url;
      clearCartItem();
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: pay,
  });
  return (
    <div>
      <Helmet>
        <title>Sign Up</title>
      </Helmet>

      <form onSubmit={formik.handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="detials"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Details
          </label>
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
          {formik.touched.details && formik.errors.details && (
            <p className="text-red-500">{formik.errors.details}</p>
          )}
        </div>

        <div className="mb-5">
          <label
            htmlFor="phone"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Phone
          </label>
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
          {formik.touched.phone && formik.errors.phone && (
            <p className="text-red-500">{formik.errors.phone}</p>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="city"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            City
          </label>
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
          {formik.touched.city && formik.errors.city && (
            <p className="text-red-500">{formik.errors.city}</p>
          )}
        </div>

        <button
          type="submit"
          className="btn-main"
          disabled={!formik.isValid || !formik.dirty}
        >
          Checkout
        </button>
      </form>
    </div>
  );
}
