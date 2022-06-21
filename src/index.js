/* eslint-disable react/jsx-filename-extension */
import React, { StrictMode, Suspense } from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import store from "./App/store/store"
import "./i18nextConf"

const rootElement = document.getElementById("root")
const root = createRoot(rootElement)

root.render(
  <StrictMode>
    <Suspense fallback="loading">
      <Provider store={store}>
        <App />
      </Provider>
    </Suspense>
  </StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
