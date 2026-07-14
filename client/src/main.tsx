import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Toaster } from "react-hot-toast";

import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>

    <App />

    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        duration: 3000,

        style: {
          borderRadius: "12px",
          background: "#1e293b",
          color: "#fff",
          fontSize: "15px",
        },

        success: {
          style: {
            background: "#16a34a",
            color: "#fff",
          },
        },

        error: {
          style: {
            background: "#dc2626",
            color: "#fff",
          },
        },
      }}
    />

  </StrictMode>
);