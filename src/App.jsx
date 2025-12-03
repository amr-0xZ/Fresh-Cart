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
import ProductDetails from "./Components/productDetails/ProductDetails";
import AuthContext from "./Contexts/AuthContext";
import CartContext from "./Contexts/CartContext";
import Order from "./Components/order/Order";

function App() {
  const routs = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes>
          <MainLayout />
        </ProtectedRoutes>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "home",
          element: <Home />,
        },
        {
          path: "cart",
          element: <Cart />,
        },
        {
          path: "products",
          element: <Products />,
        },
        {
          path: "categories",
          element: <Categories />,
        },
        {
          path: "brands",
          element: <Brands />,
        },
        {
          path: "wishlist",
          element: <Wishlist />,
        },
        { path: "product/:id", element: <ProductDetails /> },
        { path: "order/:id", element: <Order /> },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
    {
      path: "/guest",
      element: <AuthLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "home",
          element: <Home />,
        },
        {
          path: "products",
          element: <Products />,
        },
        {
          path: "categories",
          element: <Categories />,
        },
        {
          path: "brands",
          element: <Brands />,
        },
        { path: "product/:id", element: <ProductDetails /> },
        { path: "login", element: <Login /> },
        { path: "signup", element: <Signup /> },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);

  return (
    <>
      <AuthContext>
        <CartContext>
          <RouterProvider router={routs} />
        </CartContext>
      </AuthContext>
      <ToastContainer autoClose={2000} />
    </>
  );
}

export default App;
