import Slider from "react-slick/lib/slider";
import img1 from "../../assets/image-slider1.jpg";
import img2 from "../../assets/image-slider2.jpg";
import img3 from "../../assets/image-slider3.jpg";
import { motion } from "framer-motion";

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide: 0,
  autoplay: true,
  autoplaySpeed: 2000,
  arrows: false,
};

export default function MainSlider() {
  return (
    <div>
      <div className="row items-center h-screen">
        <div className="w-full">
          <Slider {...settings}>
            <div className="relative">
              <img
                src={img1}
                className="w-full h-[100vh] rounded-lg"
                alt="slider image 1"
              />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white bg-black/60">
                <motion.h1
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 2 }}
                  className="text-4xl font-semibold"
                >
                  power up your world{" "}
                </motion.h1>
                <motion.h2
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 2.5 }}
                  className="text-3xl font-semibold my-4"
                >
                  with mega sale up to 25% off
                </motion.h2>
                <button className="animated-button">
                  <svg
                    viewBox="0 0 24 24"
                    className="arr-2"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                  </svg>
                  <span className="text text-white">Shop Now</span>
                  <span className="circle" />
                  <svg
                    viewBox="0 0 24 24"
                    className="arr-1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="relative">
              <img
                src={img2}
                className="w-full h-[100vh] rounded-lg"
                alt="slider image 1"
              />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white bg-black/60">
                <motion.h1
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 2 }}
                  className="text-4xl font-semibold"
                >
                  power up your world{" "}
                </motion.h1>
                <motion.h2
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 2.5 }}
                  className="text-3xl font-semibold my-4"
                >
                  with mega sale up to 25% off
                </motion.h2>
                <button className="animated-button">
                  <svg
                    viewBox="0 0 24 24"
                    className="arr-2"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                  </svg>
                  <span className="text text-white">Shop Now</span>
                  <span className="circle" />
                  <svg
                    viewBox="0 0 24 24"
                    className="arr-1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="relative">
              <img
                src={img3}
                className="w-full h-[100vh] rounded-lg"
                alt="slider image 1"
              />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white bg-black/60">
                <motion.h1
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 2 }}
                  className="text-4xl font-semibold"
                >
                  power up your world{" "}
                </motion.h1>
                <motion.h2
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 2.5 }}
                  className="text-3xl font-semibold my-4"
                >
                  with mega sale up to 25% off
                </motion.h2>
                <button className="animated-button">
                  <svg
                    viewBox="0 0 24 24"
                    className="arr-2"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                  </svg>
                  <span className="text text-white">Shop Now</span>
                  <span className="circle" />
                  <svg
                    viewBox="0 0 24 24"
                    className="arr-1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                  </svg>
                </button>
              </div>
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
}
