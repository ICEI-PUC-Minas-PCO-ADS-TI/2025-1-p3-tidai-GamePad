import { useState } from "react";
import SimpleComment from "../SimpleComments/SimpleComment";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

const CommentSlider = ({ comments }) => {
  const [current, setCurrent] = useState(0);

  const handlePrev = () =>
    setCurrent((prev) =>
      prev === 0
        ? comments.length - 2 + (comments.length % 2 === 0 ? 0 : 1)
        : prev - 2
    );
  const handleNext = () =>
    setCurrent((prev) => (prev + 2 >= comments.length ? 0 : prev + 2));

  const getVisibleComments = () => {
    if (comments.length <= 2) return comments;
    const first = comments[current];
    const second = comments[(current + 1) % comments.length];
    return [first, second];
  };

  const visibleComments = getVisibleComments();

  return (
    <div className="w-full flex flex-col items-center relative">
      <div className="relative w-full flex items-center justify-center">
        {/* Botão anterior */}
        <button
          onClick={handlePrev}
          className="absolute left-0 z-10 bg-zinc-800/60 text-white rounded-full p-2 transition-all duration-200 cursor-pointer"
          aria-label="Anterior"
          style={{ top: "50%", transform: "translateY(-50%)" }}
        >
          <ChevronLeft size={24} />
        </button>
        {/* Comentários lado a lado, visual simples */}
        <div className="flex flex-col md:flex-row gap-4 w-full justify-center transition-all duration-300">
          {visibleComments.map((comment, idx) => {
            // Tenta pegar o id do jogo do comentário
            const igdbGameId =
              comment.IgdbGameId ||
              comment.igdbGameId ||
              comment.igdbgameid ||
              comment.IGDBGameId;
            return (
              <Link
                key={idx}
                to={igdbGameId ? `/games/${igdbGameId}` : "#"}
                className="w-full md:w-1/2 hover:scale-[1.02] transition-transform duration-200"
                style={{ textDecoration: "none" }}
              >
                <SimpleComment {...comment} />
              </Link>
            );
          })}
        </div>
        {/* Botão próximo */}
        <button
          onClick={handleNext}
          className="absolute right-0 z-10 bg-zinc-800/60 text-white rounded-full p-2 transition-all duration-200 cursor-pointer"
          aria-label="Próximo"
          style={{ top: "50%", transform: "translateY(-50%)" }}
        >
          <ChevronRight size={24} />
        </button>
      </div>
      <div className="flex gap-1 mt-3">
        {Array.from({ length: Math.ceil(comments.length / 2) }).map(
          (_, idx) => (
            <span
              key={idx}
              className={`h-1.5 w-4 rounded-full transition-all duration-300 ${
                idx * 2 === current ? "bg-cyan-400" : "bg-zinc-600"
              }`}
              style={{ display: "inline-block" }}
            />
          )
        )}
      </div>
    </div>
  );
};

export default CommentSlider;
