// import { useContext } from "react";
// import styles from "./Home.module.css";
// import { CounterContext } from "../../Context/CounterContext/CounterContext";
import LatestProducts from "../../Component/LatestProducts/LatestProducts";

export default function Home() {
  // const { counter, setCounter } = useContext(CounterContext);
  return (
    <div>
      {/* Home {counter}
      <div>
        <button
          className="btn-main m-3"
          onClick={() => setCounter((prevCounter) => prevCounter + 1)}
        >
          Change
        </button>
      </div> */}

      <LatestProducts />
    </div>
  );
}
