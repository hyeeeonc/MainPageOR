import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "../node_modules/react-router-dom/index";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import rootReducer, { rootSaga } from "./modules/index";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

function loadUser() {
  const token = localStorage.getItem("RefreshToken");
  try {
    if (!token) {
      localStorage.clear();
      return;
    } else {
      const tokenPayload = JSON.parse(decodeURIComponent(escape(atob(token.split(".")[1]))));
      const currentTime = Math.floor(Date.now() / 1000);
      if (currentTime > tokenPayload.exp) {
        localStorage.clear();
        return;
      }
      return;
    }
  } catch (e) {
    console.log("localStorage is not working");
  }
}

sagaMiddleware.run(rootSaga);
loadUser();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
