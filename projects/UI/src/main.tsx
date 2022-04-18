import "./Styles/global.scss"

import React from "react"
import { BrowserRouter } from "react-router-dom"
import ReactDOM from "react-dom"
import { QueryClient, QueryClientProvider } from "react-query"

import App from "./App"

const client = new QueryClient()

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={client}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
)
