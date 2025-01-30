import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot from react-dom/client
import { Provider } from "react-redux";
import App from "./App";
import store from "./redux/store/store"; // Ensure the correct path to your store file
import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container); // Create the root using createRoot

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
);
