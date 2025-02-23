import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Mainlayout from "./Pages/Mainlayout/MainLayout";
import Home from "./Pages/Home/Home";
import Cart from "./Pages/Cart/Cart";
import Products from "./Pages/Products/Products";
import Register from "./Pages/Register/Register";
import SignIn from "./Pages/SignIn/SignIn";
import NotFound from "./Pages/NotFound/NotFound";
import Categories from "./Pages/Categories/Categories";
import CounterContextProvider from "./Context/CounterContext/CounterContext";
import TokenContextProvider from "./Context/Token/TokenContext";
import ProtectedRoutes from "./Component/ProtectedRoutes/ProtectedRoutes";
import { Offline } from "react-detect-offline";
import { CiWifiOff } from "react-icons/ci";
import CartContextProvider from "./Context/CartContext/CartContext";
import { Toaster } from "react-hot-toast";
import Checkout from "./Pages/Checkout/Checkout";
import ForgetPassword from "./Pages/ForgetPassword/ForgetPassword";
import ResetCode from "./Pages/ResetCode/ResetCode";
import NewPassword from "./Pages/NewPassword/NewPassword";
import Brands from "./Pages/Brands/Brands";
import ApiContextProvider from "./Context/APi/ApiContext";
import Wishlist from "./Pages/Wishlist/Wishlist";
import Profile from "./Pages/Profile/Profile";
import Account from "./Component/Account/Account";
import Address from "./Component/Address/Address";
import Orders from "./Component/Orders/Orders";
import Settings from "./Pages/Settings/Settings";
import WishlistContextProvider from "./Context/APi/WishlistContext";
import SetNewPassword from "./Pages/SetNewPassword/SetNewPassword";
import "flowbite";

function App() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <Mainlayout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoutes>
              <Cart />
            </ProtectedRoutes>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoutes>
              <Products />
            </ProtectedRoutes>
          ),
        },
        {
          path: "checkout",
          element: (
            <ProtectedRoutes>
              <Checkout />
            </ProtectedRoutes>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoutes>
              <Brands />
            </ProtectedRoutes>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRoutes>
              <Wishlist />
            </ProtectedRoutes>
          ),
        },
        {
          path: "profile",
          element: (
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
          ),
          children: [
            { index: true, element: <Account /> },
            { path: "address", element: <Address /> },
            { path: "orders", element: <Orders /> },
          ],
        },
        {
          path: "settings",
          element: (
            <ProtectedRoutes>
              <Settings />
            </ProtectedRoutes>
          ),
        },
        // {
        //   path: "productdetails/:productId",
        //   element: (
        //     <ProtectedRoutes>
        //       <ProductDetails />
        //     </ProtectedRoutes>
        //   ),
        // },
        {
          path: "setnewpassword",
          element: <SetNewPassword />,
          children: [
            { index: true, element: <ForgetPassword /> },
            {
              path: "resetcode",
              element: <ResetCode />,
            },
            {
              path: "newpassword",
              element: <NewPassword />,
            },
          ],
        },

        { path: "register", element: <Register /> },
        { path: "signin", element: <SignIn /> },
        {
          path: "categories",
          element: (
            <ProtectedRoutes>
              <Categories />
            </ProtectedRoutes>
          ),
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  return (
    <TokenContextProvider>
      <ApiContextProvider>
        <WishlistContextProvider>
          <CartContextProvider>
            <CounterContextProvider>
              <Toaster position="bottom-right" />
              <Offline>
                <div className="offline fixed bottom-2 right-4 z-50 bg-red-700 text-white p-2 rounded-md">
                  <CiWifiOff className="inline mx-2 text-2xl " />
                  You are now offline
                </div>
              </Offline>

              <RouterProvider router={routes}></RouterProvider>
            </CounterContextProvider>
          </CartContextProvider>
        </WishlistContextProvider>
      </ApiContextProvider>
    </TokenContextProvider>
  );
}

export default App;
