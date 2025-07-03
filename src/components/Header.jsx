import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/logo.svg";
import { HiEllipsisVertical, HiMiniBars3BottomRight } from "react-icons/hi2";
import { useGifContext } from "../context/context";
import Category from "../pages/category";

function Header() {

    const [categories, setCategories] = useState([]);
    const [showCategories, setShowCategories] = useState(false);
    const { gf, filter, setFilter, favorites } = useGifContext();

    const fetchGifCategories = async () => {
        const { data } = await gf.categories();
        setCategories(data);
    }

    useEffect(() => {
        fetchGifCategories();
    }, [])


    return (
        <nav>
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
                        categories.slice(0, 5).map((category) => {
                            return (
                                <Link to={`${category.name_encoded}`}
                                    className="hover:gradient border-b-4 px-4 py-1
                                    transition ease-in-out hidden lg:block
                                    "
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
                        onClick={() => setShowCategories(!showCategories)}
                    >
                        <HiEllipsisVertical
                            size={35}
                            className={`py-0.5 hover:gradient
                    border-b-4 hidden lg:block transition ease-in-out
                    ${showCategories ? "gradient" : ""}
                    `}
                        />
                    </button>
                    {favorites &&
                        <div className="h-9 bg-gray-700 pt-1.5 px-6 cursor-pointer rounded">
                            <Link to="/favorites">Favorite GIFS</Link>
                        </div>}

                    <button>
                        <HiMiniBars3BottomRight
                            size={30}
                            className="text-sky-400 block lg:hidden"
                        />
                    </button>
                </div>

            </div>
            {
                showCategories && <div
                    className="absolute right-0 top-14 px-10 pt-6 pb-9 w-full z-20"
                >
                    <div className=" gradient p-4 rounded-md">
                        <span className=" text-3xl font-extrabold">Categories</span>
                        <hr className=" bg-gray-100 opacity-50 my-5" />
                        <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                            {categories.length > 0 && categories.map((category, i) => {
                                return <div key={i}>
                                    <Link
                                        to={`${category.name_encoded}`}
                                        className=" transition ease-in-out font-bold"
                                        key={category.name}
                                        onClick={() => showCategories(false)}
                                    >{category.name}</Link>
                                </div>
                            })
                            }
                        </div>
                    </div>
                </div>
            }
            {/* <Search /> */}
        </nav>
    )
}

export default Header