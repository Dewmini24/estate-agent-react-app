import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'   // ✅ THIS LINE IS THE KEY
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/estate-agent-react-app">
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
