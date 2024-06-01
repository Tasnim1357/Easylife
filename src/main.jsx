import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
 
  RouterProvider,
} from "react-router-dom";
import router from './Routes/Routes.jsx';
import AuthProvider from './Pages/Provider/AuthProvider.jsx';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <AuthProvider>
   <QueryClientProvider client={queryClient}>
   <ToastContainer />
   <RouterProvider router={router} />
    </QueryClientProvider>
   
    </AuthProvider>
  </React.StrictMode>,
)
