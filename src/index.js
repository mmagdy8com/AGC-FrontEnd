import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/createContext";
import { SearchContextProvider } from "./contexts/SearchContext";
import { CartContextProvider } from "./contexts/CartContext";
import { WishlistContextProvider } from "./contexts/WishlistContext";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId="150445240792-gdrt4hnskk9j0gpq3baqvmugtthqbiui.apps.googleusercontent.com">
    <BrowserRouter>
      <CartProvider>
        <CartContextProvider>
          <WishlistContextProvider>
            <SearchContextProvider>
              <Toaster />
              <App />
            </SearchContextProvider>
          </WishlistContextProvider>
        </CartContextProvider>
      </CartProvider>
    </BrowserRouter>
  </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
