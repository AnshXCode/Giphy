import React, { useEffect } from 'react'
import { useParams } from "react-router-dom";
import { useGifContext } from "../context/GifContext";

const contentType = ["gifs", "stickers", "texts"];

function SingleGif() {

    const { type, slug } = useParams();
    const { gf } = useGifContext();
    const [relatedGifs, setRelatedGifs] = useState([]);
    const [gif, setGif] = useState({});

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
        </div>
    )
}

export default SingleGif