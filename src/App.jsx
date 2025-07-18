import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { GifProvider } from "./context/GifContext";
import Layout from "./layout/Layout";
import Category from "./pages/Category";
import Home from "./pages/Home";
import Search from "./pages/Search";
import SingleGif from "./pages/SingleGif";
import Favorites from "./pages/Favorites";

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
        },
        {
          path: "/search/:query",
          element: <Search />
        },
        {
          path: "/:type/:slug",
          element: <SingleGif />
        },
        {
          path:"/favorites",
          element: <Favorites />
        }
      ]
    }
  ])



  return <GifProvider>
    <RouterProvider router={router} />
  </GifProvider>

}

export default App
