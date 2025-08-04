// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './styles/facebook-posts.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// (optionnel) Log mode dev
if (import.meta.env.DEV) {
  console.log("✅ Application lancée en mode développement");
}
