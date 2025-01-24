import { BsYoutube } from "react-icons/bs";
import { FaFacebook, FaTiktok } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "./NavBar.module.css";
import logo from "../../assets/logo.svg";
import { useContext, useState } from "react";
import { CounterContext } from "../../Context/CounterContext/CounterContext";
import { tokenContext } from "../../Context/Token/TokenContext";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { counter } = useContext(CounterContext);
  const { token, setToken } = useContext(tokenContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/signin");
  };

  const handleNavbarMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="bg-gray-200 border-gray-200 dark:bg-gray-900 sticky top-0 start-0 end-0">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center justify-between w-full lg:w-auto">
          <Link
            to={"/"}
            className="flex items-center space-x-3 rtl:space-x-reverse mx-2"
          >
            <img src={logo} className="h-8" alt="Freshcart Logo" />
          </Link>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
            onClick={() => handleNavbarMenu()}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          {token && (
            <div
              className="hidden w-full lg:block lg:w-auto"
              id="navbar-default"
            >
              <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <NavLink
                    to={"/"}
                    className="block py-2 px-3 rounded md:bg-transparent md:hover:text-green-700 md:p-0 dark:text-white md:dark:text-green-500"
                    aria-current="page"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"cart"}
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Cart {counter}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"products"}
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"categories"}
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Categories
                  </NavLink>
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className="hidden w-full lg:block lg:w-auto " id="navbar-default">
          <div className="flex items-center gap-x-3">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  to={"/www.facebook.com"}
                  className="block py-2 px-3 text-gray-900 rounded md:bg-transparent md:hover:text-green-700 md:p-0 dark:text-white md:dark:text-green-500"
                  aria-current="page"
                >
                  <FaFacebook />
                </Link>
              </li>
              <li>
                <Link
                  to={"/www.instagram.com"}
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  <RiInstagramFill />
                </Link>
              </li>
              <li>
                <Link
                  to={"/www.twitter.com"}
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  <FaSquareXTwitter />
                </Link>
              </li>
              <li>
                <Link
                  to={"/www.twitter.com"}
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  <FaTiktok />
                </Link>
              </li>
              <li>
                <Link
                  to={"www.youtube.com"}
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  <BsYoutube />
                </Link>
              </li>
            </ul>
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {!token && (
                <>
                  <li>
                    <Link
                      to={"register"}
                      className="block py-2 px-3 text-gray-500 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Register
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"signin"}
                      className="block py-2 px-3 text-gray-500 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Login
                    </Link>
                  </li>
                </>
              )}

              {token && (
                <li>
                  <div
                    onClick={() => {
                      handleLogOut();
                    }}
                    className=" cursor-pointer block py-2 px-3 text-gray-500 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Log Out
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className={isOpen ? "block lg:hidden " : "hidden"} id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {token && (
            <>
              <NavLink
                to={"/"}
                className="block py-2 px-3 rounded md:bg-transparent md:hover:text-green-700 md:p-0 dark:text-white md:dark:text-green-500"
                aria-current="page"
              >
                Home
              </NavLink>
              <NavLink
                to={"cart"}
                className="block py-2 px-3 rounded md:bg-transparent md:hover:text-green-700 md:p-0 dark:text-white md:dark:text-green-500"
              >
                Cart {counter}
              </NavLink>
              <NavLink
                to={"products"}
                className="block py-2 px-3 rounded md:bg-transparent md:hover:text-green-700 md:p-0 dark:text-white md:dark:text-green-500"
              >
                Products
              </NavLink>
              <NavLink
                to={"categories"}
                className="block py-2 px-3 rounded md:bg-transparent md:hover:text-green-700 md:p-0 dark:text-white md:dark:text-green-500"
              >
                Categories
              </NavLink>
            </>
          )}

          <div className="flex justify-between items-center">
            <ul className="font-medium flex  p-4 md:p-0 mt-4  rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  to={"/www.facebook.com"}
                  className="block py-2 px-3 text-gray-900 rounded md:bg-transparent md:hover:text-green-700 md:p-0 dark:text-white md:dark:text-green-500"
                  aria-current="page"
                >
                  <FaFacebook />
                </Link>
              </li>
              <li>
                <Link
                  to={"/www.instagram.com"}
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  <RiInstagramFill />
                </Link>
              </li>
              <li>
                <Link
                  to={"/www.twitter.com"}
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  <FaSquareXTwitter />
                </Link>
              </li>
              <li>
                <Link
                  to={"/www.twitter.com"}
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  <FaTiktok />
                </Link>
              </li>
              <li>
                <Link
                  to={"www.youtube.com"}
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  <BsYoutube />
                </Link>
              </li>
            </ul>
            <ul className="font-medium flex  p-4 md:p-0 mt-4 rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {!token && (
                <>
                  <li>
                    <Link
                      to={"register"}
                      className="block py-2 px-3 text-gray-500 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Register
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"signin"}
                      className="block py-2 px-3 text-gray-500 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Login
                    </Link>
                  </li>
                </>
              )}

              {token && (
                <li>
                  <div
                    onClick={() => {
                      handleLogOut();
                    }}
                    className="cursor-pointer block py-2 px-3 text-gray-500 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Log Out
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
