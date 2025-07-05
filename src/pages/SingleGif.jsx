import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { useGifContext } from "../context/GifContext";
import Gif from "../components/Gif";
import { HiMiniChevronUp, HiMiniChevronDown } from "react-icons/hi2";
import FollowOn from "../components/FollowOn";
import { HiOutlineExternalLink } from "react-icons/hi";
import { FaHeart, FaPaperPlane } from "react-icons/fa";
import { IoCodeSharp } from "react-icons/io5";

const contentType = ["gif", "stickers", "texts"];

function SingleGif() {

  const { type, slug } = useParams();
  const { gf, favorites, addToFavorites } = useGifContext();
  const [relatedGifs, setRelatedGifs] = useState([]);
  const [gif, setGif] = useState({});
  const [readMore, setReadMore] = useState(false);

  const shareGif = () => {

  }

  const EmbedGif = () => {

  }


  const fetchGif = async () => {
    const gifId = slug.split("-");
    const { data } = await gf.gif(gifId.at(-1));
    const { data: related } = await gf.related(gifId.at(-1), {
      limit: 10
    });
    setGif(data);
    setRelatedGifs(related);
  }

  useEffect(() => {
    if (!contentType.includes(type))
    {
      throw new Error("Invalid Content  Type");
    };
    fetchGif();
  }, [type, slug])

  return (
    <div>
      <div className="grid grid-cols-4 my-10 gap-4">

        <div className="hidden sm:block">
          {
            gif?.user && (
              <>
                <div className="flex gap-1">
                  <img
                    src={gif?.user?.avatar_url}
                    alt={gif?.user?.display_name}
                    className="h-14"
                  />
                  <div className="px-2">
                    <div className="font-bold">{gif?.user?.display_name}</div>
                    <div className="faded-text">{gif?.user?.username}</div>
                    <div></div>
                  </div>
                </div>
                {
                  gif?.user?.description && (
                    <div className="py-4 whitespace-pre-line
                      text-sm text-gray-400">
                      {
                        (readMore || gif?.user?.description.length < 100) ?
                          gif?.user?.description :
                          gif?.user?.description.slice(0, 100) + "..."
                      }
                      {gif?.user?.description.length > 100 &&
                        <div onClick={() => setReadMore(prev => !prev)}>
                          {
                            readMore ?
                              <>
                                Read less <HiMiniChevronUp size={20} />
                              </> :
                              <>
                                Read More <HiMiniChevronDown size={20} />
                              </>
                          }
                        </div>
                      }
                      <FollowOn />
                      <div className="divider" />
                      {
                        gif?.source && (
                          <div>
                            <span className="faded-text">Source</span>
                            <div className="flex items-center text-sm font-bold gap-1">
                              <HiOutlineExternalLink size={25} />
                              <a href={gif.source} target="_blank" className="truncate" rel="noreferrer">
                                {gif.source}
                              </a>
                            </div>
                          </div>
                        )
                      }
                    </div>
                  )
                }
              </>
            )
          }
        </div>
        <div className="col-span-4 sm:col-span-3">
          <div className="flex gap-6">
            <div className="w-full sm:w-3/4">
              <div className="faded-text truncate mb-2">{gif.title}</div>
              <Gif gif={gif} hover={false} />
              <div className="flex sm:hidden gap-1">
                <img
                  src={gif?.user?.avatar_url}
                  alt={gif?.user?.display_name}
                  className="h-14"
                />
                <div className="px-2">
                  <div className="font-bold">{gif?.user?.display_name}</div>
                  <div className="faded-text">{gif?.user?.username}</div>
                </div>
                <button className="ml-auto" onClick={shareGif}>
                  <FaPaperPlane size={25} />
                </button>
              </div>
            </div>
            <div className="hidden sm:flex flex-col gap-5 mt-6">
              <button
                onClick={() => addToFavorites(gif.id)}
                className="flex gap-4"
              >
                <FaHeart
                  className={`${favorites.includes(gif.id) ? "text-red-500" : ""}`}
                  size={25}
                />
                Favorite
              </button>
              <button
                className="flex gap-4"
              >
                <FaPaperPlane size={22} />
                Share
              </button>
              <button
                className="flex gap-4"
              >
                <IoCodeSharp size={25} />
                Embed
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <span className="font-extrabold">
              Related Gifs
            </span>
            <div className="xl:columns-4 md:columns-3 sm:columns-2">
              {
                relatedGifs.map((gif) => {
                  return <Gif gif={gif} key={gif.id} />
                })
              }
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}

export default SingleGif