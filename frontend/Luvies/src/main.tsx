import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

//Import pages
import { HomePage } from './pages/HomePage'

//Import Router
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
