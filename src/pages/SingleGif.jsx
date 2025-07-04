import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { useGifContext } from "../context/GifContext";
import Gif from "../components/Gif";

const contentType = ["gif", "stickers", "texts"];

function SingleGif() {

    const { type, slug } = useParams();
    const { gf } = useGifContext();
    const [relatedGifs, setRelatedGifs] = useState([]);
    const [gif, setGif] = useState({});
    const [readMore, setReadMore] = useState(false);


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
                        </>
                    )
                }
            </div>
            <div className="col-span-4 sm:col-span-3">
                <div className="flex gap-6">
                    <div className="w-full sm:w-3/4">
                        <div className="faded-text truncate mb-2">{gif.title}</div>
                        <Gif gif={gif} hover={false} />
                    </div>
                    favourite/share/embed
                </div>
            </div>

            <div>
                <span className="font-extrabold">
                    Related Gifs
                </span>
            </div>

        </div>
    )
}

export default SingleGif