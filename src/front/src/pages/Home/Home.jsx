import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import imgHeader from "../../assets/imgHeader.jpg";
import gamepad1 from "../../assets/gamepad1.png";
import gamepad2 from "../../assets/gamepad2.png";
import { Button } from "../../components/Button/Button";
import GameCard from "../../components/Cards/GameCard";
import { Save, Hourglass, Telescope, HeartPlus, Joystick } from "lucide-react";
import GlassButton from "../../components/GlassButton/GlassButton";
import CommentSlider from "../../components/slider/CommentSlider";
import { fetchGames, fetchGamesByIds } from "../../service/igdbService";
import CardNews from "../../components/News/cardNews";
import NewsPreviewGrid from "../../components/News/NewsPreviewGrid";
import useNews from "../../components/News/useNews";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function Home() {
  const navigate = useNavigate();

  // Estado para comentários reais
  const [comments, setComments] = React.useState([]);
  // Estado para jogos da IGDB
  const [games, setGames] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    fetchGames({ popular: true, limit: 6 })
      .then((data) => {
        setGames(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
    // Busca todos os comentários reais do banco
    fetch("http://localhost:5069/api/AvaliacoesApi")
      .then((res) => res.json())
      .then(async (data) => {
        // Filtra apenas avaliações com comentário não vazio
        const commentsWithText = data.filter(
          (a) => a.comentario && a.comentario.trim()
        );
        // Busca likes de cada comentário
        const commentsWithLikes = await Promise.all(
          commentsWithText.map(async (c) => {
            const res = await fetch(
              `http://localhost:5069/api/AvaliacoesApi/likes/${c.id}`
            );
            let likes = 0;
            if (res.ok) {
              const result = await res.json();
              likes = result.count ?? result;
            }
            return { ...c, likes };
          })
        );
        // Ordena pelos mais curtidos
        const sorted = commentsWithLikes.sort((a, b) => b.likes - a.likes);
        // Seleciona os 4 mais curtidos
        const selected = sorted.slice(0, 4);
        // Busca dados dos jogos relacionados
        const gameIds = [
          ...new Set(
            selected.map(
              (c) =>
                c.IgdbGameId || c.igdbGameId || c.igdbgameid || c.IGDBGameId
            )
          ),
        ].filter(Boolean);
        let gamesData = [];
        if (gameIds.length > 0) {
          gamesData = await fetchGamesByIds(gameIds);
        }
        // Mapeia os comentários para o formato esperado
        const mapped = selected.map((c) => {
          // Tenta encontrar o campo correto do ID do jogo
          const igdbId =
            c.IgdbGameId || c.igdbGameId || c.igdbgameid || c.IGDBGameId;
          const game = gamesData.find(
            (g) => g.id === igdbId || g.id === Number(igdbId)
          );
          const mappedComment = {
            cover:
              game?.cover && game.cover.url
                ? (() => {
                    const url = game.cover.url.replace(
                      /t_thumb|t_cover_small/g,
                      "t_original"
                    );
                    return url.startsWith("http") ? url : `https:${url}`;
                  })()
                : game?.cover_url
                ? game.cover_url
                : "https://placehold.co/200x280?text=No+Cover",
            gameTitle: game?.name || "Jogo desconhecido",
            gameYear: game?.first_release_date
              ? new Date(game.first_release_date * 1000).getFullYear()
              : game?.release_date
              ? new Date(game.release_date * 1000).getFullYear()
              : "-",
            userAvatar:
              c.UsuarioImg && c.UsuarioImg.startsWith("/profile-images/")
                ? `http://localhost:5069${c.UsuarioImg}`
                : c.UsuarioImg && c.UsuarioImg.startsWith("http")
                ? c.UsuarioImg
                : c.UsuarioImg
                ? `${window.location.origin}${c.UsuarioImg}`
                : c.usuarioImg && c.usuarioImg.startsWith("/profile-images/")
                ? `http://localhost:5069${c.usuarioImg}`
                : c.usuarioImg && c.usuarioImg.startsWith("http")
                ? c.usuarioImg
                : c.usuarioImg
                ? `${window.location.origin}${c.usuarioImg}`
                : c.imgUser && c.imgUser.startsWith("/profile-images/")
                ? `http://localhost:5069${c.imgUser}`
                : c.imgUser && c.imgUser.startsWith("http")
                ? c.imgUser
                : c.imgUser
                ? `${window.location.origin}${c.imgUser}`
                : "https://placehold.co/64x64?text=User",
            userName: c.UsuarioNome || c.usuarioNome || c.nome || "Usuário",
            stars: Number(c.Nota || c.nota) || 0,
            comment: c.Comentario || c.comentario,
            likes: c.likes || 0,
            igdbGameId: igdbId, // Adiciona o id do jogo explicitamente
          };
          return mappedComment;
        });
        setComments(mapped);
      });
  }, []);

  return (
    <>
      <main>
        <motion.header
          className="flex justify-center items-start w-full"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative w-full md:px-full ">
            {/* Imagem principal do header, alinhada com a navbar */}
            <motion.img
              src={imgHeader}
              alt="Header"
              className="mask-x-from-70% mask-x-to-90% mask-y-from-80% mask-y-to-90% w-full h-150 object-cover rounded-3xl"
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
            />
            {/* Texto centralizado sobre a imagem, com transição para transparência */}
            <motion.div
              className="absolute left-1/2 bottom-4 -translate-x-1/2 w-[90%] text-white text-center text-3xl font-semibold drop-shadow-lg pointer-events-none flex flex-col gap-y-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              <span>Acompanhe os jogos que você zerou.</span>
              <span>Salve os que quer jogar.</span>
              <span>Compartilhe o que realmente vale a pena.</span>
            </motion.div>
          </div>
        </motion.header>
        {/* Botão principal, centralizado abaixo do header */}
        <motion.div
          className="flex justify-center mt-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <Button className="text-lg px-8 py-3">
            Comece agora - é gratis!
          </Button>
        </motion.div>
        {/* Subtítulo com cor mais apagada */}
        <motion.div
          className="flex justify-center mt-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <span className="text-zinc-400 text-lg text-center">
            A rede social feita para quem vive o mundo dos games.
          </span>
        </motion.div>
        {/* Grid de cards de jogos em alta */}
        <motion.section
          className="mt-10 flex justify-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-6 w-full px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48">
            {loading && (
              <div className="col-span-full text-center text-white">
                Carregando jogos...
              </div>
            )}
            {error && (
              <div className="col-span-full text-center text-red-500">
                {error}
              </div>
            )}
            {!loading &&
              !error &&
              games.slice(0, 6).map((game) => (
                <Link
                  key={game.id}
                  to={`/games/${game.id}`}
                  style={{ textDecoration: "none" }}
                  tabIndex={0}
                  aria-label={`Ver detalhes de ${game.name}`}
                >
                  <GameCard
                    game={game}
                    showOverlay={true}
                    showButton={true}
                    buttonText="Ver reviews"
                  />
                </Link>
              ))}
          </div>
        </motion.section>
        <motion.h2
          className="w-full text-2xl font-bold mb-8 text-center pt-15 text-white md:col-span-2"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Aqui você está no controle...
        </motion.h2>
        {/* Seção dividida em duas colunas */}
        <motion.section
          className="mt-16 flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12 w-full px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48 mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Coluna Esquerda */}
          <motion.div
            className="relative flex items-center justify-center w-full md:w-1/2 md:pl-0 mb-8 md:mb-0"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img
              src={gamepad1}
              alt="Controle"
              className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-auto object-cover rounded-2xl"
            />
            <div className=" w-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <GlassButton
                icon={Joystick}
                iconColor="#FF0000"
                text="Conheça tudo que você pode fazer."
                hoverGradient="hover:bg-gradient-to-br hover:from-red-500/30 hover:to-purple-500/30"
                hoverBorder="hover:border-red-400"
                hoverRing="hover:shadow-2xl hover:ring-2 hover:ring-red-400/40"
                hoverText="text-red-100"
                onClick={() => navigate("/guia")}
              />
            </div>
          </motion.div>
          {/* Coluna Direita*/}
          <motion.div
            className="relative grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-12 w-full md:w-1/2"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <img
              src={gamepad2}
              alt="Gamepad sobreposto"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 sm:w-64 md:w-96 h-auto z-0"
            />
            <GlassButton
              icon={Save}
              iconColor="#22d3ee"
              text="Registrar e avaliar seus jogos favoritos."
              hoverGradient="hover:bg-gradient-to-br hover:from-cyan-500/30 hover:to-purple-500/30"
              hoverBorder="hover:border-cyan-400"
              hoverRing="hover:shadow-2xl hover:ring-2 hover:ring-cyan-400/40"
              hoverText="text-cyan-100"
              onClick={() => navigate("/games")}
            />
            <GlassButton
              icon={Telescope}
              iconColor="#facc15"
              text="Descobrir novos títulos."
              hoverGradient="hover:bg-gradient-to-br hover:from-yellow-400/30 hover:to-orange-500/30"
              hoverBorder="hover:border-yellow-400"
              hoverRing="hover:shadow-2xl hover:ring-2 hover:ring-yellow-400/40"
              hoverText="text-yellow-100"
              onClick={() => navigate("/games")}
            />
            <GlassButton
              icon={Hourglass}
              iconColor="#ec4899"
              text="Economizar tempo vendo os jogos do momento"
              hoverGradient="hover:bg-gradient-to-br hover:from-pink-400/30 hover:to-purple-500/30"
              hoverBorder="hover:border-pink-400"
              hoverRing="hover:shadow-2xl hover:ring-2 hover:ring-pink-400/40"
              hoverText="text-pink-100"
              onClick={() => navigate("/games")}
            />
            <GlassButton
              icon={HeartPlus}
              iconColor="#22c55e"
              text="Ler avaliação dos seus jogos favoritos"
              hoverGradient="hover:bg-gradient-to-br hover:from-green-400/30 hover:to-blue-500/30"
              hoverBorder="hover:border-green-400"
              hoverRing="hover:shadow-2xl hover:ring-2 hover:ring-green-400/40"
              hoverText="text-green-100"
              onClick={() => navigate("/games")}
            />
          </motion.div>
        </motion.section>
        {/* Seção de comentário de usuário sobre um jogo */}
        <motion.h2
          className="w-full text-2xl font-bold mb-8 text-center pt-15 text-white md:col-span-2"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Comentários populares
        </motion.h2>
        <motion.section
          className="mt-16 flex flex-col md:flex-row items-center w-full px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32 mx-auto gap-4 md:gap-8 pb-6 md:pb-8 max-w-full sm:max-w-xl md:max-w-4xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="w-full flex justify-center items-center max-w-4xl mx-auto">
            <CommentSlider comments={comments} compact={true} />
          </div>
        </motion.section>
        {/* Preview de notícias */}
        <motion.section
          className="w-full flex flex-col items-center px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48 mt-10 md:mt-22"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            Últimas notícias
          </h2>
          <NewsPreview />
          <div className="flex justify-center mt-6 mb-10">
            <a
              href="/news"
              className="text-cyan-400 font-semibold hover:underline text-lg"
            >
              Ver todas as notícias
            </a>
          </div>
        </motion.section>
      </main>
    </>
  );
}

const GAME_KEYWORDS = [
  "game",
  "games",
  "jogo",
  "jogos",
  "videogame",
  "videogames",
  "xbox",
  "playstation",
  "nintendo",
  "switch",
  "ps5",
  "ps4",
  "console",
];

// Preview de notícias para a Home
function NewsPreview() {
  const { news, loading } = useNews();
  const previewNews = news.slice(0, 3);
  if (loading) return <div className="text-white">Carregando notícias...</div>;
  return <NewsPreviewGrid news={previewNews} />;
}
