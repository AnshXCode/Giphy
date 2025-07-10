import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGifContext } from "../context/GifContext";
import FilterGif from "../components/FilterGif";
import Gif from "../components/Gif";


function Search() {

  const [searchResults, setSearchResults] = useState([]);

  const { gf, filter } = useGifContext();

  const { query } = useParams();

  const fetchSearchResults = async() => {
    const { data } = await gf.search(query, {
      sort: "relavent",
      lang: "en",
      type: filter,
      limit: 20,
    });
    setSearchResults(data);
  }

  useEffect(() => {
    fetchSearchResults();
  }, [filter, query])


  return (
    <div className="my-4">
      <h2 className="text-5xl pb-3 font-extrabold">{query}</h2>
      <FilterGif alignLeft={true} />
      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2">
        {
          searchResults.length > 0 &&
                    searchResults.map((gif) => {
                      return <Gif gif={gif} key={gif.id} />
                    })
        }
      </div>
      {
        searchResults.length === 0 &&
                <span>
                    No Gifs found for {query}, Try searching for Stickers instead
                </span>
      }
    </div>
  )
}

export default Search