import { Helmet } from "react-helmet";
import styles from "./Categories.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../../Component/Loader/Loader";

export default function Categories() {
  const naviagte = useNavigate();

  const categories = useSelector((state) => state.categories.categories);
  const isLoading = useSelector((state) => state.categories.isLoading);

  return (
    <div className="min-h-screen w-full dark:bg-[#111827]">
      <Helmet>
        <title>Categories</title>
      </Helmet>

      <div className="bg-[url('assets/banner-4.jpeg')] bg-cover bg-right-bottom h-[400px] flex flex-col px-8 justify-center text-white">
        <div className="container">
          <h1 className="font-bold text-4xl">Get What you want in FreshCart</h1>
          <p className="my-4 font-semibold">
            Discover the best deals, latest trends, and more.
          </p>
          <button
            className="animated-button  bg-black"
            onClick={() => naviagte("/products")}
          >
            <svg
              viewBox="0 0 24 24"
              className="arr-2"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
            </svg>
            <span className="text text-white">Shop Now</span>
            <span className="circle" />
            <svg
              viewBox="0 0 24 24"
              className="arr-1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="container">
        <h2 className="capitalize text-3xl font-bold my-10 flex gap-5 items-center justify-center ">
          <div className="header"></div>
          <p className="dark:text-white"> shop popular category</p>
        </h2>
        {!isLoading ? (
          <div className="row gap-3 justify-center ">
            {categories.data &&
              categories.data.map((category) => (
                <div className="p-4" key={category._id}>
                  <div
                    className={`${styles.card} shadow-lg rounded-lg overflow-hidden  `}
                    style={{ "--category-name": `"${category.name}"` }}
                  >
                    <img
                      src={category.image}
                      className="w-full h-full "
                      alt={category.name}
                    />
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}
