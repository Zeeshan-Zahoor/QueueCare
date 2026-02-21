import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './app/router'
import './index.css'
import "@fontsource/inter";
import { QueueProvider } from './contexts/QueueContext'


createRoot(document.getElementById('root')).render(
  <QueueProvider>
    <RouterProvider router={router} />
  </QueueProvider>,
)
