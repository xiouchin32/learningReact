import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import LoginUseReducer from "./LoginUseReducerTypeScript";

import { AppProvider } from "./productcontext";
import Products from "./Products";
import ProductList from "./ProductList";

ReactDOM.render(
    <AppProvider>
        <Products />
        <ProductList />
    </AppProvider>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
