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

function App() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <Mainlayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "cart", element: <Cart /> },
        { path: "products", element: <Products /> },
        { path: "register", element: <Register /> },
        { path: "signin", element: <SignIn /> },
        { path: "categories", element: <Categories /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  return (
    <CounterContextProvider>
      <RouterProvider router={routes}></RouterProvider>
    </CounterContextProvider>
  );
}

export default App;
