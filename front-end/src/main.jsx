import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AppProvider from "./data/AppProvider.jsx";
import { AnimatePresence } from "framer-motion";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProvider>
      <AnimatePresence>
        <App />
      </AnimatePresence>
    </AppProvider>
  </StrictMode>
);
