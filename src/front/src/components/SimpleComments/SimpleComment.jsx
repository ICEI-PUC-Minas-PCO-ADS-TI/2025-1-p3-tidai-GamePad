import React from "react";
import { Star } from "lucide-react";

const SimpleComment = ({
  cover,
  gameTitle,
  gameYear,
  userAvatar,
  userName,
  stars = 0,
  comment,
  likes = 0,
}) => {
  const renderStars = () => {
    const filled = Math.round(stars);
    return (
      <>
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16} // menor em mobile
            className="mr-0.5 md:w-5 md:h-5 w-4 h-4"
            color="#22d3ee"
            fill={i < filled ? "#22d3ee" : "none"}
          />
        ))}
      </>
    );
  };

  return (
    <div className="flex flex-row bg-zinc-900/80 rounded-2xl shadow-xl w-full max-w-4xl p-3 gap-3 md:rounded-3xl md:p-8 md:gap-8">
      {/* Capa do jogo */}
      <div className="flex-shrink-0">
        <img
          src={cover}
          alt="Capa do Jogo"
          className="w-24 h-32 md:w-40 md:h-56 object-cover rounded-xl md:rounded-2xl shadow-lg"
        />
      </div>
      {/* Informações à direita */}
      <div className="flex flex-col flex-1">
        {/* Nome do jogo e ano */}
        <div className="flex flex-row items-baseline gap-2 md:gap-4">
          <span className="text-base md:text-2xl font-bold text-white line-clamp-1">
            {gameTitle}
          </span>
          <span className="text-xs md:text-lg text-zinc-400">({gameYear})</span>
        </div>
        {/* Usuário, nome e estrelas */}
        <div className="flex flex-row items-center gap-2 md:gap-3 mt-2 md:mt-4">
          <img
            src={userAvatar}
            alt="Usuário"
            className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-zinc-700"
          />
          <span className="text-xs md:text-base text-zinc-200 font-medium line-clamp-1">
            {userName}
          </span>
          <div className="flex flex-row ml-1 md:ml-2">{renderStars()}</div>
        </div>
        {/* Comentário */}
        <div className="mt-3 md:mt-6 text-zinc-200 text-xs md:text-base line-clamp-4">
          {comment}
        </div>
        {/* Curtidas */}
        <div className="mt-2 md:mt-4 flex flex-row items-center gap-1 md:gap-2 text-zinc-400 text-xs md:text-sm">
          <svg
            width="16"
            height="16"
            className="md:w-[18px] md:h-[18px]"
            fill="#22d3ee"
            viewBox="0 0 24 24"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <span>{likes} curtidas</span>
        </div>
      </div>
    </div>
  );
};

export default SimpleComment;
