//Import react
import React from "react"
import ReactDOM from "react-dom/client"
//Import component
import App from "./app.jsx";
//Import styles
import "../styles/style.scss";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
    <App/>
);