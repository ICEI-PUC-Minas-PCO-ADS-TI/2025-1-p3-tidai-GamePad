import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { GAMES } from "../../db/dbmock";
import { useUser } from "../../context/UserContext";

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

// Funções de serviço para backend
async function postUserGameStatus({ usuarioId, igdbGameId, status }) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/UserGameStatus`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: 0,
      usuarioId,
      igdbGameId,
      status,
    }),
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error("Erro ao salvar status: " + errorText);
  }
  return res.json();
}

async function postAvaliacao({ usuarioId, igdbGameId, nota, comentario }) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/AvaliacoesApi`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: 0,
      nota: nota.toString(),
      comentario,
      data: new Date().toISOString(),
      usuarioId,
      igdbGameId,
    }),
  });
  if (!res.ok) throw new Error("Erro ao salvar avaliação");
  if (res.status === 204) return;
  return res.json();
}

// Função para atualizar avaliação existente
async function putAvaliacao({ id, usuarioId, igdbGameId, nota, comentario }) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/AvaliacoesApi/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id,
      nota: nota.toString(),
      comentario,
      data: new Date().toISOString(),
      usuarioId,
      igdbGameId,
    }),
  });
  if (!res.ok) throw new Error("Erro ao atualizar avaliação");
  if (res.status === 204) return;
  return res.json();
}

// Função para deletar status do usuário para um jogo
async function deleteUserGameStatus({ usuarioId, igdbGameId, status }) {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/UserGameStatus?usuarioId=${usuarioId}&igdbGameId=${igdbGameId}&status=${status}`,
    { method: "DELETE" }
  );
  if (!res.ok) throw new Error("Erro ao remover status");
  return;
}

// Funções para curtir/descurtir avaliação
async function likeAvaliacao(avaliacaoId, usuarioId) {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/AvaliacoesApi/${avaliacaoId}/like?usuarioId=${usuarioId}`,
    {
      method: "POST",
    }
  );
  if (!res.ok) throw new Error("Erro ao curtir comentário");
}
async function unlikeAvaliacao(avaliacaoId, usuarioId) {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/AvaliacoesApi/${avaliacaoId}/like?usuarioId=${usuarioId}`,
    {
      method: "DELETE",
    }
  );
  if (!res.ok) throw new Error("Erro ao remover curtida");
}
// Atualizado: agora retorna { count, isLiked }
async function fetchLikes(avaliacaoId, usuarioId) {
  let url = `${import.meta.env.VITE_API_URL}/api/AvaliacoesApi/likes/${avaliacaoId}`;
  if (usuarioId) url += `?usuarioId=${usuarioId}`;
  const res = await fetch(url);
  if (!res.ok) return { count: 0, isLiked: false };
  return res.json();
}

// Funções para listas de jogos
async function fetchUserLists(usuarioId) {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/GameLists/user/${usuarioId}`
  );
  if (!res.ok) throw new Error("Erro ao buscar listas");
  return res.json();
}
async function createUserList(usuarioId, title) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/GameLists`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ usuarioId, title }),
  });
  if (!res.ok) throw new Error("Erro ao criar lista");
  return res.json();
}
async function addGameToList(listId, game) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/GameLists/${listId}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(game),
  });
  if (!res.ok) throw new Error("Erro ao adicionar jogo à lista");
  return res.json();
}
async function removeGameFromList(listId, itemId) {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/GameLists/${listId}/remove/${itemId}`,
    { method: "DELETE" }
  );
  if (!res.ok) throw new Error("Erro ao remover jogo da lista");
}

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
  const { user } = useUser();

  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [, setError] = useState(null);
  // Estado para comentário
  const [comentario, setComentario] = useState("");
  // Estado para loading de ações
  const [, setSaving] = useState(false);
  // Estado para avaliações/comentários
  const [avaliacoes, setAvaliacoes] = useState([]);
  // Estado para avaliação do usuário logado
  const [minhaAvaliacao, setMinhaAvaliacao] = useState(null);
  // Estado para modal de review
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [modalStars, setModalStars] = useState(userStars);
  const [modalComentario, setModalComentario] = useState(comentario);

  // Estado para status de todos os usuários deste jogo
  const [allStatuses, setAllStatuses] = useState([]);
  // Estado para likes de cada avaliação
  const [likesMap, setLikesMap] = useState({});
  const [userLikedMap, setUserLikedMap] = useState({});

  // Estado para listas do usuário
  const [userLists, setUserLists] = useState([]);
  const [showListModal, setShowListModal] = useState(false);
  const [newListTitle, setNewListTitle] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [selectedListId, setSelectedListId] = useState(null);
  const [addingToList, setAddingToList] = useState(false);
  const [addListError, setAddListError] = useState("");

  // Função para buscar dados de usuário por ID
  async function fetchUserById(id) {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/Usuarios/${id}`);
    if (!res.ok) return null;
    return res.json();
  }

  // Função para buscar avaliações do backend e atualizar estado
  const fetchAvaliacoes = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/AvaliacoesApi`);
    const data = await res.json();
    // Filtra avaliações só deste jogo
    const avals = data.filter((a) => a.igdbGameId === Number(id));
    // Busca dados de usuário para cada avaliação
    const avalsWithUser = await Promise.all(
      avals.map(async (a) => {
        if (a.usuario && a.usuario.nome && a.usuario.imgUser) return a;
        const userData = await fetchUserById(a.usuarioId);
        return {
          ...a,
          usuario: userData || {},
        };
      })
    );
    setAvaliacoes(avalsWithUser);
    // Preenche as estrelas do usuário logado, se houver avaliação
    if (user) {
      const minha = avalsWithUser.find((a) => a.usuarioId === user.id);
      if (minha && minha.nota) {
        setUserStars(Number(minha.nota));
        setMinhaAvaliacao(minha); // Salva avaliação do usuário logado
        setComentario(minha.comentario || "");
      } else {
        setUserStars(0);
        setMinhaAvaliacao(null);
        setComentario("");
      }
    }
  };

  // Busca todos os status deste jogo para estatísticas
  const fetchAllStatuses = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/UserGameStatus/game/${id}`
    );
    if (!res.ok) return [];
    return res.json();
  };

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    // Busca apenas pelo id
    fetch(`${import.meta.env.VITE_API_URL}/api/igdb/games?id=${id}`)
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
    // Busca status do usuário para o jogo atual
    if (user) {
      fetch(`${import.meta.env.VITE_API_URL}/api/UserGameStatus/user/${user.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (!cancelled && Array.isArray(data)) {
            // Filtra status só deste jogo
            const statusList = data.filter((s) => s.igdbGameId === Number(id));
            // Converte o status para o nome do status
            const statusStr = statusList
              .map((s) => {
                if (s.status === 0) return "playing";
                if (s.status === 1) return "played";
                if (s.status === 2) return "wishlist";
                if (s.status === 3) return "liked";
                return null;
              })
              .filter(Boolean);
            setUserStatus(statusStr);
            setIsFavorited(statusStr.includes("liked"));
          }
        });
    }
    // Busca todas as avaliações do jogo
    fetchAvaliacoes();
    // Busca todos os status deste jogo para estatísticas
    fetchAllStatuses().then((data) => {
      if (!cancelled && Array.isArray(data)) setAllStatuses(data);
    });
    return () => {
      cancelled = true;
    };
  }, [id, user]);

  // Atualiza likes ao buscar avaliações
  useEffect(() => {
    async function updateLikes() {
      if (!avaliacoes.length || !user) return;
      const map = {};
      const userMap = {};
      for (const a of avaliacoes) {
        const { count, isLiked } = await fetchLikes(a.id, user.id);
        map[a.id] = count;
        userMap[a.id] = isLiked;
      }
      setLikesMap(map);
      setUserLikedMap(userMap);
    }
    updateLikes();
  }, [avaliacoes, user]);

  // Estatísticas calculadas a partir dos dados do banco
  // Distribuição de avaliações (quantos deram 1, 2, 3, 4, 5 estrelas)
  const ratingsDist = [0, 0, 0, 0, 0];
  let ratingsSum = 0;
  let ratingsCount = 0;
  avaliacoes.forEach((a) => {
    const nota = Number(a.nota);
    if (nota >= 1 && nota <= 5) {
      ratingsDist[nota - 1]++;
      ratingsSum += nota;
      ratingsCount++;
    }
  });
  // Cálculo da média: soma de todas as notas dividido pela quantidade de avaliações
  const userAvgRating =
    ratingsCount > 0 ? (ratingsSum / ratingsCount).toFixed(2) : "-";

  // Quantidade de reviews (comentários não vazios)
  const reviewsCount = avaliacoes.filter(
    (a) => a.comentario && a.comentario.trim()
  ).length;

  // Quantidade de curtidas, jogaram, desejos (status do banco)
  const countStatus = (statusNum) =>
    allStatuses.filter((s) => s.status === statusNum).length;
  const likedCount = countStatus(4);
  const playedCount = countStatus(2);
  const playingCount = countStatus(1);
  const wishlistCount = countStatus(3);

  // Gráfico de distribuição de avaliações
  const renderStarsChart = () => {
    const max = Math.max(...ratingsDist, 1);
    return (
      <div className="flex items-end gap-1 h-12">
        {ratingsDist.map((count, i) => (
          <div key={i} className="flex flex-col items-center">
            <div
              className="w-4 rounded-t bg-yellow-400 transition-all"
              style={{
                height: `${(count / max) * 40 + 8}px`,
                minHeight: "8px",
              }}
            ></div>
            <span className="text-xs text-zinc-400">{count}</span>
            <Star size={12} fill="#facc15" color="#facc15" />
          </div>
        ))}
      </div>
    );
  };

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
          className="bg-cyan-600 px-4 py-2 rounded-lg text-white font-bold cursor-pointer"
          onClick={() => navigate(-1)}
        >
          Voltar
        </button>
      </div>
    );
  }

  // const stats = {
  //   favorites: game.favorites || 0,
  //   played: game.played || 0,
  //   reviews: game.reviews || 0,
  //   wishlists: game.wishlists || 0,
  //   ratings: game.ratings || [10, 5, 15, 40, 80],
  // };
  // // Lista de comentários ordenada conforme filtro
  // const comments = [...avaliacoes].sort((a, b) =>
  //   filter === "recent"
  //     ? new Date(b.data) - new Date(a.data)
  //     : (b.likes || 0) - (a.likes || 0)
  // );

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

  // Handler para status
  const handleStatusClick = async (status) => {
    if (!user) return;
    setSaving(true);
    try {
      let statusNum = 0;
      if (status === "playing") statusNum = 0;
      else if (status === "played") statusNum = 1;
      else if (status === "wishlist") statusNum = 2;
      else if (status === "liked") statusNum = 3;

      if (userStatus.includes(status)) {
        // Remove do banco
        await deleteUserGameStatus({
          usuarioId: user.id,
          igdbGameId: game.id,
          status: statusNum,
        });
        setUserStatus((prev) => prev.filter((s) => s !== status));
        if (status === "liked") setIsFavorited(false);
      } else {
        // Adiciona no banco
        await postUserGameStatus({
          usuarioId: user.id,
          igdbGameId: game.id,
          status: statusNum,
        });
        setUserStatus((prev) => [...prev, status]);
        if (status === "liked") setIsFavorited(true);
      }
      // Atualiza os status gerais do jogo após alteração
      const updatedStatuses = await fetchAllStatuses();
      setAllStatuses(updatedStatuses);
      // eslint-disable-next-line no-unused-vars
    } catch (e) {
      alert("Erro ao salvar status");
    }
    setSaving(false);
  };

  // Handler para avaliação por estrela (cria ou atualiza)
  const handleStarClick = async (nota, comentarioParam = comentario) => {
    if (!user) return;
    setSaving(true);
    try {
      if (minhaAvaliacao) {
        // Atualiza review existente
        await putAvaliacao({
          id: minhaAvaliacao.id,
          usuarioId: user.id,
          igdbGameId: game.id,
          nota,
          comentario: comentarioParam || "",
        });
      } else {
        // Cria nova review
        await postAvaliacao({
          usuarioId: user.id,
          igdbGameId: game.id,
          nota,
          comentario: comentarioParam || "",
        });
      }
      await fetchAvaliacoes();
      // eslint-disable-next-line no-unused-vars
    } catch (e) {
      alert("Erro ao salvar avaliação");
    }
    setSaving(false);
  };

  // Função para salvar review do modal (cria ou atualiza)
  const handleSalvarReview = async () => {
    if (!user || (!modalComentario.trim() && !modalStars)) return;
    setSaving(true);
    try {
      if (minhaAvaliacao) {
        await putAvaliacao({
          id: minhaAvaliacao.id,
          usuarioId: user.id,
          igdbGameId: game.id,
          nota: modalStars || 0,
          comentario: modalComentario,
        });
      } else {
        await postAvaliacao({
          usuarioId: user.id,
          igdbGameId: game.id,
          nota: modalStars || 0,
          comentario: modalComentario,
        });
      }
      setComentario("");
      setShowReviewModal(false);
      await fetchAvaliacoes();
      // eslint-disable-next-line no-unused-vars
    } catch (e) {
      alert("Erro ao salvar review");
    }
    setSaving(false);
  };

  const handleFavoriteClick = () => {
    handleStatusClick("liked");
  };

  // Handler de curtir/descurtir
  const handleLikeClick = async (avaliacao) => {
    if (!user || avaliacao.usuarioId === user.id) return;
    const liked = userLikedMap[avaliacao.id];
    try {
      if (liked) {
        await unlikeAvaliacao(avaliacao.id, user.id);
      } else {
        await likeAvaliacao(avaliacao.id, user.id);
      }
      // Atualiza likes após ação
      const { count, isLiked } = await fetchLikes(avaliacao.id, user.id);
      setLikesMap((prev) => ({ ...prev, [avaliacao.id]: count }));
      setUserLikedMap((prev) => ({ ...prev, [avaliacao.id]: isLiked }));
    } catch (e) {
      alert(e.message);
    }
  };

  // Busca listas do usuário ao abrir modal
  const handleOpenListModal = async () => {
    if (!user) return;
    setShowListModal(true);
    try {
      const lists = await fetchUserLists(user.id);
      setUserLists(lists);
    } catch (e) {
      setUserLists([]);
    }
  };
  const handleCreateList = async () => {
    if (!user || !newListTitle.trim()) return;
    setAddingToList(true);
    try {
      await createUserList(user.id, newListTitle);
      const lists = await fetchUserLists(user.id);
      setUserLists(lists || []);
      setNewListTitle("");
    } finally {
      setAddingToList(false);
    }
  };
  const handleAddGameToList = async (listId) => {
    if (!user || !game) return;
    setAddingToList(true);
    setAddListError("");
    try {
      await addGameToList(listId, {
        igdbGameId: game.id,
        gameTitle: game.name,
        coverUrl: game.cover?.url || "",
      });
      setSelectedListId(listId);
      setShowListModal(false);
    } catch (e) {
      if (e instanceof Response && e.status === 409) {
        setAddListError("Este jogo já está nesta lista.");
      } else {
        setAddListError("Erro ao adicionar jogo à lista.");
      }
    } finally {
      setAddingToList(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900">
      <header
        className="w-full flex justify-center pt-30 items-end"
        style={{ minHeight: "0px" }}
      >
        <div className="relative w-full md:px-full">
          <img
            src={backgroundImg}
            alt="Header"
            className="mask-x-from-70% mask-x-to-90% mask-y-from-80% mask-y-to-90% w-full object-cover rounded-b-3xl"
            style={{
              height: "45vw",
              maxHeight: "600px",
              minHeight: "120px",
              objectFit: "cover",
              borderRadius: "1.5rem",
            }}
          />
          <div
            className="absolute flex flex-col md:flex-row items-end gap-4 md:gap-16 left-0 bottom-0 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48 w-full z-10"
            style={{ maxWidth: "100%" }}
          >
            <div className="w-full flex md:block justify-center md:justify-start">
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
                className="w-24 h-32 sm:w-32 sm:h-44 md:w-40 md:h-56 lg:w-56 lg:h-80 object-cover rounded-2xl shadow-2xl mb-4 md:mb-6 mx-auto md:mx-0"
                style={{
                  boxShadow:
                    "0 8px 32px 0 rgba(0,0,0,0.45), 0 2px 8px 0 rgba(0,0,0,0.25)",
                  border: "none",
                  background: "none",
                }}
              />
            </div>
            <div className="flex flex-col justify-end mb-4 md:mb-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg mb-2">
                {game.name}
              </h1>
              <span className="text-base sm:text-lg text-zinc-300 font-semibold mb-1">
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
        <div className="w-full flex flex-col md:flex-row gap-4 md:gap-8 px-2 sm:px-4 md:px-16 lg:px-32 xl:px-48 mt-6 md:mt-10">
          {/* Coluna da esquerda: Stats/Estrelas */}
          <div className="flex flex-col gap-4 md:gap-6 bg-zinc-800/90 rounded-2xl p-3 sm:p-4 md:p-6 shadow-lg min-w-0 md:min-w-[260px] max-w-full md:max-w-xs sticky md:top-24 self-center md:self-start h-fit z-10 mx-auto md:mx-0">
            {/* Avaliação e botões só para usuário logado */}
            {user && (
              <div>
                <span className="text-zinc-300 font-semibold block mb-2">
                  Sua avaliação:
                </span>
                <div className="flex flex-col gap-2 mb-3">
                  <button
                    className={`mb-2 px-4 py-2 rounded-lg font-bold cursor-pointer transition ${
                      minhaAvaliacao
                        ? "bg-yellow-500 text-zinc-900 hover:bg-yellow-400"
                        : "bg-cyan-600 text-white hover:bg-cyan-700"
                    }`}
                    onClick={() => {
                      setShowReviewModal(true);
                      setModalStars(userStars);
                      setModalComentario(comentario);
                    }}
                  >
                    {minhaAvaliacao ? "Editar Review" : "Fazer Review"}
                  </button>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Star
                        key={n}
                        size={28}
                        className="cursor-pointer"
                        color={userStars >= n ? "#facc15" : "#334155"}
                        fill={userStars >= n ? "#facc15" : "none"}
                        onClick={() => handleStarClick(n)}
                      />
                    ))}
                  </div>
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
                    onClick={() => handleStatusClick("playing")}
                  >
                    <Hourglass size={18} /> Jogando
                  </button>
                  <button
                    className={`flex cursor-pointer items-center gap-1 px-3 py-1 rounded-lg text-sm font-semibold transition ${
                      userStatus.includes("played")
                        ? "bg-green-600 text-white"
                        : "bg-zinc-700 text-green-400 hover:bg-green-800"
                    }`}
                    onClick={() => handleStatusClick("played")}
                  >
                    <CheckCircle size={18} /> Zerado
                  </button>
                  <button
                    className={`flex items-center cursor-pointer gap-1 px-3 py-1 rounded-lg text-sm font-semibold transition ${
                      userStatus.includes("wishlist")
                        ? "bg-fuchsia-600 text-white"
                        : "bg-zinc-700 text-fuchsia-400 hover:bg-fuchsia-800"
                    }`}
                    onClick={() => handleStatusClick("wishlist")}
                  >
                    <Bookmark size={18} /> Desejo
                  </button>
                  <button
                    className="flex cursor-pointer items-center gap-1 px-3 py-1 rounded-lg text-sm font-semibold bg-zinc-700 text-zinc-300 hover:bg-zinc-800"
                    onClick={handleOpenListModal}
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
                    onClick={handleFavoriteClick}
                  >
                    <Heart
                      size={20}
                      fill={isFavorited ? "#fff" : "none"}
                      color={isFavorited ? "#fff" : "#db2777"}
                    />
                    {isFavorited ? "Curtido" : "Curtir"}
                  </button>
                  <hr className="mb-4 border-zinc-700" />
                </div>
              </div>
            )}
            {/* Ratings e stats  */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Star size={32} fill="#facc15" color="#facc15" />
                <span className="text-3xl font-bold text-yellow-300">
                  {userAvgRating}
                </span>
                <span className="text-zinc-400 text-base font-semibold">
                  Média dos usuários
                </span>
              </div>
              {/* Distribuição de avaliações */}
              <div className="flex items-center flex-col">
                <span className="text-zinc-400 font-semibold block mb-10 mt-4">
                  Distribuição de avaliações:
                </span>
                <div className="mt-2 mb-2">{renderStarsChart()}</div>
              </div>
              <div className="flex flex-col items-center gap-2 mt-4">
                <div className="flex items-center gap-2 text-pink-400">
                  <Heart size={18} /> {likedCount} Curtiram
                </div>
                <div className="flex items-center gap-2 text-cyan-400">
                  <Users size={18} /> {playedCount + playingCount} Jogaram
                </div>
                <div className="flex items-center gap-2 text-yellow-300">
                  <MessageCircle size={18} /> {reviewsCount} Reviews
                </div>
                <div className="flex items-center gap-2 text-fuchsia-400">
                  <Bookmark size={18} /> {wishlistCount} Desejos
                </div>
              </div>
            </div>
          </div>
          {/* Coluna da direita: Sobre o jogo + informações */}
          <div className="flex-1 flex flex-col gap-4 md:gap-8">
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
                    className="relative w-full flex justify-center items-center mb-4"
                    style={{ minHeight: 380 }}
                  >
                    <button
                      className="absolute left-2 cursor-pointer z-10 bg-zinc-900/80 hover:bg-cyan-600 text-white rounded-full p-4 shadow-lg transition"
                      onClick={handlePrevImage}
                      aria-label="Imagem anterior"
                      style={{ top: "50%", transform: "translateY(-50%)" }}
                    >
                      <span className="text-2xl">&#8592;</span>
                    </button>
                    <div
                      className="rounded-2xl overflow-hidden shadow-2xl bg-zinc-800 flex items-center justify-center w-full"
                      style={{
                        maxWidth: "100%",
                        minHeight: 320,
                        height: "55vh",
                        background: "#18181b",
                      }}
                    >
                      <img
                        src={images[galleryIndex]}
                        alt={`Imagem ${galleryIndex + 1}`}
                        className="object-contain w-full h-full transition-all duration-300"
                        style={{
                          maxHeight: "55vh",
                          minHeight: 240,
                          width: "100%",
                          background: "#222",
                        }}
                      />
                    </div>
                    <button
                      className="absolute cursor-pointer right-2 z-10 bg-zinc-900/80 hover:bg-cyan-600 text-white rounded-full p-4 shadow-lg transition"
                      onClick={handleNextImage}
                      aria-label="Próxima imagem"
                      style={{ top: "50%", transform: "translateY(-50%)" }}
                    >
                      <span className="text-2xl">&#8594;</span>
                    </button>
                  </div>
                  <div className="flex gap-2 justify-center mt-2">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                          galleryIndex === idx
                            ? "bg-cyan-400 border-cyan-600 scale-125 shadow-lg"
                            : "bg-zinc-600 border-zinc-400 opacity-60"
                        }`}
                        onClick={() => setGalleryIndex(idx)}
                        aria-label={`Selecionar imagem ${idx + 1}`}
                        style={{ outline: "none" }}
                      />
                    ))}
                  </div>
                  <div className="text-zinc-400 text-xs mt-2">
                    {galleryIndex + 1} / {images.length}
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
            {/* Seção de comentários */}
            <div className="w-full rounded-2xl p-3 sm:p-4 md:p-6 shadow-none md:col-span-2 bg-zinc-900/80 mt-0">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-cyan-300">
                  Comentários
                </h2>
                <div className="flex gap-2">
                  <button
                    className={`px-2 sm:px-3 cursor-pointer py-1 rounded text-xs sm:text-base ${
                      filter === "recent"
                        ? "bg-cyan-600 text-white"
                        : "bg-zinc-700 text-zinc-300"
                    }`}
                    onClick={() => setFilter("recent")}
                  >
                    Mais recentes
                  </button>
                  <button
                    className={`px-2 sm:px-3 cursor-pointer py-1 rounded text-xs sm:text-base ${
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
              <div className="space-y-6">
                {avaliacoes.length === 0 && (
                  <div className="text-zinc-400 text-center">
                    Nenhum comentário ainda.
                  </div>
                )}
                {/* Renderização dos comentários */}
                {[...avaliacoes]
                  .filter((c) => c.comentario && c.comentario.trim())
                  .sort((a, b) =>
                    filter === "recent"
                      ? new Date(b.data) - new Date(a.data)
                      : (b.likes || 0) - (a.likes || 0)
                  )
                  .map((c, idx) => (
                    <div
                      key={c.id || idx}
                      className="flex gap-4 bg-zinc-900/80 rounded-xl p-4 items-start"
                    >
                      <img
                        src={
                          c.usuario?.imgUser
                            ? c.usuario.imgUser.startsWith("/profile-images/")
                              ? `${import.meta.env.VITE_API_URL}${c.usuario.imgUser}`
                              : c.usuario.imgUser
                            : "/profile-images/default-profile.png"
                        }
                        alt={c.usuario?.nome || "Usuário"}
                        className="w-12 h-12 rounded-full object-cover border-2 border-cyan-400"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className="font-bold text-cyan-300 cursor-pointer hover:underline"
                            onClick={() => {
                              if (c.usuario?.nome) {
                                navigate(
                                  `/${c.usuario.nome
                                    .toLowerCase()
                                    .replace(/\s+/g, "-")}`
                                );
                              }
                            }}
                          >
                            {c.usuario?.nome || "Usuário"}
                          </span>
                          {/* Nota em estrelas */}
                          <div className="flex items-center ml-2">
                            {[1, 2, 3, 4, 5].map((n) => (
                              <Star
                                key={n}
                                size={18}
                                color={
                                  n <= Number(c.nota) ? "#facc15" : "#334155"
                                }
                                fill={n <= Number(c.nota) ? "#facc15" : "none"}
                              />
                            ))}
                          </div>
                        </div>
                        {/* Só exibe comentário se não for nulo ou vazio */}
                        {c.comentario && c.comentario.trim() && (
                          <div className="text-zinc-200 mb-2">
                            {c.comentario}
                          </div>
                        )}
                        <div className="flex items-center gap-4 text-zinc-400 text-sm">
                          <span>
                            {c.data
                              ? new Date(c.data).toLocaleDateString()
                              : ""}
                          </span>
                          {/* Espaço para likes */}
                          <button
                            className={`flex items-center cursor-pointer gap-1 transition px-2 py-1 rounded-full text-sm font-semibold ${
                              user && c.usuarioId !== user.id
                                ? userLikedMap[c.id]
                                  ? "bg-cyan-600 text-white"
                                  : "bg-zinc-800 text-cyan-400 hover:bg-cyan-700"
                                : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                            }`}
                            disabled={!user || c.usuarioId === user.id}
                            onClick={() => handleLikeClick(c)}
                            title={
                              user && c.usuarioId === user.id
                                ? "Você não pode curtir seu próprio comentário"
                                : userLikedMap[c.id]
                                ? "Remover curtida"
                                : "Curtir"
                            }
                          >
                            <ThumbsUp
                              size={16}
                              className="mr-1 "
                              fill={userLikedMap[c.id] ? "#22d3ee" : "none"}
                            />
                            {likesMap[c.id] || 0} curtidas
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Modal de Review */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-zinc-800 rounded-2xl p-4 sm:p-6 md:p-8 w-full max-w-xs sm:max-w-md md:max-w-2xl shadow-2xl relative flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8">
            <button
              className="absolute top-2 right-2 sm:top-3 sm:right-3 text-zinc-400 hover:text-white text-xl sm:text-2xl"
              onClick={() => setShowReviewModal(false)}
            >
              ✕
            </button>
            <img
              src={
                game.cover && game.cover.url
                  ? (() => {
                      const url = game.cover.url.replace(
                        /t_thumb|t_cover_small/g,
                        "t_original"
                      );
                      return url.startsWith("http") ? url : `https:${url}`;
                    })()
                  : "/profile-images/default-profile.png"
              }
              alt={game.name}
              className="w-24 h-32 sm:w-32 sm:h-44 md:w-40 md:h-56 object-cover rounded-lg shadow-lg self-center md:self-start"
            />
            <div className="flex-1 flex flex-col gap-3 sm:gap-4">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-cyan-300 mb-1 sm:mb-2">
                {game.name}
              </h2>
              <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star
                    key={n}
                    size={24}
                    className="cursor-pointer"
                    color={modalStars >= n ? "#facc15" : "#334155"}
                    fill={modalStars >= n ? "#facc15" : "none"}
                    onClick={() => setModalStars(n)}
                  />
                ))}
              </div>
              <textarea
                className="w-full min-h-[60px] sm:min-h-[80px] rounded-lg p-2 bg-zinc-800 text-zinc-100 mb-2 text-sm sm:text-base"
                placeholder="Adicione um comentário..."
                value={modalComentario}
                onChange={(e) => setModalComentario(e.target.value)}
              />
              <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-4">
                <button
                  className={`px-2 sm:px-3 py-1 cursor-pointer rounded-lg font-semibold transition flex items-center gap-1 text-xs sm:text-base ${
                    userStatus.includes("playing")
                      ? "bg-cyan-600 text-white"
                      : "bg-zinc-700 text-cyan-300 hover:bg-cyan-800"
                  }`}
                  onClick={() => handleStatusClick("playing")}
                >
                  <Hourglass size={16} /> Jogando
                </button>
                <button
                  className={`px-2 sm:px-3 py-1 rounded-lg cursor-pointer font-semibold transition flex items-center gap-1 text-xs sm:text-base ${
                    userStatus.includes("played")
                      ? "bg-green-600 text-white"
                      : "bg-zinc-700 text-green-400 hover:bg-green-800"
                  }`}
                  onClick={() => handleStatusClick("played")}
                >
                  <CheckCircle size={16} /> Zerado
                </button>
                <button
                  className={`px-2 sm:px-3 py-1 rounded-lg cursor-pointer font-semibold transition flex items-center gap-1 text-xs sm:text-base ${
                    userStatus.includes("wishlist")
                      ? "bg-fuchsia-600 text-white"
                      : "bg-zinc-700 text-fuchsia-400 hover:bg-fuchsia-800"
                  }`}
                  onClick={() => handleStatusClick("wishlist")}
                >
                  <Bookmark size={16} /> Desejo
                </button>
                <button
                  className={`px-2 sm:px-3 py-1 rounded-lg cursor-pointer font-semibold transition flex items-center gap-1 text-xs sm:text-base ${
                    isFavorited
                      ? "bg-pink-600 text-white"
                      : "bg-zinc-700 text-pink-400 hover:bg-pink-700"
                  }`}
                  onClick={handleFavoriteClick}
                >
                  <Heart
                    size={16}
                    fill={isFavorited ? "#fff" : "none"}
                    color={isFavorited ? "#fff" : "#db2777"}
                  />{" "}
                  Curtir
                </button>
              </div>
              <button
                className="w-full px-3 sm:px-4 py-2 cursor-pointer rounded-lg bg-cyan-600 text-white font-bold hover:bg-cyan-700 transition text-sm sm:text-base"
                onClick={handleSalvarReview}
                disabled={modalStars === 0}
              >
                Salvar Review
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Modal de Listas */}
      {showListModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-zinc-900 p-4 sm:p-6 rounded-xl w-full max-w-xs sm:max-w-md shadow-xl">
            <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-white">
              Adicionar a uma lista
            </h2>
            <div className="mb-3 sm:mb-4">
              <input
                type="text"
                className="w-full p-2 rounded bg-zinc-800 text-white mb-2 text-sm sm:text-base"
                placeholder="Nova lista: digite o título e clique em criar"
                value={newListTitle}
                onChange={(e) => setNewListTitle(e.target.value)}
                disabled={addingToList}
              />
              <button
                className="bg-cyan-600 text-white px-2 sm:px-3 py-1 rounded hover:bg-cyan-700 text-xs sm:text-base"
                onClick={handleCreateList}
                disabled={addingToList || !newListTitle.trim()}
              >
                Criar lista
              </button>
            </div>
            <div>
              <div className="mb-2 text-zinc-300 text-sm sm:text-base">
                Suas listas:
              </div>
              {userLists.length === 0 && (
                <div className="text-zinc-400 text-xs sm:text-base">
                  Nenhuma lista encontrada.
                </div>
              )}
              {userLists.map((list) => {
                // Verifica se o jogo já está na lista
                const existingItem = list.items.find(
                  (i) => i.igdbGameId === game?.id
                );
                return (
                  <div
                    key={list.id}
                    className="flex items-center justify-between mb-2 bg-zinc-800 rounded p-2"
                  >
                    <span className="text-white text-xs sm:text-base">
                      {list.title}
                    </span>
                    {existingItem ? (
                      <button
                        className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 text-xs sm:text-base"
                        onClick={async () => {
                          setAddingToList(true);
                          setAddListError("");
                          try {
                            await removeGameFromList(list.id, existingItem.id);
                            setUserLists((prev) =>
                              prev.map((l) =>
                                l.id === list.id
                                  ? {
                                      ...l,
                                      items: l.items.filter(
                                        (i) => i.id !== existingItem.id
                                      ),
                                    }
                                  : l
                              )
                            );
                          } catch {
                            setAddListError("Erro ao remover jogo da lista.");
                          } finally {
                            setAddingToList(false);
                          }
                        }}
                        disabled={addingToList}
                      >
                        Remover
                      </button>
                    ) : (
                      <button
                        className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 text-xs sm:text-base"
                        onClick={() => handleAddGameToList(list.id)}
                        disabled={addingToList}
                      >
                        Adicionar
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
            {addListError && (
              <div className="text-red-400 mb-2 text-center text-xs sm:text-base">
                {addListError}
              </div>
            )}
            <button
              className="mt-3 sm:mt-4 text-zinc-400 hover:text-white text-xs sm:text-base"
              onClick={() => setShowListModal(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
