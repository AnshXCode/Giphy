import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import { GifProvider } from "./context/context";
import Layout from './layout/Layout';
import Category from './pages/category';
import Home from './pages/home';

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
