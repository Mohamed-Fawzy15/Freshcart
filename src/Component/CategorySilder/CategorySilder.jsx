import axios from "axios";
import { useEffect, useState } from "react";
import Slider from "react-slick";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 2,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
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
