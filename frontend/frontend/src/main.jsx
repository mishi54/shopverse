import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import store from "./redux/store";
import { Provider } from "react-redux";
import { base_url } from "./utils/apiUrls";
import axios from "axios";
axios.defaults.baseURL = base_url;
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
