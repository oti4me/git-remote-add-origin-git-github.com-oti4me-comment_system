import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./viewLayer/components/App.tsx";
import { DatabaseProvider } from "./dataLayer/context/DatabaseProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DatabaseProvider>
      <App />
    </DatabaseProvider>
  </StrictMode>,
);
