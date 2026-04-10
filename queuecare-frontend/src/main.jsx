import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './app/router'
import './index.css'
import "@fontsource/inter";
import { LocationProvider } from './contexts/LocationContext'

createRoot(document.getElementById('root')).render(
  <LocationProvider>
      <RouterProvider router={router} />
  </LocationProvider>,
)
