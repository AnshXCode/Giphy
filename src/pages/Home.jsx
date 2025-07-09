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
  const mount = useRef(true);

  const fetchTrendingGIFs = useCallback(async () => {

    try
    {
      if (loading || !hasMore) return;
      setLoading(true);
      const { data } = await gf.trending({
        limit: ITEMS_PER_FETCH,
        type: filter,
        rating: "g",
        offset: offset
      });
      if (data.length < 10)
      {
        setHasMore(false);
      }
      setGifs(prev => [...prev, ...data]);
    } catch (error)
    {
      console.log(error);
    } finally
    {
      setLoading(false);
    }

  }, [loading, hasMore, offset, filter])


  useEffect(() => {
    if (mount.current)
    {
      mount.current = false;
      return;
    }

    fetchTrendingGIFs();
  }, [offset, filter]);


  useEffect(() => {
    setGifs([]);
    setOffset(0);
    setHasMore(true);
  }, [filter])

  useEffect(() => {
    const handleWindowScroll = () => {
      const { innerHeight, scrollY } = window;
      const { scrollHeight } = document.body;

      if (innerHeight + scrollY >= scrollHeight - 100 && !loading)
      {
        setOffset(prev => prev + ITEMS_PER_FETCH);
      }
    };

    window.addEventListener('scroll', handleWindowScroll);
    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, [loading]);

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