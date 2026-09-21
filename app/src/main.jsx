import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import JardinDeGabriela from './paginas/JardinDeGabriela'
import Admin from './paginas/Admin'
import './index.css'

// La ruta del panel vive en el .env: si alguien la cambia, no hace falta
// tocar el código. Ella nunca ve un enlace hacia ella.
const RUTA_ADMIN = import.meta.env.VITE_RUTA_ADMIN ?? 'jardinero-secreto'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<JardinDeGabriela />} />
        <Route path={`/${RUTA_ADMIN}`} element={<Admin />} />
        {/* Cualquier otra dirección lleva al jardín, nunca a un 404 feo. */}
        <Route path="*" element={<JardinDeGabriela />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
