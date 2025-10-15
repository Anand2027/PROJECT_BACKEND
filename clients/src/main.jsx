import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from "./store/auth.jsx"
import { ToastContainer, Flip } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <StrictMode>
      <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
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
          transition={Flip}
        />
      </GoogleOAuthProvider>
    </StrictMode>
  </AuthProvider>
)
