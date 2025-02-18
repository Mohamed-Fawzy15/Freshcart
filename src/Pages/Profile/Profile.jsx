import { jwtDecode } from "jwt-decode";
import { useContext } from "react";
import { Helmet } from "react-helmet";
import { Link, Outlet } from "react-router-dom";
import { tokenContext } from "../../Context/Token/TokenContext";
import { FaUser } from "react-icons/fa";

export default function Profile() {
  const { token } = useContext(tokenContext);

  let decoded = null;
  try {
    decoded = jwtDecode(token);
  } catch (error) {
    console.error("Invalid token", error);
  }
  return (
    <div>
      <Helmet>
        <title>Profile</title>
      </Helmet>

      <div className="bg-[url('assets/banner-4.jpeg')] bg-cover bg-right-bottom h-[200px] flex flex-col px-8 justify-center text-white ">
        <div className="container ">
          <div className="flex flex-col items-center justify-center">
            <div className="bg-white w-24 h-24 flex items-center justify-center rounded-full">
              <FaUser className="text-green-600 text-4xl" />
            </div>
            <h1 className="font-bold text-4xl">{decoded.name}</h1>
          </div>
        </div>
      </div>

      <div className="container my-4">
        <div className="row ">
          <div className="w-1/4 p-2">
            <div className=" bg-white rounded-lg shadow-lg">
              <ul className="text-center py-5">
                <li>
                  <Link
                    to={""}
                    className="text-xl font-semibold border-b-2 pb-5"
                  >
                    Account
                  </Link>
                </li>
                <li className="my-10">
                  <Link
                    to={"address"}
                    className="text-xl font-semibold border-b-2 pb-5"
                  >
                    Address
                  </Link>
                </li>
                <li>
                  <Link to={"orders"} className="text-xl font-semibold ">
                    Orders
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="w-3/4 p-2 ">
            <div className="bg-white rounded-lg shadow-lg">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
