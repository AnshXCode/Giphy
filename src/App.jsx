import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './layout/Layout'
import Home from './pages/home';
import Category from './pages/category';
import { GifProvider } from "./context/context";

function App() {


  const router = createBrowserRouter([
    {
      element: <Layout />,
      // errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/:category",
          element: <Category />
        }
      ]
    }
  ])



  return <GifProvider>
    <RouterProvider router={router} />
  </GifProvider>

}

export default App
