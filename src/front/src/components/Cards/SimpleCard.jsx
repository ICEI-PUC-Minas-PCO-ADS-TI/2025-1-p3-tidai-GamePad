import React from "react";
import { Heart, Star } from "lucide-react";

export default function SimpleCard({
  src,
  alt,
  className = "",
  likes = 123,
  stars = 45,
  ...props
}) {
  return (
    <div
      className={`rounded shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-105 bg-zinc-800 group relative ${className}`}
      {...props}
    >
      <img
        src={src}
        alt={alt}
        className="object-cover w-full h-full transition-all duration-300 group-hover:blur-sm group-hover:brightness-50"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="flex flex-col items-center">
          <Heart
            size={32}
            color="#ff007f"
            fill="#ff007f"
            className="drop-shadow-lg"
          />
          <span className="text-white text-base mt-1">{likes}</span>
        </div>
        <div className="flex flex-col items-center">
          <Star
            size={32}
            color="#ffd700"
            fill="#ffd700"
            className="drop-shadow-lg"
          />
          <span className="text-white text-base mt-1">{stars}</span>
        </div>
      </div>
    </div>
  );
}
