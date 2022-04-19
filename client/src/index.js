// import React from "react";
// import ReactDOM from "react-dom";
import App from "./components/App";
import { GenreProvider } from "./components/GenreContext";
import { CurrentUserProvider } from "./components/CurrentUserContext";

import { createRoot } from "react-dom/client";
// import {MovieProvider} from "./components/MovieContext"
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <CurrentUserProvider>
    <GenreProvider>
      <App />
    </GenreProvider>
  </CurrentUserProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
