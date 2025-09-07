import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from "./store/auth.jsx"
import { ToastContainer, Flip } from 'react-toastify'   // Import Flip
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(        // 36.0
  <AuthProvider>
    <StrictMode>
      <App />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Flip}    // ✅ Use Flip directly
      />
    </StrictMode>
  </AuthProvider>
)
