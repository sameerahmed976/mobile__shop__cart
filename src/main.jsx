import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.scss";
import AppContext from "./AppContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <AppContext>
    <App />
  </AppContext>
  // </React.StrictMode >
);
