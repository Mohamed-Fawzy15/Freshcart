import { Outlet } from "react-router-dom";
import NavBar from "../../Component/NavBar/NavBar";
import styles from "./Mainlayout.module.css";
import Footer from "../../Component/Footer/Footer";

export default function MainLayout() {
  return (
    <>
      <NavBar />
      <div className="container">
        <Outlet />
      </div>

      <Footer />
    </>
  );
}
