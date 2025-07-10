import React, { useEffect, useState } from "react";
import { useGifContext } from "../context/GifContext";
import Gif from "../components/Gif";

function Favorites() {

  const { gf, favorites } = useGifContext();
  const [favGifs, setFavGifs] = useState([]);


  const fetchFavorites = async() => {
    console.log(favorites)
    const res = await Promise.all(favorites.map((id) => {
      return gf.gif(id);
    }));

    let result = res.map((res) => res.data);
    setFavGifs(result);

  }


  useEffect(() => {
    fetchFavorites();
  }, [favorites]);


  return (
    <div className="columns-1 sm:columns-2 md:columns-3 xl:columns-4 mt-4">
      {
        favGifs.map((gif) => <Gif gif={gif} key={gif.id}/>)
      }
    </div>
  )
}

export default Favorites