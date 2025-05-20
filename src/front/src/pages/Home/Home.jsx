import { Link } from "react-router-dom";
import "./Home.css";
import imgHeader from "../../assets/imgHeader.jpg";
import gamepad1 from "../../assets/gamepad1.png";
import gamepad2 from "../../assets/gamepad2.png";
import Capa1 from "../../assets/capa1.jpg";
import { Button } from "../../components/Button/Button";
import SimpleCard from "../../components/cards/SimpleCard";
import { Save, Hourglass, Telescope, HeartPlus } from "lucide-react";

export default function Home() {
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
        {/* Seção dividida em duas colunas: esquerda texto+imagem, direita botões glass */}
        <section className="mt-16 flex flex-col md:flex-row justify-center items-center gap-12 w-full px-48 mx-auto">
          {/* Coluna Esquerda: título e imagem */}
          <div className="flex flex-col items-center  w-full md:w-1/2">
            <h2 className="text-2xl font-bold mb-8 text-center md:text-left text-white">
              Aqui você está no controle...
            </h2>
            <img
              src={gamepad1}
              alt="Controle"
              className="w-128 h-128 md:w-108 md:h-108 object-cover rounded-2xl "
            />
          </div>
          {/* Coluna Direita: grid dos botões glass com imagem sobreposta atrás */}
          <div className="relative grid grid-cols-2 gap-12 w-full md:w-1/2">
            {/* Imagem de fundo, fica atrás dos botões */}
            <img
              src={gamepad2}
              alt="Gamepad sobreposto"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-128 h-128 z-0"
            />
            {/* Botão 1: Salvar/Avaliar */}
            <div className="backdrop-blur-md bg-white/20 border border-white/20 rounded-full flex items-center justify-center p-6 shadow-lg z-10 gap-4 cursor-pointer group transition-all duration-300 hover:scale-105 hover:bg-gradient-to-br hover:from-cyan-500/30 hover:to-purple-500/30 hover:border-cyan-400 hover:shadow-2xl hover:ring-2 hover:ring-cyan-400/40">
              <Save className="w-8 h-8 text-cyan-400 flex-shrink-0 transition-colors duration-300 group-hover:text-white" />
              <span className="md:text-sm text-xl  text-white text-left transition-colors duration-300 group-hover:text-cyan-100">
                Registrar e avaliar seus jogos favoritos.
              </span>
            </div>
            {/* Botão 2: Descobrir */}
            <div className="backdrop-blur-md bg-white/20 border border-white/20 rounded-full flex items-center justify-center p-6 shadow-lg z-10 gap-4 cursor-pointer group transition-all duration-300 hover:scale-105 hover:bg-gradient-to-br hover:from-yellow-400/30 hover:to-orange-500/30 hover:border-yellow-400 hover:shadow-2xl hover:ring-2 hover:ring-yellow-400/40">
              <Telescope className="w-8 h-8 text-yellow-400 flex-shrink-0 transition-colors duration-300 group-hover:text-white" />
              <span className="md:text-sm text-xl  text-white text-left transition-colors duration-300 group-hover:text-yellow-100">
                Descobrir novos títulos.
              </span>
            </div>
            {/* Botão 3: Economizar tempo */}
            <div className="backdrop-blur-md bg-white/20 border border-white/20 rounded-full flex items-center justify-center p-6 shadow-lg z-10 gap-4 cursor-pointer group transition-all duration-300 hover:scale-105 hover:bg-gradient-to-br hover:from-pink-400/30 hover:to-purple-500/30 hover:border-pink-400 hover:shadow-2xl hover:ring-2 hover:ring-pink-400/40">
              <Hourglass className=" w-8 h-8 text-pink-400 flex-shrink-0 transition-colors duration-300 group-hover:text-white" />
              <span className="md:text-sm text-xl md:text-  text-white text-left transition-colors duration-300 group-hover:text-pink-100">
                Economizar tempo vendo os jogos do momento
              </span>
            </div>
            {/* Botão 4: Ler avaliações */}
            <div className="backdrop-blur-md bg-white/20 border border-white/20 rounded-full flex items-center justify-center p-6 shadow-lg z-10 gap-4 cursor-pointer group transition-all duration-300 hover:scale-105 hover:bg-gradient-to-br hover:from-green-400/30 hover:to-blue-500/30 hover:border-green-400 hover:shadow-2xl hover:ring-2 hover:ring-green-400/40">
              <HeartPlus className="w-8 h-8 text-green-400 flex-shrink-0 transition-colors duration-300 group-hover:text-white" />
              <span className="md:text-sm text-xl  text-white text-left transition-colors duration-300 group-hover:text-green-100">
                Ler avaliação dos seus jogos favoritos
              </span>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
