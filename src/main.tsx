import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom/client";

// import the QueryClient and QueryClientProvider
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// import the ReactQueryDevtools to help debug the queries in the browser
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routing/routes";

// Create a new instance of QueryClient
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* Wrap the App component with QueryClientProvider */}
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);
