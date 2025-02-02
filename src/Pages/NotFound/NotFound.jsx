// import styles from "./NotFound.module.css";
import img from "../../assets/error.svg";
export default function NotFound() {
  return (
    <div className="flex items-center justify-center">
      <img src={img} className="w-1/2" alt="error 404 not found" />
    </div>
  );
}
