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
import ProductDetails from "./Pages/ProductDetails/ProductDetails";

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
          path: "productdetails/:productId",
          element: (
            <ProtectedRoutes>
              <ProductDetails />
            </ProtectedRoutes>
          ),
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
      <CounterContextProvider>
        <RouterProvider router={routes}></RouterProvider>
      </CounterContextProvider>
    </TokenContextProvider>
  );
}

export default App;
