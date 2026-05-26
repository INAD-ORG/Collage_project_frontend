import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

// import "./styles/global.scss";
import { HelmetProvider } from "react-helmet-async";
import "./styles/index.css"


export const baseUrl = import.meta.env.VITE_BASE_URL;


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
);
