import { Link } from "react-router-dom";
import "./Home.css";
import imgHeader from "../../assets/imgHeader.jpg";
import gamepad1 from "../../assets/gamepad1.png";
import gamepad2 from "../../assets/gamepad2.png";
import Capa1 from "../../assets/capa1.jpg";
import { Button } from "../../components/Button/Button";
import SimpleCard from "../../components/cards/SimpleCard";
import { Save, Hourglass, Telescope, HeartPlus } from "lucide-react";
import GlassButton from "../../components/GlassButton/GlassButton";
import CommentSlider from "../../components/slider/CommentSlider";

export default function Home() {
  // Comentários para o slider
  const comments = [
    {
      cover: Capa1,
      gameTitle: "Cyberpunk: 2077",
      gameYear: "2023",
      userAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
      userName: "Yalle Gamer",
      stars: 4,
      comment: "Me sinto um samurai em night city!",
      likes: 32,
    },
    {
      cover: Capa1,
      gameTitle: "The Witcher 3",
      gameYear: "2015",
      userAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
      userName: "Andry Jogos",
      stars: 5,
      comment: "É o bruxão não tem como",
      likes: 54,
    },
    {
      cover: Capa1,
      gameTitle: "Hollow Knight",
      gameYear: "2017",
      userAvatar: "https://randomuser.me/api/portraits/men/65.jpg",
      userName: "Alex Tutoriais",
      stars: 5,
      comment: "Um dos melhores indies que já joguei.",
      likes: 41,
    },
  ];

  return (
    <>
      <main>
        <header className="flex justify-center items-start w-full">
          <div className="relative w-full md:px-full ">
            {/* Imagem principal do header, alinhada com a navbar */}
            <img
              src={imgHeader}
              alt="Header"
              className="mask-x-from-70% mask-x-to-90% mask-y-from-80% mask-y-to-90% w-full h-150 object-cover rounded-3xl"
            />
            {/* Texto centralizado sobre a imagem, com transição para transparência */}
            <div className="absolute left-1/2 bottom-4 -translate-x-1/2 w-[90%] text-white text-center text-3xl font-semibold drop-shadow-lg pointer-events-none flex flex-col gap-y-2">
              <span>Acompanhe os jogos que você zerou.</span>
              <span>Salve os que quer jogar.</span>
              <span>Compartilhe o que realmente vale a pena.</span>
            </div>
          </div>
        </header>
        {/* Botão principal, centralizado abaixo do header */}
        <div className="flex justify-center mt-8">
          <Button className="text-lg px-8 py-3">
            Comece agora - é gratis!
          </Button>
        </div>
        {/* Subtítulo com cor mais apagada */}
        <div className="flex justify-center mt-8">
          <span className="text-zinc-400 text-lg text-center">
            A rede social feita para quem vive o mundo dos games.
          </span>
        </div>
        {/* Grid de cards de jogos em alta */}
        <section className="mt-10 flex justify-center">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 w-full px-48 ">
            {/* Todos os cards usam o mesmo componente e imagem por enquanto */}
            <SimpleCard src={Capa1} alt="Capa 1" />
            <SimpleCard src={Capa1} alt="Capa 2" />
            <SimpleCard src={Capa1} alt="Capa 3" />
            <SimpleCard src={Capa1} alt="Capa 4" />
            <SimpleCard src={Capa1} alt="Capa 5" />
            <SimpleCard src={Capa1} alt="Capa 6" />
          </div>
        </section>
        <h2 className="w-full text-2xl font-bold mb-8 text-center pt-15 text-white md:col-span-2">
          Aqui você está no controle...
        </h2>
        {/* Seção dividida em duas colunas */}
        <section className="mt-16 flex flex-col md:flex-row justify-center items-center gap-12 w-full px-48 mx-auto">
          {/* Coluna Esquerda */}
          <div className="flex flex-col items-center md:items-start w-full md:w-1/2 md:pl-0">
            <img
              src={gamepad1}
              alt="Controle"
              className="w-128 h-128 md:w-108 md:h-108 object-cover rounded-2xl"
            />
          </div>
          {/* Coluna Direita*/}
          <div className="relative grid grid-cols-2 gap-12 w-full md:w-1/2">
            <img
              src={gamepad2}
              alt="Gamepad sobreposto"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-128 h-128 z-0"
            />
            <GlassButton
              icon={Save}
              iconColor="#22d3ee"
              text="Registrar e avaliar seus jogos favoritos."
              hoverGradient="hover:bg-gradient-to-br hover:from-cyan-500/30 hover:to-purple-500/30"
              hoverBorder="hover:border-cyan-400"
              hoverRing="hover:shadow-2xl hover:ring-2 hover:ring-cyan-400/40"
              hoverText="text-cyan-100"
            />
            <GlassButton
              icon={Telescope}
              iconColor="#facc15"
              text="Descobrir novos títulos."
              hoverGradient="hover:bg-gradient-to-br hover:from-yellow-400/30 hover:to-orange-500/30"
              hoverBorder="hover:border-yellow-400"
              hoverRing="hover:shadow-2xl hover:ring-2 hover:ring-yellow-400/40"
              hoverText="text-yellow-100"
            />
            <GlassButton
              icon={Hourglass}
              iconColor="#ec4899"
              text="Economizar tempo vendo os jogos do momento"
              hoverGradient="hover:bg-gradient-to-br hover:from-pink-400/30 hover:to-purple-500/30"
              hoverBorder="hover:border-pink-400"
              hoverRing="hover:shadow-2xl hover:ring-2 hover:ring-pink-400/40"
              hoverText="text-pink-100"
            />
            <GlassButton
              icon={HeartPlus}
              iconColor="#22c55e"
              text="Ler avaliação dos seus jogos favoritos"
              hoverGradient="hover:bg-gradient-to-br hover:from-green-400/30 hover:to-blue-500/30"
              hoverBorder="hover:border-green-400"
              hoverRing="hover:shadow-2xl hover:ring-2 hover:ring-green-400/40"
              hoverText="text-green-100"
            />
          </div>
        </section>
        {/* Seção de comentário de usuário sobre um jogo */}
        <section className="mt-16 flex flex-col md:flex-row items-center w-full px-48 mx-auto gap-8 pb-8">
          <CommentSlider comments={comments} />
        </section>
      </main>
    </>
  );
}
