import ScrollVelocity from "../ScrollVelocity/ScrollVelocity";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { useDispatch } from "react-redux";
import { getBrands } from "../../Redux/Brands/BrandsSlice";

const velocity = [1, -1];

function ScrollVelocityDemo() {
  const [brands, setBrands] = useState([]);

  const dispatch = useDispatch();

  const getData = async () => {
    await dispatch(getBrands())
      .then((res) => {
        setBrands(res.payload.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-full">
      <div className="flex flex-col space-y-5 py-10">
        <h2 className="capitalize text-3xl font-bold my-10 flex gap-5 items-center justify-center dark:text-white ">
          <div className="header"></div>
          <p>Our Brands</p>
        </h2>
        {velocity.map((v, index) => (
          <ScrollVelocity key={index} velocity={v}>
            {brands.length > 0 ? (
              brands.map((img) => (
                <div key={img._id} className="relative h-[6rem] w-[9rem]">
                  <img
                    src={img.image}
                    alt={img.name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              ))
            ) : (
              <Loader />
            )}
          </ScrollVelocity>
        ))}
      </div>
    </div>
  );
}

export default ScrollVelocityDemo;
