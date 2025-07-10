import { useState } from "react";
import { Link } from "react-router-dom";

function Gif({ gif, hover = true }) {

  const [loaded, setLoaded] = useState(false);

  // Get width and height from gif.images.fixed_width
  const width = parseInt(gif.images.fixed_width.width, 10);
  const height = parseInt(gif.images.fixed_width.height, 10);

  return (
    <Link to={`/${gif.type}/${gif.slug}`}>
      <div className="mb-2 relative cursor-pointer group w-full">
        <div
          className="w-full relative"
          style={{ paddingBottom: `${(height / width) * 100}%` }}
        >
          {!loaded && (
            <div className="absolute top-0 left-0 w-full h-full bg-red-500 animate-pulse rounded" />
          )}
          <img
            src={gif?.images?.fixed_width.webp}
            alt={gif?.title}
            onLoad={() => setLoaded(true)}
            className={`absolute top-0 left-0 w-full h-full object-cover rounded transition-all duration-300 ${loaded ? "block" : "hidden"}`}
          />
          {hover && (
            <div
              className="absolute top-0 left-0 right-0 bottom-0 rounded opacity-0 group-hover:opacity-100 bg-gradient-to-b from-transparent to-black font-bold flex items-end gap-2 p-2"
            >
              <img
                src={gif?.user?.avatar_url}
                alt={gif?.user?.display_name}
                className="h-8"
              />
              <span>{gif?.user?.display_name}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default Gif;