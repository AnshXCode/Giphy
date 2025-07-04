import {useEffect} from "react";
import { useGifContext } from "../context/GifContext";
import Gif from "../components/Gif";
import FilterGif from "../components/FilterGif";

function Home() {

  const {gf, gifs, setGifs, filter} = useGifContext();

  const fetchTrendingGIFs = async() => {
    const {data} = await gf.trending({
      limit: 20,
      type:filter,
      rating: "g"
    });
    setGifs(data);
  }


  useEffect(() => {
    fetchTrendingGIFs();
  
    return () => {
    }
  }, [filter])
  

  return (
    <div>
      <img src="/banner.gif" alt="earth banner" className="mt-2 rounded w-full" />
      <FilterGif showTrending/>
      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2">
        {gifs.map((gif) => {
          return <Gif gif={gif} key={gif.title}/> 
        })}
      </div>
    </div>
  )
}

export default Home;