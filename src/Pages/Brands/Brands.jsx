import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { FaLocationArrow } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "./Brands.module.css";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const getBrands = async () => {
    await axios
      .get("https://ecommerce.routemisr.com/api/v1/brands")
      .then((res) => setBrands(res.data.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <div>
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
          <p> shop By Brands</p>
        </h2>

        <div className="row gap-5">
          {brands.length > 0 ? (
            brands.map((brand) => (
              //   <div className="m-auto p-4" key={brand._id}>
              //     <div className="flex flex-col  max-w-sm shadow-md py-8 px-6 md:px-8 rounded-md">
              //       <div className="flex flex-col md:flex-row gap-6 md:gap-8">
              //         <img
              //           className="rounded-full border-4 border-gray-300 h-24 w-24 mx-auto"
              //           src={brand.image}
              //           alt
              //         />
              //         <div className="flex flex-col text-center md:text-left">
              //           <div className="font-semibold text-lg text-gray-800">
              //             {brand.name}
              //           </div>
              //           <div className="text-gray-500 mb-3 whitespace-nowrap">
              //             {brand.slug}
              //           </div>
              //           <Link className="flex items-center gap-2">
              //             <p>More</p>
              //             <FaLocationArrow className="" />
              //           </Link>
              //         </div>
              //       </div>
              //     </div>
              //   </div>

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
