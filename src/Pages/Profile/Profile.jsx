import { Helmet } from "react-helmet";
import { Link, Outlet } from "react-router-dom";
import { FaAddressCard, FaUser } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { TiShoppingCart } from "react-icons/ti";
// import { useSelector } from "react-redux";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userName = user ? user.name : "";
  // const userName = useSelector((state) => state.auth.userName);

  return (
    <div>
      <Helmet>
        <title>Profile</title>
      </Helmet>

      <div className="bg-[url('assets/banner-4.jpeg')] bg-cover bg-right-bottom h-[200px] flex flex-col px-8 justify-center text-white ">
        <div className="container ">
          <div className="flex flex-col items-center justify-center">
            <div className="bg-white w-24 h-24 flex items-center justify-center rounded-full dark:bg-[#374151]">
              <FaUser className="text-green-600 text-4xl" />
            </div>
            <h1 className="font-bold text-4xl">{userName}</h1>
          </div>
        </div>
      </div>

      <div className="container my-4">
        <div className="row ">
          <div className=" w-full lg:w-1/4 p-2">
            <div className="w-full rounded-lg shadow-lg lg:border-2 ">
              <ul className="flex items-center justify-between w-full text-center p-5 lg:flex-col">
                <li>
                  <Link
                    to={""}
                    className="text-xl font-semibold lg:border-b-2 lg:pb-5 flex justify-center items-center gap-2 dark:text-white"
                  >
                    <MdAccountCircle className="text-2xl" />
                    Account
                  </Link>
                </li>
                <li className="my-5">
                  <Link
                    to={"address"}
                    className="text-xl font-semibold lg:border-b-2 lg:pb-5 flex justify-center items-center gap-2 dark:text-white"
                  >
                    <FaAddressCard className="text-2xl" />
                    Address
                  </Link>
                </li>
                <li>
                  <Link
                    to={"orders"}
                    className="text-xl font-semibold flex justify-center items-center gap-2 dark:text-white"
                  >
                    <TiShoppingCart className="text-2xl" />
                    Orders
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="w-full lg:w-3/4 p-2 ">
            <div className=" rounded-lg shadow-lg border-2">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
