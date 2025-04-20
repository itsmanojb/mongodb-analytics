import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppContextProvider } from "./AppContext.tsx";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </StrictMode>
);
