import { Link, NavLink, useNavigate } from "react-router-dom";
// import styles from "./NavBar.module.css";
import logo from "../../assets/logo.svg";
import { useContext, useEffect, useRef, useState } from "react";
import { tokenContext } from "../../Context/Token/TokenContext";
import { CartContext } from "../../Context/CartContext/CartContext";
import { MdFavorite, MdOutlineShoppingCart } from "react-icons/md";
import { ApiContext } from "../../Context/APi/ApiContext";
import { jwtDecode } from "jwt-decode";
import { FaUser, FaUserCircle } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { BiLogOutCircle } from "react-icons/bi";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { numOfCartItems } = useContext(CartContext);
  const { token, setToken } = useContext(tokenContext);
  const { wishlistItem } = useContext(ApiContext);
  const navigate = useNavigate();

  // decode the token
  let decoded = null;
  try {
    decoded = jwtDecode(token);
  } catch (error) {
    console.error("Invalid token", error);
  }
  const MySwal = withReactContent(Swal);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    MySwal.fire({
      title: "Are you sure you want to logout?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0aad0a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout it!",
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire({
          title: "logout successfully!",
          icon: "success",
        });
        setToken(null);
        navigate("/signin");
      }
    });
  };

  const handleNavbarMenu = () => {
    setIsOpen(!isOpen);
  };

  // dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-gray-200 border-gray-200 dark:bg-gray-900 sticky top-0 start-0 end-0 z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 lg:p-2">
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
            onClick={handleNavbarMenu}
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
        </div>

        {token && (
          <div
            className={`${
              isOpen ? "block" : "hidden"
            } w-full lg:block lg:w-auto lg:me-auto`}
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col p-4 mt-4 lg:flex-row  rtl:space-x-reverse md:mt-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <NavLink
                  to={"/"}
                  className="inline-block py-2 px-2 mx-1 linkHover text-gray-900   dark:text-white "
                  aria-current="page"
                >
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to={"products"}
                  className="inline-block py-2 px-2 mx-1 linkHover text-gray-900  dark:text-white "
                >
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"categories"}
                  className="inline-block py-2 px-2 mx-1 linkHover  text-gray-900 dark:text-white "
                >
                  Categories
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"brands"}
                  className="inline-block py-2 px-2 mx-1 linkHover  text-gray-900 dark:text-white "
                >
                  Brands
                </NavLink>
              </li>
            </ul>
          </div>
        )}

        <div
          className={`${isOpen ? "block" : "hidden"} w-full lg:block lg:w-auto`}
          id="navbar-default"
        >
          <div className="flex items-center justify-between gap-x-3">
            <ul className="font-medium flex items-center p-4 md:p-0 mt-4 md:space-x-8 rtl:space-x-reverse md:mt-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {token && (
                <>
                  <li>
                    <NavLink
                      to={"cart"}
                      className="block relative py-2 px- text-green-900  dark:text-white dark:hover:text-green-500"
                    >
                      <MdOutlineShoppingCart className="inline text-2xl" />
                      <span className="text-xs text-white absolute top-0 -right-2 w-5 h-5 bg-gray-500 rounded-full flex justify-center items-center">
                        {numOfCartItems}
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={"wishlist"}
                      className="block relative py-2  text-green-900  dark:text-white dark:hover:text-green-500"
                    >
                      <MdFavorite className="inline text-2xl" />
                      <span className="text-xs text-white absolute top-0 -right-2 w-5 h-5 bg-gray-500 rounded-full flex justify-center items-center">
                        {wishlistItem}
                      </span>
                    </NavLink>
                  </li>
                </>
              )}
            </ul>

            <ul className="font-medium flex p-4 md:p-0 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {!token && (
                <>
                  <li>
                    <Link
                      to={"register"}
                      className="block py-2 font-semibold px-3 text-gray-500 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Register
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"signin"}
                      className="block py-2 font-semibold px-3 text-gray-500 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Login
                    </Link>
                  </li>
                </>
              )}

              {token && (
                <li>
                  <div className="flex items-center justify-center ">
                    <div
                      className="relative inline-block text-left"
                      ref={dropdownRef}
                    >
                      <button
                        onClick={toggleDropdown}
                        className="inline-flex justify-center w-full px-2 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-green-500"
                      >
                        <FaUserCircle className="text-3xl text-green-500" />
                      </button>

                      {isDropdownOpen && (
                        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                          <div
                            className="py-2 p-2"
                            role="menu"
                            aria-orientation="vertical"
                          >
                            <Link
                              to={"profile"}
                              className="flex items-center gap-2 rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer"
                            >
                              <FaUser />
                              {decoded.name}
                            </Link>

                            <Link
                              to={""}
                              className="flex items-center gap-2 rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer"
                            >
                              <IoSettings />
                              Setting
                            </Link>

                            <hr />

                            <div
                              onClick={() => {
                                handleLogOut();
                              }}
                              className="flex items-center gap-2 rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer"
                            >
                              <BiLogOutCircle />
                              logOut
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
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
