import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

let query = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={query}>
    <App />
    <ReactQueryDevtools />
  </QueryClientProvider>
);
