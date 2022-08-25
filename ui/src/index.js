import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import environment from "./environment";

ReactDOM.render(
    <BrowserRouter basename={environment.basename}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </BrowserRouter>,
    document.getElementById("root")
);

