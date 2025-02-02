import { Outlet } from "react-router-dom";
import NavBar from "../../Component/NavBar/NavBar";

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
