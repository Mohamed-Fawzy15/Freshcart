import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Helmet } from "react-helmet";
// import styles from "./Categories.module.css";
// import Loader from "../../Component/Loader/Loader";

import { Timeline } from "../../Component/TimeLine/TimeLine";

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

  const data = categories.map((category) => ({
    title: category.name, // Assuming API returns category name
    content: (
      <div>
        <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
          {category.slug} {/* Adjust this based on actual API response */}
        </p>
        <div className="grid grid-cols-1 gap-4">
          {category.image && (
            <img
              src={category.image} // Assuming each category has an image URL
              alt={category.name}
              width={500}
              height={500}
              className="rounded-lg object-cover h- md:h- lg:h-full w-full shadow"
            />
          )}
        </div>
      </div>
    ),
  }));

  return (
    <div className="min-h-screen w-full">
      <Helmet>
        <title>Categories</title>
      </Helmet>
      <div className="relative top-0 left-0 w-full">
        <Timeline data={data} />
      </div>
    </div>
  );
}
