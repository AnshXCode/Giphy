import { useEffect, useState, useRef, useCallback } from "react";
import { useGifContext } from "../context/GifContext";
import Gif from "../components/Gif";
import FilterGif from "../components/FilterGif";
import Loading from "../assets/loading.gif";

let ITEMS_PER_FETCH = 20

function Home() {

  const { gf, gifs, setGifs, filter } = useGifContext();
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const [filterChanged, setFilterChanged] = useState(false);
  const mount = useRef(true);
  const fetchingData = useRef(false);

  const fetchTrendingGIFs = useCallback(async() => {
    try {
      if (fetchingData.current || !hasMore) return;
      console.log(offset, "HERE-OFFSET");
      fetchingData.current = true;
      setLoading(true);
      const { data } = await gf.trending({
        limit: ITEMS_PER_FETCH,
        type: filter,
        rating: "g",
        offset: offset,
        _cacheBuster: Date.now()
      });
      if (data.length < 10) {
        setHasMore(false);
      }
      setGifs(prev => {
        console.log(prev, "PREV")
        return [...prev, ...data]
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      fetchingData.current=false;
    }

  }, [loading, hasMore, offset, filter])


  useEffect(() => {
    if (mount.current) {
      mount.current = false;
      return;
    }
    fetchTrendingGIFs();
  }, [offset, filterChanged]);

  const reset = async() => {
    setGifs([]);
    setOffset(0);
    setHasMore(true);
    setFilterChanged(!filterChanged)
  }

  useEffect(() => {
    reset();
  }, [filter]);

  console.log(offset, "Offset");

  useEffect(() => {
    const handleWindowScroll = () => {
      const { innerHeight, scrollY } = window;
      const { scrollHeight } = document.body;
      if (innerHeight + scrollY >= scrollHeight - 100 && !fetchingData.current) {
        setOffset(prev => prev + ITEMS_PER_FETCH);
      }
    };

    window.addEventListener("scroll", handleWindowScroll);
    return () => window.removeEventListener("scroll", handleWindowScroll);
  }, []);

  return (
    <div className="relative">
      <img src="/banner.gif" alt="earth banner" className="mt-2 rounded w-full" />
      <FilterGif showTrending />
      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2">
        {gifs.map((gif, id) => {
          return <Gif gif={gif} key={`${gif.id} + ${id}`} />
        })}
      </div>
      {loading &&
        <div className="text-center">
          <img src={Loading} alt="Loading" className="inline-block" />
        </div>
      }
      {
        !hasMore && <h1>No More results</h1>
      }
    </div>
  )
}

export default Home;