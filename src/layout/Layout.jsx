import { Outlet } from "react-router-dom";
import Header from "../components/Header";

function Layout() {
  return (
    <div className="bg-gray-950 text-white min-h-screen p-4">
      <Header className='container px-6 py-4 mx-auto' />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout