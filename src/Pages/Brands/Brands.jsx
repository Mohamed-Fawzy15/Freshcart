import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import styles from "./Brands.module.css";
import { useSelector } from "react-redux";

export default function Brands() {
  const brands = useSelector((state) => state.brands.brands);
  console.log(brands);

  return (
    <div className="dark:bg-[#111827]">
      <Helmet>
        <title>Products</title>
      </Helmet>

      <div className="bg-[url('assets/banner-4.jpeg')] bg-cover bg-right-bottom h-[400px] flex flex-col px-8 justify-center text-white">
        <div className="container">
          <h1 className="font-bold text-4xl">
            Discover what brand do you want
          </h1>
          <p className="my-4 font-semibold">Hot Deals! Up to 60% Off</p>
        </div>
      </div>

      <div className="container">
        <h2 className="capitalize text-3xl font-bold my-10 flex gap-5 items-center justify-center ">
          <div className="header"></div>
          <p className="dark:text-white"> shop By Brands</p>
        </h2>

        <div className="row gap-5 py-5">
          {brands.data.length > 0 ? (
            brands.data.map((brand) => (
              <Link to={"/"} className="p-4 mx-auto" key={brand._id}>
                <div className={styles.card}>
                  <div className={styles.overlay} />
                  <div className={styles.circle}>
                    <img src={brand.image} className="w-full" alt="" />
                  </div>
                  <p className="font-semibold text-2xl">{brand.name}</p>
                </div>
              </Link>
            ))
          ) : (
            <loader />
          )}
        </div>
      </div>
    </div>
  );
}
