
// imports
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// import providers
import { LoadingProvider } from '@contexts/loading/loading.provider.tsx'


createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <LoadingProvider>

         <App />
      
      </LoadingProvider>
   </StrictMode>,
);