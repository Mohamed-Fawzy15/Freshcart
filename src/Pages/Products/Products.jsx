import { Helmet } from "react-helmet";
import LatestProducts from "../../Component/LatestProducts/LatestProducts";
import { FaSearch } from "react-icons/fa";
// import styles from "./Products.module.css";

export default function Products() {
  return (
    <div>
      <Helmet>
        <title>Products</title>
      </Helmet>
      <div className="container my-4">
        <div className="flex justify-between">
          <p>Sort by Category</p>

          <p>Sort by Brand</p>
        </div>
        <div className="flex justify-between">
          <div>
            <select
              name="categorySort"
              id="categorySort"
              className="rounded-lg mt-2"
            >
              <option value="mensFashion">Men&apos;s Fashion</option>
              <option value="womenFashion">Women&apos;s Fashion</option>
              <option value="electronics">Electronics</option>
            </select>
          </div>
          <div className="relative flex items-center border rounded-3xl border-green-600 ">
            <FaSearch className="inline" />
            <input
              type="text"
              placeholder="Search By Product Name or Brand"
              className="rounded-lg border-none p-0"
            />
          </div>

          <div>
            <select
              name="categorySort"
              id="categorySort"
              className="rounded-lg mt-2"
            >
              <option value="mensFashion">Men&apos;s Fashion</option>
              <option value="womenFashion">Women&apos;s Fashion</option>
              <option value="electronics">Electronics</option>
            </select>
          </div>
        </div>
      </div>

      <LatestProducts />
    </div>
  );
}
