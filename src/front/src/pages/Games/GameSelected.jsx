import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GAMES } from "../../db/dbmock";
import {
  Star,
  Heart,
  Users,
  MessageCircle,
  Bookmark,
  ThumbsUp,
  List,
  CheckCircle,
  Hourglass,
  Trophy,
  Plus,
} from "lucide-react";

export default function GameSelected() {
  const { id } = useParams();
  const navigate = useNavigate();
  const game = GAMES.find((g) => String(g.id) === String(id));
  const [filter, setFilter] = useState("recent");

  if (!game) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-900 text-white">
        <h2 className="text-2xl font-bold mb-4">Jogo não encontrado</h2>
        <button
          className="bg-cyan-600 px-4 py-2 rounded-lg text-white font-bold"
          onClick={() => navigate(-1)}
        >
          Voltar
        </button>
      </div>
    );
  }

  const stats = {
    favorites: game.favorites || 0,
    played: game.played || 0,
    reviews: game.reviews || 0,
    wishlists: game.wishlists || 0,
    ratings: game.ratings || [10, 5, 15, 40, 80],
  };
  const comments = (game.comments || []).sort((a, b) =>
    filter === "recent"
      ? new Date(b.date) - new Date(a.date)
      : b.likes - a.likes
  );

  const renderStarsChart = () => (
    <div className="flex items-end gap-1 h-12">
      {stats.ratings.map((count, i) => (
        <div key={i} className="flex flex-col items-center">
          <div
            className="w-4 rounded-t bg-yellow-400"
            style={{
              height: `${(count / Math.max(...stats.ratings)) * 40 + 8}px`,
            }}
          ></div>
          <Star size={12} fill="#facc15" color="#facc15" />
        </div>
      ))}
    </div>
  );

  // Mock para awards (troféus)
  const awards = game.awards || [
    { name: "Game of the Year", year: 2022 },
    { name: "Best Soundtrack", year: 2022 },
  ];

  // Mock para status do usuário (exemplo)
  const [userStatus, setUserStatus] = useState(null); // "playing", "played", "wishlist"
  const [userStars, setUserStars] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-900">
      <header
        className="w-full flex justify-center items-end"
        style={{ minHeight: "400px" }}
      >
        <div className="relative w-full md:px-full">
          <img
            src={game.background || game.cover}
            alt="Header"
            className="mask-x-from-70% mask-x-to-90% mask-y-from-80% mask-y-to-90% w-full"
            style={{
              height: "600px",
              maxHeight: "600px",
              minHeight: "400px",
              objectFit: "cover",
              borderRadius: "1.5rem",
            }}
          />
          <div
            className="absolute flex flex-row items-end gap-10 md:gap-16 left-0 bottom-0  px-48  w-full z-10"
            style={{ maxWidth: "100%" }}
          >
            <img
              src={game.cover}
              alt={game.name}
              className="w-40 h-56 md:w-56 md:h-80 object-cover rounded-2xl shadow-2xl"
              style={{
                marginBottom: "1.5rem",
                boxShadow:
                  "0 8px 32px 0 rgba(0,0,0,0.45), 0 2px 8px 0 rgba(0,0,0,0.25)",
                border: "none",
                background: "none",
              }}
            />
            <div
              className="flex flex-col justify-end"
              style={{ marginBottom: "1.5rem" }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-2">
                {game.name}
              </h1>
              <span className="text-lg text-zinc-300 font-semibold mb-1">
                Lançamento: <span className="text-white">{game.year}</span>
              </span>
            </div>
          </div>
        </div>
      </header>
      {/* Seção de 3 colunas */}
      <section className="w-full flex flex-col items-center">
        <div className="w-full flex flex-col md:grid md:grid-cols-3 gap-4 px-0 md:px-48 mt-10">
          {/* Coluna 1: Interações e ratings */}
          <div className="flex flex-col gap-6 bg-zinc-800/90 rounded-2xl p-6 shadow-lg min-w-[260px] max-w-xs">
            {/* Avaliação por estrelas */}
            <div>
              <span className="text-zinc-300 font-semibold block mb-2">
                Sua avaliação:
              </span>
              <div className="flex items-center gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star
                    key={n}
                    size={28}
                    className="cursor-pointer"
                    color={userStars >= n ? "#facc15" : "#334155"}
                    fill={userStars >= n ? "#facc15" : "none"}
                    onClick={() => setUserStars(n)}
                  />
                ))}
              </div>
              {/* Linha horizontal após as estrelas */}
              <hr className="my-3 border-zinc-700" />
              {/* Botões de status em grid 2 colunas */}
              <div className="grid grid-cols-2 gap-2 mb-3">
                <button
                  className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm font-semibold transition ${
                    userStatus === "playing"
                      ? "bg-cyan-600 text-white"
                      : "bg-zinc-700 text-cyan-300 hover:bg-cyan-800"
                  }`}
                  onClick={() => setUserStatus("playing")}
                >
                  <Hourglass size={18} /> Jogando
                </button>
                <button
                  className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm font-semibold transition ${
                    userStatus === "played"
                      ? "bg-green-600 text-white"
                      : "bg-zinc-700 text-green-400 hover:bg-green-800"
                  }`}
                  onClick={() => setUserStatus("played")}
                >
                  <CheckCircle size={18} /> Zerado
                </button>
                <button
                  className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm font-semibold transition ${
                    userStatus === "wishlist"
                      ? "bg-fuchsia-600 text-white"
                      : "bg-zinc-700 text-fuchsia-400 hover:bg-fuchsia-800"
                  }`}
                  onClick={() => setUserStatus("wishlist")}
                >
                  <Bookmark size={18} /> Wishlist
                </button>
                <button
                  className="flex items-center gap-1 px-3 py-1 rounded-lg text-sm font-semibold bg-zinc-700 text-zinc-300 hover:bg-zinc-800"
                  title="Adicionar a uma lista (em breve)"
                  disabled
                >
                  <List size={18} /> Lista
                </button>
              </div>
              {/* Linha horizontal antes do botão de favoritar */}
              <hr className="my-3 border-zinc-700" />
              {/* Botão de favoritar centralizado */}
              <div className="flex justify-center">
                <button
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold mt-2 transition ${
                    isFavorited
                      ? "bg-pink-600 text-white"
                      : "bg-zinc-700 text-pink-400 hover:bg-pink-700"
                  }`}
                  onClick={() => setIsFavorited((v) => !v)}
                >
                  <Heart
                    size={20}
                    fill={isFavorited ? "#db2777" : "none"}
                    color="#db2777"
                  />
                  {isFavorited ? "Favoritado" : "Favoritar"}
                </button>
              </div>
            </div>
            {/* Ratings e estatísticas */}
            <div className="mt-6">
              {/* Linha horizontal acima da média */}
              <hr className="mb-4 border-zinc-700" />
              {/* Média destacada */}
              <div className="flex items-center gap-3 mb-6">
                <Star size={32} fill="#facc15" color="#facc15" />
                <span className="text-3xl font-bold text-yellow-300">
                  {game.rating}
                </span>
                <span className="text-zinc-400 text-base font-semibold">
                  Média dos usuários
                </span>
              </div>
              {/* Distribuição de avaliações */}
              <span className="text-zinc-400 font-semibold block mb-2 mt-4">
                Distribuição de avaliações:
              </span>
              <div className="mt-2 mb-2">{renderStarsChart()}</div>
              <div className="flex flex-col gap-2 mt-4">
                <div className="flex items-center gap-2 text-pink-400">
                  <Heart size={18} /> {stats.favorites} Favoritaram
                </div>
                <div className="flex items-center gap-2 text-cyan-400">
                  <Users size={18} /> {stats.played} Jogaram
                </div>
                <div className="flex items-center gap-2 text-yellow-300">
                  <MessageCircle size={18} /> {stats.reviews} Reviews
                </div>
                <div className="flex items-center gap-2 text-fuchsia-400">
                  <Bookmark size={18} /> {stats.wishlists} Wishlist
                </div>
              </div>
            </div>
          </div>
          {/* Coluna 2: Biografia */}
          <div className="col-span-1 flex flex-col items-start justify-start min-w-[260px]">
            <h2 className="text-2xl font-bold text-cyan-400 mb-2">
              Sobre o jogo
            </h2>
            <p className="text-zinc-200 text-lg">{game.description}</p>
          </div>
          {/* Coluna 3: Plataformas, gêneros, awards */}
          <div className="col-span-1 flex flex-col gap-6 min-w-[260px] max-w-xs">
            <div>
              <span className="text-zinc-400 font-semibold">Plataformas:</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {(game.platforms || []).map((p, idx) => (
                  <span
                    key={idx}
                    className="bg-cyan-700 text-white px-3 py-1 rounded-full text-xs font-semibold capitalize"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <span className="text-zinc-400 font-semibold">Gênero:</span>
              <div className="flex flex-wrap gap-2 mt-1">
                <span className="bg-fuchsia-700 text-white px-3 py-1 rounded-full text-xs font-semibold capitalize">
                  {game.genre}
                </span>
              </div>
            </div>
            <div>
              <span className="text-zinc-400 font-semibold">Awards:</span>
              <div className="flex flex-col gap-1 mt-1">
                {awards.map((a, idx) => (
                  <span
                    key={idx}
                    className="flex items-center gap-2 text-yellow-400 text-sm"
                  >
                    <Trophy size={16} /> {a.name}{" "}
                    <span className="text-zinc-400">({a.year})</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Seção de comentários: ocupa 2 colunas (col-span-2) logo após a bio e plataformas */}
        <div className="w-full md:px-48 mt-8">
          <div className="w-full rounded-2xl p-6 shadow-none md:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-cyan-300">Comentários</h2>
              <div className="flex gap-2">
                <button
                  className={`px-3 py-1 rounded ${
                    filter === "recent"
                      ? "bg-cyan-600 text-white"
                      : "bg-zinc-700 text-zinc-300"
                  }`}
                  onClick={() => setFilter("recent")}
                >
                  Mais recentes
                </button>
                <button
                  className={`px-3 py-1 rounded ${
                    filter === "liked"
                      ? "bg-cyan-600 text-white"
                      : "bg-zinc-700 text-zinc-300"
                  }`}
                  onClick={() => setFilter("liked")}
                >
                  Mais curtidos
                </button>
              </div>
            </div>
            {/* Espaço para novo comentário */}
            <div className="flex flex-col md:flex-row gap-4 items-start mb-8">
              {/* Removido as estrelas do comentário */}
              <textarea
                className="flex-1 bg-zinc-900 text-zinc-200 rounded-xl px-4 py-3 border-2 border-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition min-h-[60px] resize-none"
                placeholder="Compartilhe sua experiência com este jogo..."
                // value={userComment}
                // onChange={(e) => setUserComment(e.target.value)}
                maxLength={600}
              />
              <button
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold transition shadow-lg"
                disabled
              >
                Comentar
              </button>
            </div>
            <div className="space-y-6">
              {comments.length === 0 && (
                <div className="text-zinc-400 text-center">
                  Nenhum comentário ainda.
                </div>
              )}
              {comments.map((c, idx) => (
                <div
                  key={idx}
                  className="flex gap-4 bg-zinc-900/80 rounded-xl p-4 items-start"
                >
                  <img
                    src={c.user.avatar}
                    alt={c.user.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-cyan-400"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-cyan-300">
                        {c.user.name}
                      </span>
                      {/* Removido as estrelas do comentário */}
                      <span className="text-zinc-400 text-xs ml-2">
                        {c.platform}
                      </span>
                    </div>
                    <div className="text-zinc-200 mb-2">{c.text}</div>
                    <div className="flex items-center gap-4 text-zinc-400 text-sm">
                      <span>{new Date(c.date).toLocaleDateString()}</span>
                      <span className="flex items-center gap-1">
                        <ThumbsUp size={16} /> {c.likes}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Conteúdo principal, sem corte visual */}
      <div className="max-w-6xl mx-auto pt-32 md:pt-32 flex flex-col gap-10 -mt-16 px-4 md:px-48">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Coluna esquerda: só a foto de perfil */}
          <div className="md:w-1/3 flex flex-col items-start mt-4">
            {/* Espaço reservado para alinhar com a foto de perfil do header */}
            <div style={{ height: "calc(7rem + 2.5rem)" }} />{" "}
            {/* h-56 + bottom offset */}
          </div>
        </div>
      </div>
    </div>
  );
}
