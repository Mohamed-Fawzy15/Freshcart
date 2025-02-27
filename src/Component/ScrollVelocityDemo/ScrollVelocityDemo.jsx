import ScrollVelocity from "../ScrollVelocity/ScrollVelocity"; // Adjust the import path based on your project structure
import { useContext, useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { ApiContext } from "../../Context/APi/ApiContext";

const velocity = [1, -1];

function ScrollVelocityDemo() {
  const [brands, setBrands] = useState([]);

  const { getBrands } = useContext(ApiContext);

  const getData = async () => {
    const data = await getBrands();
    setBrands(data.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-full">
      <div className="flex flex-col space-y-5 py-10">
        <h2 className="capitalize text-3xl font-bold my-10 flex gap-5 items-center justify-center ">
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

            {/* {images.map(({ title, thumbnail }) => (
              <div
                key={title}
                className="relative h-[6rem] w-[9rem] md:h-[8rem] md:w-[12rem] xl:h-[12rem] xl:w-[18rem]"
              >
                <img
                  src={thumbnail}
                  alt={title}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            ))} */}
          </ScrollVelocity>
        ))}
      </div>
    </div>
  );
}

export default ScrollVelocityDemo;
