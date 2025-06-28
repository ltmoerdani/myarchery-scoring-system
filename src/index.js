import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { persistStore } from "redux-persist"
import { PersistGate } from "redux-persist/integration/react"
import { HelmetProvider } from "react-helmet-async"
import App from "./App"
import "./i18n"
import * as serviceWorker from "./serviceWorker"
import { store } from "./store"

let persistor = persistStore(store)

const container = document.getElementById("root")
const root = createRoot(container)
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <HelmetProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HelmetProvider>
    </PersistGate>
  </Provider>
)

serviceWorker.unregister()
