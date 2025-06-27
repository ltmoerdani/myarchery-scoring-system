import React from "react"
import ReactDOM from "react-dom"
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

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.Fragment>
        <HelmetProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </HelmetProvider>
      </React.Fragment>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
)

serviceWorker.unregister()
