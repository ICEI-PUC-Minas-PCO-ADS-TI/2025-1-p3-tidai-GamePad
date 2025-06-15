import React from "react";
import { Link } from "react-router-dom";
import guiaBanner from "../../assets/guia1.png";
import gamepad1 from "../../assets/gamepad1.png";
import gamepad2 from "../../assets/gamepad2.png";
import { Button } from "../../components/Button/Button";
import GameCard from "../../components/Cards/GameCard";
import { Save, Hourglass, Telescope, HeartPlus, Joystick, Newspaper, Star, Heart, List, MessageCircle, Gamepad as Gamepad2 } from "lucide-react";
import GlassButton from "../../components/GlassButton/GlassButton";
import CommentSlider from "../../components/slider/CommentSlider";
import { fetchGames } from "../../service/igdbService";

export default function Home() {
  

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
  }, []);

  console.log("Jogos carregados:", games);

  return (
    <main className="w-full flex flex-col items-center">
      <header className="flex justify-center items-start w-full max-w-[1440px]">
        <div className="relative w-full md:px-full ">
          {/* Imagem principal do header, alinhada com a navbar */}
          <img
            src={guiaBanner}
            alt="Header"
            className="mask-x-from-80%  mask-y-from-80%  w-full h-150 object-cover"
          />
          {/* Texto centralizado sobre a imagem, com transição para transparência */}
          <div className="absolute left-1/2 bottom-4 -translate-x-1/2 w-[90%] text-white text-center text-3xl font-semibold drop-shadow-lg pointer-events-none flex flex-col gap-y-2">
            <span>Bem-vindo ao seu guia</span>

          </div>
        </div>
      </header>

      <h1 className="text-3xl font-bold mb-8 text-cyan-400 text-center w-full max-w-[1440px]">
        Guia rápido das funcionalidades
      </h1>

      {/* Página de Jogos */}
      <section className="mb-10 bg-zinc-800 text-white rounded-xl p-6 shadow-lg w-[80%]">
        <h2 className="font-semibold mb-4 flex items-center gap-2">
          <Gamepad2 className="inline" /> Página de Jogos
        </h2>
        <ul className="list-disc ml-6 space-y-2">
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
        <div className="flex justify-center mt-6">
          <Button onClick={() => window.location.href = "/games"}>
            Ir para página de Jogos
          </Button>
        </div>
      </section>

      {/* Reviews e Comentários */}
      <section className="mb-10 bg-zinc-800 text-white rounded-xl p-6 shadow-lg w-[80%]">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <MessageCircle className="inline" /> Reviews e Comentários
        </h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>Leia reviews e comentários de outros usuários.</li>
          <li>Escreva sua própria review e compartilhe sua experiência.</li>
          <li>Filtre comentários por mais recentes ou mais curtidos.</li>
        </ul>
        <div className="flex justify-center mt-8 w-full">
          <h3 className="w-full text-xl font-bold mb-8 text-center pt-8 text-white md:col-span-2">
            Quer avaliar ou comentar sobre estes jogos? Clique e faça seu review!
          </h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 w-full">
          {loading && (
            <div className="col-span-6 text-center text-white">
              Carregando jogos...
            </div>
          )}
          {error && (
            <div className="col-span-6 text-center text-red-500">{error}</div>
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
      </section>

      {/* Perfil Personalizável */}
      <section className="mb-10 bg-zinc-800 text-white rounded-xl p-6 shadow-lg w-[80%]">
        <h2 className="text-2xl font-semibold mb-4 flex w items-center gap-2">
          <List className="inline" /> Perfil Personalizável
        </h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>Adicione seu nome, biografia, jogos favoritos, mude sua imagem de perfil.</li>
          <li>Marque jogos como zerados, jogando ou na lista de desejos ou favoritos.</li>
          <li>Veja e gerencie suas próprias avaliações e comentários.</li>
        </ul>
        <div className="flex justify-center mt-6">
          <Button onClick={() => window.location.href = "/profile"}>
            Ir para página de Perfil
          </Button>
        </div>
      </section>

      {/* News */}
      <section className="mb-10 bg-zinc-800 text-white rounded-xl p-6 shadow-lg w-[80%]">
        <h2 className="text-2xl font-semibold mb-4 flex w items-center gap-2">
          <Newspaper className="inline" /> Noticias e Atualizações do mundo dos games
        </h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>Acompanhe noticias fresacas dos maiores insiders do mundo</li>
          <li>Veja vazamentos e muito mais na nossa page de noticias</li>
        </ul>
        <div className="flex justify-center mt-6">
          <Button onClick={() => window.location.href = "/news"}>
            Ir para página de Noticias
          </Button>
        </div>
      </section>



    </main>
  );
}
