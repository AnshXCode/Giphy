import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { useGifContext } from "../context/GifContext";
import Gif from "../components/Gif";
import FollowOn from "../components/FollowOn";

function Category() {

  const [results, setResults] = useState([]);
  const { category } = useParams();
  const { gf } = useGifContext();

  const fetchResults = async() => {
    const { data } = await gf.gifs(category, category);
    setResults(data);
  };

  useEffect(() => {
    fetchResults();
  }, [category])


  return (
    <div className="flex md:flex-row gap-2 my-4">
      <div className="sm:w-72">
        {
          results.length > 0 &&
          <Gif gif={results[0]} hover={false} />
        }
        <span className="text-gray-400 text-sm pt-2">
          Don&apos;t tell it to me, GIF it to me!
        </span>
        <FollowOn />
        <div className="divider" />
      </div>
      <div className="flex-1">
        <h2 className="text-4xl pb-1 font-extrabold capitalize"
        >{category} GIFs</h2>
        <h2 className="text-lg pb-1 font-extrabold capitalize my-3 hover:text-yellow-300"
        >@{category}</h2>
        {
          results.length > 0 && (
            <div className="columns-2 md:columns-3
            lg:columns-4 gap-2
            ">
              {
                results.slice(1).map((gif) => (
                  <Gif gif={gif} key={gif.id} />
                ))
              }
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Category