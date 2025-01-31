import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AppProvider from "./data/AppProvider.jsx";
import { AnimatePresence } from "framer-motion";
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <AppProvider>
        <AnimatePresence>
          <App />
        </AnimatePresence>
      </AppProvider>
    </HelmetProvider>
  </StrictMode>
);
