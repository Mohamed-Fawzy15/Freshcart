import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Helmet } from "react-helmet";
// import styles from "./Categories.module.css";
import Loader from "../../Component/Loader/Loader";
export default function Categories() {
  const [categories, setCategories] = useState([]);

  const getCategory = async () => {
    await axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then((res) => setCategories(res.data.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getCategory();
  }, []);

  console.log(categories);

  return (
    <>
      <Helmet>
        <title>Categories</title>
      </Helmet>
      {categories.length ? (
        categories && (
          <div className="flex flex-col items-center justify-center my-4  ">
            <h1 className="my-4 text-3xl font-bold">Categories</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-3/4">
              <div className="grid gap-4">
                <div className="group/category rounded-lg overflow-hidden block relative shadow-lg">
                  <img
                    src={categories[0].image}
                    alt={categories[0].name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 flex justify-center items-center -translate-x-full group-hover/category:translate-x-0 duration-700 transition-all">
                    <p className="text-white text-3xl font-semibold">
                      {categories[0].name}
                    </p>
                  </div>
                </div>
                <div className="group/category rounded-lg overflow-hidden block relative shadow-lg">
                  <img
                    src={categories[1].image}
                    alt={categories[1].name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 flex justify-center items-center -translate-x-full group-hover/category:translate-x-0 duration-700 transition-all ">
                    <p className="text-white text-3xl font-semibold">
                      {categories[1].name}
                    </p>
                  </div>
                </div>
                <div className="group/category rounded-lg overflow-hidden block relative shadow-lg">
                  <img
                    src={categories[2].image}
                    alt={categories[2].name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 flex justify-center items-center -translate-x-full group-hover/category:translate-x-0 duration-700 transition-all opacity-0 group-hover/category:opacity-100">
                    <p className="text-white text-3xl font-semibold">
                      {categories[2].name}
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid gap-4">
                <div className="group/category rounded-lg overflow-hidden block relative shadow-lg">
                  <img
                    src={categories[3].image}
                    alt={categories[3].name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 flex justify-center items-center -translate-x-full group-hover/category:translate-x-0 duration-700 transition-all opacity-0 group-hover/category:opacity-100">
                    <p className="text-white text-3xl font-semibold">
                      {categories[3].name}
                    </p>
                  </div>
                </div>
                <div className="group/category rounded-lg overflow-hidden block relative shadow-lg">
                  <img
                    src={categories[4].image}
                    alt={categories[4].name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 flex justify-center items-center translate-x-full group-hover/category:translate-x-0 duration-700 transition-all opacity-0 group-hover/category:opacity-100">
                    <p className="text-white text-3xl font-semibold">
                      {categories[4].name}
                    </p>
                  </div>
                </div>
                <div className="group/category rounded-lg overflow-hidden block relative shadow-lg">
                  <img
                    src={categories[5].image}
                    alt={categories[5].name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 flex justify-center items-center -translate-x-full group-hover/category:translate-x-0 duration-700 transition-all opacity-0 group-hover/category:opacity-100">
                    <p className="text-white text-3xl font-semibold">
                      {categories[5].name}
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid gap-4">
                <div className="group/category rounded-lg overflow-hidden block relative shadow-lg">
                  <img
                    src={categories[6].image}
                    alt={categories[6].name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 flex justify-center items-center translate-x-full group-hover/category:translate-x-0 duration-700 transition-all opacity-0 group-hover/category:opacity-100">
                    <p className="text-white text-3xl font-semibold">
                      {categories[6].name}
                    </p>
                  </div>
                </div>
                <div className="group/category rounded-lg overflow-hidden block relative shadow-lg">
                  <img
                    src={categories[7].image}
                    alt={categories[7].name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 flex justify-center items-center translate-x-full group-hover/category:translate-x-0 duration-700 transition-all opacity-0 group-hover/category:opacity-100">
                    <p className="text-white text-3xl font-semibold">
                      {categories[7].name}
                    </p>
                  </div>
                </div>
                <div className="group/category rounded-lg overflow-hidden block relative shadow-lg">
                  <img
                    src={categories[8].image}
                    alt={categories[8].name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 flex justify-center items-center translate-x-full group-hover/category:translate-x-0 duration-700 transition-all opacity-0 group-hover/category:opacity-100">
                    <p className="text-white text-3xl font-semibold">
                      {categories[8].name}
                    </p>
                  </div>
                </div>
                <div className="group/category rounded-lg overflow-hidden block relative shadow-lg">
                  <img
                    src={categories[9].image}
                    alt={categories[9].name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 flex justify-center items-center translate-x-full group-hover/category:translate-x-0 duration-700 transition-all opacity-0 group-hover/category:opacity-100">
                    <p className="text-white text-3xl font-semibold">
                      {categories[9].name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      ) : (
        <Loader />
      )}
    </>
  );
}
