import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import MainLayout from "./Layouts/MainLayout";
import Home from "./Components/home/Home";
import Cart from "./Components/cart/Cart";
import Products from "./Components/products/Products";
import Categories from "./Components/categories/Categories";
import Brands from "./Components/brands/Brands";
import Wishlist from "./Components/wishlist/WishList";
import NotFound from "./Components/notfound/NotFound";
import AuthLayout from "./Layouts/AuthLayout";
import Login from "./Components/login/Login";
import Signup from "./Components/signup/Signup";

function App() {
  const routs = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "home", element: <Home /> },
        { path: "cart", element: <Cart /> },
        { path: "products", element: <Products /> },
        { path: "categories", element: <Categories /> },
        { path: "brands", element: <Brands /> },
        { path: "wishlist", element: <Wishlist /> },
        { path: "*", element: <NotFound /> },
      ],
    },
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        { path: "/login", element: <Login /> },
        { path: "/signup", element: <Signup /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={routs} />
      <ToastContainer />
    </>
  );
}

export default App;
