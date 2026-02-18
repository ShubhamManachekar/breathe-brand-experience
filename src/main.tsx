import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initAnalytics } from "@/lib/analytics";

initAnalytics(import.meta.env.VITE_GA_MEASUREMENT_ID);

createRoot(document.getElementById("root")!).render(<App />);
