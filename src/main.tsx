import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import './index.css'
import { queryClient } from './utils/react-query/queryClient'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
