import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ChakraProvider } from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="192673001849-bd4jc63dk02q9q8e14im2a3qrseoj2cf.apps.googleusercontent.com">
    <React.StrictMode>
      <Provider store={store}>
        <ChakraProvider>
          <ToastContainer
            position="top-left"
            autoClose={1500}
            hideProgressBar={false}
            closeOnClick={true}
            pauseOnHover={false}
            draggable={true}
            theme="dark"
          />
          <App />
        </ChakraProvider>
      </Provider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
