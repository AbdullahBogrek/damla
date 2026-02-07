import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { AuthProvider } from './contexts/auth-context'
import { FavoriteProvider } from './contexts/favorite-context'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <FavoriteProvider>
          <App />
        </FavoriteProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
