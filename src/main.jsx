import React from "react";
import ReactDOM from "react-dom/client";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import userSlice from "./redux/userSlice";
import loadingSlice from "./redux/loadingSlice";
import App from "./App";
import "./index.css";

// Create the Redux store
export const store = configureStore({
  reducer: {
    userSlice: userSlice,
    loadingSlice: loadingSlice,
  },
});

// Check if root has already been created
const container = document.getElementById("root");
if (!container._reactRootContainer) {
  // Check to prevent multiple createRoot calls
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
} else {
  console.warn(
    "ReactDOM.createRoot() has already been called on this container."
  );
}
