import { useEffect, useState } from "react";
import styles from "./CategorySilder.module.css";
import { useDispatch } from "react-redux";
import { getCategories } from "../../Redux/Categories/CategoriesSlice";

export default function CategorySilder() {
  const [categories, setCategories] = useState([]);

  const disptach = useDispatch();

  const getData = async () => {
    await disptach(getCategories())
      .then((res) => {
        setCategories(res.payload.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container my-14">
      <h2 className="capitalize text-3xl font-bold my-10 flex gap-5 items-center justify-center ">
        <div className="header"></div>
        <p className="dark:text-white"> shop popular category</p>
      </h2>

      <div className="row gap-5 items-center justify-center ">
        {categories.slice(0, 3).map((category) => (
          <div
            key={category._id}
            className={`${styles.card} shadow-lg rounded-lg overflow-hidden  `}
            style={{ "--category-name": `"${category.name}"` }}
          >
            <img
              src={category.image}
              className="w-full h-full "
              alt={category.name}
            />
            <h4 className="m-3 font-semibold">{category.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}
