import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "stream-chat-react/dist/css/v2/index.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap (if needed)
import "./index.css";

import App from "./App.jsx";

// Create React Query client
 const queryClient = new QueryClient();

// Render the app
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
