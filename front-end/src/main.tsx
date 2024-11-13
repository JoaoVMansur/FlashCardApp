import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { userStore } from "./Redux/store/userStore.ts";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider store={userStore}>
    <App />
  </Provider>
);
