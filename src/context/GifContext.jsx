import { GiphyFetch } from "@giphy/js-fetch-api";
import { createContext, useContext, useEffect, useState } from "react";
const GifContext = createContext();

export const GifProvider = ({ children }) => {

  const gf = new GiphyFetch(import.meta.env.VITE_GIPHY_KEY);

  const [gifs, setGifs] = useState([]);
  const [filter, setFilter] = useState("gifs");
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (id) => {
    let updatedFavorites;
    if (favorites.includes(id)) {
      updatedFavorites = favorites.filter(v => v !== id)
    } else {
      updatedFavorites = [...favorites, id];
    }
    setFavorites(updatedFavorites);
    // localStorage.setItem("favoriteGifs", JSON.stringify(updatedFavorites))
    console.log(updatedFavorites,"UF")
    return;
  }


  return <GifContext.Provider
    value={{ gf, gifs, setGifs, filter, setFilter, favorites, addToFavorites }}
  >{children}</GifContext.Provider>
}

export const useGifContext = () => {
  const result = useContext(GifContext);
  return result;
}

