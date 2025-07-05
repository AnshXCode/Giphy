import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import { HiEllipsisVertical, HiMiniBars3BottomRight } from "react-icons/hi2";
import { useGifContext } from "../context/GifContext";
import SearchGif from "./SearchGif";

function Header() {

  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);
  const { gf, favorites } = useGifContext();

  const fetchGifCategories = async () => {
    const { data } = await gf.categories();
    setCategories(data);
  }

  useEffect(() => {
    fetchGifCategories();
  }, [fetchGifCategories])


  return (
    <nav className="relative">
      <div className=" relative flex gap-4 justify-between items-center mb-2">
        <Link to="/" className="flex gap-2">
          <img src={logo} alt="logo.jpg"
            className="w-8"
          />
          <h1 className=" text-5xl tracking-tight font-bold cursor-pointer">
            GIPHY
          </h1>
        </Link>
        <div className="font-bold text-md flex gap-2 items-center">
          {
            categories.slice(0, 4).map((category) => {
              return (
                <Link to={`${category.name_encoded}`}
                  className="hover:gradient border-b-4 px-4 py-1
                                    transition ease-in-out hidden lg:block"
                  key={category.name}
                >
                  {category.name}
                </Link>
              )
            })
          }
          <Link className=" px-4 py-1 hover:gradient border-b-4 hidden lg:block">
            Reactions
          </Link>
          <button
            onMouseEnter={() => setShowCategories(true)}
            onMouseLeave={() => setShowCategories(false)}
          >
            <HiEllipsisVertical
              size={35}
              className={`py-0.5 hover:gradient
                    border-b-4 hidden lg:block transition ease-in-out
                    ${showCategories ? "gradient" : ""}
                    `}
            />
          </button>
          {favorites.length > 0 &&
            <Link to="/favorites">
              <div className="h-9 bg-gray-700 pt-1.5 px-6 cursor-pointer rounded">
                Favorite GIFS
              </div></Link>}

          <button>
            <HiMiniBars3BottomRight
              size={30}
              className="text-sky-400 block lg:hidden"
            />
          </button>
        </div>

      </div>
      <div
        className={`absolute top-12 left-0 right-0 z-20 transition-all duration-300 ease-in-out
    ${showCategories ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"}
  `}
        onMouseEnter={() => setShowCategories(true)}
        onMouseLeave={() => setShowCategories(false)}
      >
        <div className="gradient p-7 rounded-md">
          <span className="text-3xl font-extrabold">Categories</span>
          <hr className="bg-gray-100 opacity-50 my-5" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {categories.map((category, i) => (
              <div key={i}>
                <Link
                  to={`${category.name_encoded}`}
                  className="transition ease-in-out font-bold"
                  onClick={() => setShowCategories(false)}
                >
                  {category.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <SearchGif />
    </nav>
  )
}

export default Header