import { createRoot } from 'react-dom/client'
import './styles/index.css'
import './styles/tailwindloader.css'
import './styles/fontloader.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <App />
)
