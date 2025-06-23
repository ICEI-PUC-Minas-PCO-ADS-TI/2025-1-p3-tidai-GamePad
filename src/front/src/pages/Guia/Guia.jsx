import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import guiaBanner from "../../assets/guiaBanner.png";
import { Button } from "../../components/Button/Button";
import GameCard from "../../components/Cards/GameCard";
import { Newspaper, Star, Heart, List, MessageCircle, Gamepad as Gamepad2 } from "lucide-react";
import { fetchGames } from "../../service/igdbService";
import { UserContext } from "../../context/UserContext";
import LoginModal from "../../components/Auth/LoginModal";


export default function Home() {
  // Estado para jogos da IGDB
  const [games, setGames] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);

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
  }, []);

  // Função para ir para o perfil ou mostrar modal de login
  const handleProfileClick = () => {
    if (user) {
      navigate(`/${user.nome.toLowerCase().replace(/\s+/g, "-")}`);
    } else {
      setShowLoginModal(true);
    }
  };
  return (
    <main className="w-full flex flex-col items-center px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48 py-6 sm:py-8 gap-6 sm:gap-8">
      <LoginModal open={showLoginModal} onClose={() => setShowLoginModal(false)} />
      <header className="flex justify-center items-start w-full max-w-[1440px]">
        <div className="relative w-full">
          <img
            src={guiaBanner}
            alt="Header"
            className="mask-x-from-80% mask-y-from-80% w-full h-[40vh] sm:h-[50vh] object-cover rounded-xl sm:rounded-2xl"
          />
          <div className="absolute left-1/2 bottom-4 -translate-x-1/2 w-[90%] text-white text-center text-xl sm:text-2xl md:text-3xl font-semibold drop-shadow-lg pointer-events-none flex flex-col gap-y-2">
            <span>Bem-vindo ao seu guia</span>
          </div>
        </div>
      </header>

      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8 text-cyan-400 text-center w-full max-w-[1440px]">
        Seus controles disponíveis 
      </h1>{/* Página de Jogos */}
      <section className="mb-6 sm:mb-8 md:mb-10 bg-zinc-800 text-white rounded-xl p-4 sm:p-6 shadow-lg w-full max-w-5xl">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 flex items-center gap-2">
          <Gamepad2 className="inline w-5 h-5 sm:w-6 sm:h-6" /> Página de Jogos
        </h2>
        <ul className="list-disc ml-4 sm:ml-6 space-y-2 text-sm sm:text-base">
          <li>Filtre jogos por gênero, plataforma, ano e notas.</li>
          <li>Veja detalhes de cada jogo que lhe interresou.</li>
          <li>
            <span className="inline-flex items-center gap-1">
              <Star className="inline w-4 h-4 text-yellow-400" /> Avalie jogos com estrelas.
            </span>
          </li>
          <li>
            <span className="inline-flex items-center gap-1">
              <Heart className="inline w-4 h-4 text-pink-400" /> Adicione aos seus favoritos
            </span>
          </li>
          <li>Veja a média das avaliações dos usuários.</li>
        </ul>
        <div className="flex justify-center mt-4 sm:mt-6">
          <Button onClick={() => window.location.href = "/games"}>
            Ir para página de Jogos
          </Button>
        </div>
      </section>

      {/* Reviews e Comentários */}
      <section className="mb-6 sm:mb-8 md:mb-10 bg-zinc-800 text-white rounded-xl p-4 sm:p-6 shadow-lg w-full max-w-5xl">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 flex items-center gap-2">
          <MessageCircle className="inline w-5 h-5 sm:w-6 sm:h-6" /> Reviews e Comentários
        </h2>
        <ul className="list-disc ml-4 sm:ml-6 space-y-2 text-sm sm:text-base">
          <li>Leia reviews e comentários de outros usuários.</li>
          <li>Escreva sua própria review e compartilhe sua experiência.</li>
          <li>Filtre comentários por mais recentes ou mais curtidos.</li>
        </ul>
        <div className="flex justify-center mt-6 sm:mt-8 w-full">
          <h3 className="w-full text-lg sm:text-xl font-bold mb-6 sm:mb-8 text-center pt-6 sm:pt-8 text-white">
            Quer avaliar ou comentar sobre estes jogos? Clique e faça seu review!
          </h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-6 w-full">
          {loading && (
            <div className="col-span-6 text-center text-white">
              Carregando jogos...
            </div>
          )}
          {error && (
            <div className="col-span-6 text-center text-red-500">{error}</div>
          )}          {!loading &&
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
      </section>

      {/* Perfil Personalizável */}
      <section className="mb-6 sm:mb-8 md:mb-10 bg-zinc-800 text-white rounded-xl p-4 sm:p-6 shadow-lg w-full max-w-5xl">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 flex items-center gap-2">
          <List className="inline w-5 h-5 sm:w-6 sm:h-6" /> Perfil Personalizável
        </h2>
        <ul className="list-disc ml-4 sm:ml-6 space-y-2 text-sm sm:text-base">
          <li>Adicione seu nome, biografia, jogos favoritos, mude sua imagem de perfil.</li>
          <li>Marque jogos como zerados, jogando ou na lista de desejos ou favoritos.</li>
          <li>Veja e gerencie suas próprias avaliações e comentários.</li>
        </ul>
        <div className="flex justify-center mt-4 sm:mt-6">
          <Button onClick={handleProfileClick}>
            Ir para página de Perfil
          </Button>
        </div>
      </section>

      {/* News */}
      <section className="mb-6 sm:mb-8 md:mb-10 bg-zinc-800 text-white rounded-xl p-4 sm:p-6 shadow-lg w-full max-w-5xl">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 flex items-center gap-2">
          <Newspaper className="inline w-5 h-5 sm:w-6 sm:h-6" /> Noticias e Atualizações do mundo dos games
        </h2>
        <ul className="list-disc ml-4 sm:ml-6 space-y-2 text-sm sm:text-base">
          <li>Acompanhe noticias fresacas dos maiores insiders do mundo</li>
          <li>Veja vazamentos e muito mais na nossa page de noticias</li>
        </ul>
        <div className="flex justify-center mt-4 sm:mt-6">
          <Button onClick={() => window.location.href = "/news"}>
            Ir para página de Noticias
          </Button>
        </div>
      </section>
    </main>
  );
}
