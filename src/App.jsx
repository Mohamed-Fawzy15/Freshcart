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
// import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import { Offline } from "react-detect-offline";
import { CiWifiOff } from "react-icons/ci";
import CartContextProvider from "./Context/CartContext/CartContext";
import { Toaster } from "react-hot-toast";
import Checkout from "./Pages/Checkout/Checkout";
import ForgetPassword from "./Pages/ForgetPassword/ForgetPassword";
import ResetCode from "./Pages/ResetCode/ResetCode";

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
        // {
        //   path: "productdetails/:productId",
        //   element: (
        //     <ProtectedRoutes>
        //       <ProductDetails />
        //     </ProtectedRoutes>
        //   ),
        // },
        {
          path: "forgetpassword",
          element: <ForgetPassword />,
        },
        {
          path: "resetcode",
          element: <ResetCode />,
        },
        { path: "register", element: <Register /> },
        { path: "signin", element: <SignIn /> },
        { path: "categories", element: <Categories /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  return (
    <TokenContextProvider>
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
    </TokenContextProvider>
  );
}

export default App;
