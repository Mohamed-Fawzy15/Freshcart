import axios from "axios";
import { useEffect, useState } from "react";

export default function CategorySilder() {
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

  return (
    <div className="container my-14">
      <h2 className="capitalize text-3xl font-bold my-10 text-center">
        shop popular category
      </h2>

      <div className="flex gap-5 items-center justify-center ">
        {categories.slice(0, 3).map((category) => (
          <div
            key={category._id}
            className="shadow-lg rounded-lg overflow-hidden"
          >
            <img
              src={category.image}
              className="w-full h-[300px] "
              alt={category.name}
            />
            <h4 className="m-3 font-semibold">{category.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}
