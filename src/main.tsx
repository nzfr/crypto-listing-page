import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import './index.css'
import {QueryClientProvider} from "react-query";
import {queryClient} from "./utils/react-query/queryClient.ts";
import {ReactQueryDevtools} from "react-query/devtools";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <BrowserRouter>
          <QueryClientProvider client={queryClient}>
              <ReactQueryDevtools/>
              <App/>
          </QueryClientProvider>
      </BrowserRouter>
  </React.StrictMode>,
)
