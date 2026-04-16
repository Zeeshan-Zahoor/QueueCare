import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './app/router'
import './index.css'
import "@fontsource/inter";
import { LocationProvider } from './contexts/LocationContext'
import SmoothScroll from './components/SmoothScroll.jsx';

createRoot(document.getElementById('root')).render(
  <SmoothScroll>
    <LocationProvider>
      <RouterProvider router={router} />
    </LocationProvider>
  </SmoothScroll>
)
