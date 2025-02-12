import { Helmet } from "react-helmet";
import CategorySilder from "../../Component/CategorySilder/CategorySilder";
import LatestProducts from "../../Component/LatestProducts/LatestProducts";
import MainSlider from "../../Component/MainSlider/MainSlider";
import ScrollVelocityDemo from "../../Component/ScrollVelocityDemo/ScrollVelocityDemo";

export default function Home() {
  return (
    <div>
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      <MainSlider />
      <CategorySilder />
      <div className="bg-[url('assets/banner-4.jpeg')] bg-fixed bg-cover bg-right-bottom h-[400px] flex flex-col px-8 justify-center text-white">
        <div className="container ">
          <p>$30 discount for your first order</p>
          <h3 className="text-3xl font-semibold">
            top deals, latest trends, and more
          </h3>
          <span className="block my-5">Hot Deals! Up to 60% Off</span>
          <button className="animated-button bg-black">
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
      <LatestProducts />
      <ScrollVelocityDemo />
    </div>
  );
}
