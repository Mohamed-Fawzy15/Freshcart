import { useContext, useEffect, useState } from "react";
import styles from "./CategorySilder.module.css";
import { ApiContext } from "../../Context/APi/ApiContext";

export default function CategorySilder() {
  const [categories, setCategories] = useState([]);
  const { getCategories } = useContext(ApiContext);

  const getData = async () => {
    const data = await getCategories();
    setCategories(data.data);
  };


  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container my-14">
      <h2 className="capitalize text-3xl font-bold my-10 flex gap-5 items-center justify-center ">
        <div className="header"></div>
        <p> shop popular category</p>
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
