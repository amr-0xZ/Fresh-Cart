# Fresh-Cart

Fresh-Cart is a polished React + Vite e‑commerce UI starter built to showcase frontend engineering skills. It demonstrates real-world features such as product listing, product details, cart & wishlist flows, authentication, protected routes, server-state caching, localization (English & Arabic), and user-friendly notifications.

**Live demo:** (replace with your demo URL if available)

## **Features**
- **Product catalog:** Paginated product listing, search, brand/category filters.
- **Product details:** Full product information, ratings, reviews and add-to-cart / add-to-wishlist actions.
- **Shopping cart:** Add, update quantity, remove items, and proceed to order creation.
- **Wishlist:** Save products to a personal wishlist and move to cart.
- **Authentication:** Signup, login and a forget-password flow with verification code and reset.
- **Protected routes:** Authenticated areas (profile, orders) are protected using a wrapper route.
- **Orders & profile:** View orders, order details and manage saved addresses.
- **Localization (i18n):** English and Arabic translations with keys in `src/locales` and `react-i18next` integration.
- **Toasts & UX:** User-friendly notifications using `react-toastify` and consistent UI elements with Bootstrap.

## **Tech Stack & Tools**
- **Framework:** React (Vite) — fast development and HMR.
- **Routing:** `react-router-dom` with `createBrowserRouter` and nested routes.
- **State & Data:** React Contexts (`AuthContext`, `CartContext`) + `@tanstack/react-query` for server-state and caching.
- **HTTP client:** `axios` for API communication.
- **Forms & validation:** `formik` and `yup`.
- **Localization:** `react-i18next` + `i18next` + `i18next-browser-languagedetector`.
- **Styling:** `bootstrap` and custom CSS (`src/index.css` / `src/App.css`).
- **Notifications:** `react-toastify`.
- **Icons:** Font Awesome (`@fortawesome/fontawesome-free`).

Dependencies are listed in `package.json`.

## **Files & Structure (high level)**
- `src/App.jsx` — Router and routes definition
- `src/main.jsx` — App bootstrap (providers, CSS, defensive runtime guard)
- `src/Components/` — Feature components (home, products, productDetails, cart, wishlist, auth flows, orders, profile, etc.)
- `src/Contexts/` — `AuthContext.jsx`, `CartContext.jsx`
- `src/locales/en.json` & `src/locales/ar.json` — translation resources
- `src/i18n/` (if present) — i18n initializer

## **Getting started (developer)**
1. Clone the repo and install dependencies:

```bash
git clone <repo-url>
cd Fresh-Cart
npm install
```

2. Start the dev server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

4. Preview production build:

```bash
npm run preview
```

## **Environment & API**
- The project uses a third-party demo API for products (see code for exact endpoints under `axios` calls). Replace the API base URL or proxy requests to your backend for a production deployment.

