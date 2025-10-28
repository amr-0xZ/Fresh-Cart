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
import ProtectedRoutes from "./Components/protectedRoutes/ProtectedRoutes";

function App() {
  const routs = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
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
          path: "home",
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
          path: "categories",
          element: (
            <ProtectedRoutes>
              <Categories />
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
          path: "*",
          element: (
            <ProtectedRoutes>
              <NotFound />
            </ProtectedRoutes>
          ),
        },
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
