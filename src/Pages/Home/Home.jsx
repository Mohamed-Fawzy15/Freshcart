import { Helmet } from "react-helmet";
import CategorySilder from "../../Component/CategorySilder/CategorySilder";
import LatestProducts from "../../Component/LatestProducts/LatestProducts";
import MainSlider from "../../Component/MainSlider/MainSlider";


export default function Home() {
  return (
    <div>
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      <MainSlider />
      <CategorySilder />

      <div className="bg-[url('assets/banner-4.jpeg')] bg-cover bg-right-bottom h-[400px] flex flex-col px-8 justify-center text-white">
        <p>$30 discount for your first order</p>
        <h3 className="text-3xl font-semibold">
          top deals, latest trends, and more
        </h3>
        <span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, minus!
        </span>
        <button className="btn-main w-1/5">Shop Now</button>
      </div>
      <LatestProducts />
   
    </div>
  );
}
