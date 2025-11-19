# Fresh-Cart

Fresh-Cart is a React (Vite) e‑commerce UI template focused on clarity and developer experience. It provides product listing, product details, cart & wishlist, authentication flows and basic protected routing — useful as a starter for small storefronts or UI demos.

## Features

- Product listing with data fetched from an API
- Product details page
- Shopping cart: add / remove / update items (context-driven)
- Wishlist page
- Authentication: signup & login
- Protected routes for authenticated areas
- Reusable layouts: MainLayout (authenticated) and AuthLayout (public)
- Global state using React Contexts (AuthContext, CartContext)
- React Query for server state & caching
- Toast notifications with react-toastify
- Responsive UI using Bootstrap

## Tech stack

- React + Vite
- React Router v6+ (createBrowserRouter / RouterProvider)
- @tanstack/react-query (v5+)
- Axios for API requests
- Bootstrap 5
- react-toastify
- react-spinners
- Font Awesome (CSS or react-fontawesome)

## Quick start

From the project root (Windows):

1. Install dependencies

```bash
npm install
```

2. Run dev server

```bash
npm run dev
```

3. Build for production

```bash
npm run build
```

4. Preview production build

```bash
npm run preview
```

See `package.json` for all available scripts.

## Project structure (important files / folders)

- src/
  - App.jsx — router setup and top-level providers
  - main.jsx — app bootstrap (React Query provider, CSS imports)
  - Components/
    - products/Products.jsx — product listing
    - productDetails/ProductDetails.jsx — product details page
    - cart/Cart.jsx
    - wishlist/WishList.jsx
    - login/Login.jsx, signup/Signup.jsx
    - protectedRoutes/ProtectedRoutes.jsx
  - Layouts/
    - MainLayout.jsx
    - AuthLayout.jsx
  - Contexts/
    - AuthContext.jsx
    - CartContext.jsx
  - index.css — global styles

## Routing notes

- MainLayout routes (protected) and AuthLayout routes (guest) are configured in `App.jsx`.
- Example routes:
  - `/` or `/home` — Home
  - `/products` — Products list
  - `/product/:id` — Product details (adjust depending on route nesting)
  - `/cart` — Cart
  - `/wishlist` — Wishlist
  - `/guest/login` or `/guest/signup` — Auth pages (depending on route base)

If ProductDetails does not render inside a parent page, ensure:

- The parent route renders an `<Outlet />` if ProductDetails is defined as a nested child.
- Or place the product details route as a sibling under the MainLayout to render at `/product/:id`.

## Environment / API

- This template fetches products from `https://ecommerce.routemisr.com/api/v1/products` (example). Replace endpoints with your backend or mock service as needed.
