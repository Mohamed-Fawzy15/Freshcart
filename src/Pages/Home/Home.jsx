// import { useContext } from "react";
// import styles from "./Home.module.css";
// import { CounterContext } from "../../Context/CounterContext/CounterContext";
import CategorySilder from "../../Component/CategorySilder/CategorySilder";
import LatestProducts from "../../Component/LatestProducts/LatestProducts";
import MainSlider from "../../Component/MainSlider/MainSlider";

export default function Home() {
  // const { counter, setCounter } = useContext(CounterContext);
  return (
    <div>
      <MainSlider />
      <CategorySilder />
      <LatestProducts />
    </div>
  );
}
