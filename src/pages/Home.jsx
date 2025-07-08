import { useEffect, useState, useRef, useCallback } from "react";
import { useGifContext } from "../context/GifContext";
import Gif from "../components/Gif";
import FilterGif from "../components/FilterGif";

let ITEMS_PER_FETCH = 10

function Home() {

  const { gf, gifs, setGifs, filter } = useGifContext();
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const scrollRef = useRef(null);
  const [offset, setOffset] = useState(0);

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

  }, [loading, hasMore, offset])


  useEffect(() => {
    fetchTrendingGIFs();

    return () => {
    }
  }, [filter, offset]);

  const handleScroll = () => {
    let scrollRefInfo = scrollRef.current;
    let { clientHeight, scrollTop, scrollHeight } = scrollRefInfo;
    console.log(scrollHeight, scrollTop, clientHeight)

    if (scrollTop + clientHeight > scrollHeight - 100)
    {
      setOffset(prev => prev + ITEMS_PER_FETCH);
    }

  }

  // columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2 
  return (
    <div className="relative">
      <img src="/banner.gif" alt="earth banner" className="mt-2 rounded w-full" />
      <FilterGif showTrending />
      <div className="h-100 overflow-auto"
        onScroll={handleScroll}
        ref={scrollRef}
      >
        {gifs.map((gif, id) => {
          return <Gif gif={gif} key={`${gif.id} + ${id}`} />
        })}
      </div>
      {loading &&
        <div className="w-40 h-40 rounded-full
        bg-amber-300 absolute z-20 top-50 flex justify-center items-center
        ">Loading</div>
      }

      {
        !hasMore && <h1>No More results</h1>
      }
    </div>
  )
}

export default Home;