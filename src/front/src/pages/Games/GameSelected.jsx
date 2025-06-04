import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { GAMES } from "../../db/dbmock";

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
  const [filter, setFilter] = useState("recent");
  const [userStatus, setUserStatus] = useState([]);
  const [userStars, setUserStars] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [activeTab, setActiveTab] = useState("about");
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showAllLanguages, setShowAllLanguages] = useState(false);

  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    // Busca apenas pelo id
    fetch(`http://localhost:5069/api/igdb/games?id=${id}`)
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          if (!cancelled && data && data.length > 0) {
            setGame(data[0]);
            setLoading(false);
            return;
          }
        }
        if (!cancelled) {
          setGame(null);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setGame(null);
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  const images =
    game && game.screenshots && game.screenshots.length > 0
      ? game.screenshots.map((s) =>
          s.url.startsWith("http")
            ? s.url
            : `https:${s.url.replace("t_thumb", "t_1080p")}`
        )
      : [
          game && game.cover && game.cover.url
            ? game.cover.url.startsWith("http")
              ? game.cover.url
              : `https:${game.cover.url.replace("t_thumb", "t_cover_big")}`
            : "",
        ];

  // se tiver screenshots, usa elas como imagens caso nao tenha usara a capa
  const backgroundImg =
    images && images.length > 0
      ? images[0]
      : game && game.cover && game.cover.url
      ? game.cover.url.startsWith("http")
        ? game.cover.url
        : `https:${game.cover.url.replace("t_thumb", "t_cover_big")}`
      : "";

  const handlePrevImage = () => {
    setGalleryIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
  const handleNextImage = () => {
    setGalleryIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-900 text-white">
        <h2 className="text-2xl font-bold mb-4">Carregando jogo...</h2>
      </div>
    );
  }
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

  // Função para formatar a data de lançamento
  function formatReleaseDate(timestamp) {
    if (!timestamp) return "-";
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  // Se o jogo tiver mais de 5 idiomas, mostra os primeiros 5 e um botão para ver os demais
  const languages = (game.language_supports || [])
    .map((ls) => (ls.language && ls.language.name ? ls.language.name : null))
    .filter(Boolean);
  const mainLanguages = languages.slice(0, 5);
  const extraLanguages = languages.slice(5);

  return (
    <div className="min-h-screen bg-zinc-900">
      <header
        className="w-full flex justify-center items-end"
        style={{ minHeight: "400px" }}
      >
        <div className="relative w-full md:px-full">
          <img
            src={backgroundImg}
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
              src={
                game.cover && game.cover.url
                  ? game.cover.url.startsWith("http")
                    ? game.cover.url.replace("t_thumb", "t_cover_big")
                    : `https:${game.cover.url.replace(
                        "t_thumb",
                        "t_cover_big"
                      )}`
                  : ""
              }
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
                Lançamento:{" "}
                <span className="text-white">
                  {formatReleaseDate(game.first_release_date)}
                </span>
              </span>
            </div>
          </div>
        </div>
      </header>
      <section className="w-full flex flex-col items-center">
        <div className="w-full flex flex-col md:flex-row gap-8 px-0 md:px-48 mt-10">
          {/* Coluna da esquerda: Stats/Estrelas */}
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
              <hr className="my-3 border-zinc-700" />
              {/* Botões de status */}
              <div className="grid grid-cols-2 gap-2 mb-3">
                <button
                  className={`flex cursor-pointer items-center gap-1 px-3 py-1 rounded-lg text-sm font-semibold transition ${
                    userStatus.includes("playing")
                      ? "bg-cyan-600 text-white"
                      : "bg-zinc-700 text-cyan-300 hover:bg-cyan-800"
                  }`}
                  onClick={() => {
                    setUserStatus((prev) =>
                      prev.includes("playing")
                        ? prev.filter((s) => s !== "playing")
                        : [...prev, "playing"]
                    );
                  }}
                >
                  <Hourglass size={18} /> Jogando
                </button>
                <button
                  className={`flex cursor-pointer items-center gap-1 px-3 py-1 rounded-lg text-sm font-semibold transition ${
                    userStatus.includes("played")
                      ? "bg-green-600 text-white"
                      : "bg-zinc-700 text-green-400 hover:bg-green-800"
                  }`}
                  onClick={() => {
                    setUserStatus((prev) =>
                      prev.includes("played")
                        ? prev.filter((s) => s !== "played")
                        : [...prev, "played"]
                    );
                  }}
                >
                  <CheckCircle size={18} /> Zerado
                </button>
                <button
                  className={`flex items-center cursor-pointer gap-1 px-3 py-1 rounded-lg text-sm font-semibold transition ${
                    userStatus.includes("wishlist")
                      ? "bg-fuchsia-600 text-white"
                      : "bg-zinc-700 text-fuchsia-400 hover:bg-fuchsia-800"
                  }`}
                  onClick={() => {
                    setUserStatus((prev) =>
                      prev.includes("wishlist")
                        ? prev.filter((s) => s !== "wishlist")
                        : [...prev, "wishlist"]
                    );
                  }}
                >
                  <Bookmark size={18} /> Desejo
                </button>
                <button
                  className="flex cursor-pointer items-center gap-1 px-3 py-1 rounded-lg text-sm font-semibold bg-zinc-700 text-zinc-300 hover:bg-zinc-800"
                  title="Adicionar a uma lista (em breve)"
                  disabled
                >
                  <List size={18} /> Lista
                </button>
              </div>
              <hr className="my-3 border-zinc-700" />
              {/* Botão de favoritar */}
              <div className="flex justify-center">
                <button
                  className={`flex cursor-pointer items-center gap-2 px-4 py-2 rounded-lg font-bold mt-2 transition ${
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
            {/* Ratings e stats*/}
            <div>
              <hr className="mb-4 border-zinc-700" />
              <div className="flex items-center  gap-3 mb-6">
                <Star size={32} fill="#facc15" color="#facc15" />
                <span className="text-3xl font-bold  text-yellow-300">
                  {game.rating}
                </span>
                <span className="text-zinc-400 text-base font-semibold">
                  Média dos usuários
                </span>
              </div>
              {/* Distribuição de avaliações */}
              <div className="flex items-center  flex-col">
                <span className="text-zinc-400 font-semibold block mb-10 mt-4">
                  Distribuição de avaliações:
                </span>
                <div className="mt-2 mb-2">{renderStarsChart()}</div>
              </div>
              <div className="flex flex-col items-center gap-2 mt-4">
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
          {/* Coluna da direita: Sobre o jogo + informações */}
          <div className="flex-1 flex flex-col gap-8">
            {/* Sobre o jogo e galeria */}
            <div className="flex flex-col items-start justify-start w-full">
              {/* Abas */}
              <div className="flex gap-2 mb-4">
                <button
                  className={`px-4 py-2 cursor-pointer rounded-t-lg font-semibold transition ${
                    activeTab === "about"
                      ? "bg-cyan-600 text-white"
                      : "bg-zinc-800 text-cyan-300 hover:bg-cyan-700"
                  }`}
                  onClick={() => setActiveTab("about")}
                >
                  Sobre o jogo
                </button>
                <button
                  className={`px-4 py-2 cursor-pointer rounded-t-lg font-semibold transition ${
                    activeTab === "gallery"
                      ? "bg-cyan-600 text-white"
                      : "bg-zinc-800 text-cyan-300 hover:bg-cyan-700"
                  }`}
                  onClick={() => setActiveTab("gallery")}
                >
                  Galeria
                </button>
              </div>
              {/* Conteúdo da aba */}
              {activeTab === "about" ? (
                <>
                  <h2 className="text-2xl font-bold text-cyan-400 mb-2">
                    Sobre o jogo
                  </h2>
                  <div className="relative w-full">
                    <p
                      className={`text-zinc-200 text-lg transition-all ${
                        !showFullDescription
                          ? "line-clamp-6 max-h-[9.5em] overflow-hidden"
                          : ""
                      }`}
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: !showFullDescription ? 6 : "unset",
                        WebkitBoxOrient: "vertical",
                        overflow: !showFullDescription ? "hidden" : "visible",
                      }}
                    >
                      {game.summary}
                    </p>
                    {/* Ler mais aparece se a descrição for longa */}
                    {!showFullDescription && (
                      <button
                        className="absolute bottom-0 right-0 bg-gradient-to-l cursor-pointer from-zinc-900/90 to-transparent px-3 py-1 text-cyan-400 font-semibold rounded-bl-xl hover:underline transition"
                        style={{
                          display:
                            game.description && game.description.length > 250
                              ? "block"
                              : "none",
                        }}
                        onClick={() => setShowFullDescription(true)}
                      >
                        Ler mais
                      </button>
                    )}
                    {showFullDescription && (
                      <button
                        className="mt-2 text-cyan-400 cursor-pointer font-semibold hover:underline transition"
                        onClick={() => setShowFullDescription(false)}
                      >
                        Mostrar menos
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <div className="w-full flex flex-col items-center">
                  <div
                    className="relative w-full flex justify-center items-center mb-2"
                    style={{ minHeight: 240 }}
                  >
                    <button
                      className="absolute left-0 z-10 bg-zinc-800/70 hover:bg-cyan-600 text-white rounded-full p-2 transition"
                      onClick={handlePrevImage}
                      aria-label="Imagem anterior"
                      style={{ top: "50%", transform: "translateY(-50%)" }}
                    >
                      &#8592;
                    </button>
                    <img
                      src={images[galleryIndex]}
                      alt={`Imagem ${galleryIndex + 1}`}
                      className="rounded-xl shadow-lg object-contain max-h-60 max-w-full"
                      style={{ background: "#222", minHeight: 180 }}
                    />
                    <button
                      className="absolute right-0 z-10 bg-zinc-800/70 hover:bg-cyan-600 text-white rounded-full p-2 transition"
                      onClick={handleNextImage}
                      aria-label="Próxima imagem"
                      style={{ top: "50%", transform: "translateY(-50%)" }}
                    >
                      &#8594;
                    </button>
                  </div>
                  <div className="flex gap-2 justify-center mt-2">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        className={`w-3 h-3 rounded-full border-2 ${
                          galleryIndex === idx
                            ? "bg-cyan-400 border-cyan-600"
                            : "bg-zinc-600 border-zinc-400"
                        }`}
                        onClick={() => setGalleryIndex(idx)}
                        aria-label={`Selecionar imagem ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
            {/* Informações do jogo */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Plataformas */}
              <div>
                <span className="text-zinc-400 font-semibold">
                  Plataformas:
                </span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {(game.platforms || []).map((p, idx) => (
                    <span
                      key={idx}
                      className="bg-cyan-700 text-white px-3 py-1 rounded-full text-xs font-semibold capitalize"
                    >
                      {typeof p === "object" && p !== null ? p.name : p}
                    </span>
                  ))}
                </div>
                {/* Idiomas*/}
                {languages.length > 0 && (
                  <div className="mt-3">
                    <span className="text-zinc-400 font-semibold">
                      Idiomas:
                    </span>
                    <ul className="flex flex-wrap gap-2 mt-1">
                      {(showAllLanguages ? languages : mainLanguages).map(
                        (lang, idx) => (
                          <li
                            key={idx}
                            className="bg-zinc-700 text-white px-2 py-1 rounded text-xs"
                          >
                            {lang}
                          </li>
                        )
                      )}
                    </ul>
                    {extraLanguages.length > 0 && !showAllLanguages && (
                      <button
                        className="mt-2 text-cyan-400 cursor-pointer font-semibold hover:underline transition text-xs"
                        onClick={() => setShowAllLanguages(true)}
                      >
                        Ver todos os idiomas
                      </button>
                    )}
                    {showAllLanguages && extraLanguages.length > 0 && (
                      <button
                        className="mt-2 text-cyan-400 cursor-pointer font-semibold hover:underline transition text-xs"
                        onClick={() => setShowAllLanguages(false)}
                      >
                        Mostrar menos
                      </button>
                    )}
                  </div>
                )}
                {/* Links oficiais */}
                {game.websites &&
                  Array.isArray(game.websites) &&
                  game.websites.length > 0 && (
                    <div className="mt-3">
                      <span className="text-zinc-400 font-semibold">
                        Websites:
                      </span>
                      <ul className="flex flex-wrap gap-2 mt-1">
                        {game.websites.map((w, idx) => (
                          <li key={idx}>
                            <a
                              href={w.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline text-cyan-400 hover:text-cyan-200 text-xs"
                            >
                              {w.category ? w.category : w.url}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
              </div>
              {/* Gêneros, temas, modos, desenvolvedora */}
              <div>
                <span className="text-zinc-400 font-semibold">Gêneros:</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {(game.genres || []).map((g, idx) => (
                    <span
                      key={idx}
                      className="bg-fuchsia-700 text-white px-3 py-1 rounded-full text-xs font-semibold capitalize"
                    >
                      {typeof g === "object" && g !== null ? g.name : g}
                    </span>
                  ))}
                </div>
                {/* Temas */}
                {game.themes &&
                  Array.isArray(game.themes) &&
                  game.themes.length > 0 && (
                    <div className="mt-3">
                      <span className="text-zinc-400 font-semibold">
                        Temas:
                      </span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {game.themes.map((t, idx) => (
                          <span
                            key={idx}
                            className="bg-indigo-700 text-white px-2 py-1 rounded text-xs"
                          >
                            {t.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                {/* Modos de jogo */}
                {game.game_modes &&
                  Array.isArray(game.game_modes) &&
                  game.game_modes.length > 0 && (
                    <div className="mt-3">
                      <span className="text-zinc-400 font-semibold">
                        Modos de Jogo:
                      </span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {game.game_modes.map((m, idx) => (
                          <span
                            key={idx}
                            className="bg-cyan-800 text-white px-2 py-1 rounded text-xs"
                          >
                            {m.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                {/* Desenvolvedora */}
                {game.involved_companies &&
                  Array.isArray(game.involved_companies) &&
                  game.involved_companies.length > 0 && (
                    <div className="mt-3">
                      <span className="text-zinc-400 font-semibold">
                        Desenvolvedora(s):
                      </span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {game.involved_companies
                          .filter((ic) => ic.developer)
                          .map((ic, idx) => (
                            <span
                              key={idx}
                              className="bg-green-700 text-white px-2 py-1 rounded text-xs"
                            >
                              {ic.company && ic.company.name
                                ? ic.company.name
                                : ""}
                            </span>
                          ))}
                      </div>
                      <span className="text-zinc-400 font-semibold mt-2 block">
                        Publisher(s):
                      </span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {game.involved_companies
                          .filter((ic) => ic.publisher)
                          .map((ic, idx) => (
                            <span
                              key={idx}
                              className="bg-blue-700 text-white px-2 py-1 rounded text-xs"
                            >
                              {ic.company && ic.company.name
                                ? ic.company.name
                                : ""}
                            </span>
                          ))}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
        {/* Seção de comentários */}
        <div className="w-full md:px-48 mt-8">
          <div className="w-full rounded-2xl p-6 shadow-none md:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-cyan-300">Comentários</h2>
              <div className="flex gap-2">
                <button
                  className={`px-3 cursor-pointer py-1 rounded ${
                    filter === "recent"
                      ? "bg-cyan-600 text-white"
                      : "bg-zinc-700 text-zinc-300"
                  }`}
                  onClick={() => setFilter("recent")}
                >
                  Mais recentes
                </button>
                <button
                  className={`px-3 cursor-pointer py-1 rounded ${
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
              <textarea
                className="flex-1 bg-zinc-900 text-zinc-200 rounded-xl px-4 py-3 border-2 border-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition min-h-[60px] resize-none"
                placeholder="Compartilhe sua experiência com este jogo..."
                maxLength={600}
              />
              <button
                className="flex cursor-pointer items-center gap-2 px-5 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold transition shadow-lg"
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
    </div>
  );
}
