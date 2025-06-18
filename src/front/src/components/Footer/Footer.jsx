import React from "react";

const Footer = () => {
  return (
    <footer className="bg-zinc-800 text-white py-6 px-8 md:px-48">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="md:text-xl text-cyan-500 font-bold">
            Game <span className="text-fuchsia-500">Pad</span>
          </span>
        </div>
        <ul className="flex gap-6 text-sm">
          <li className="md:text-base hover:text-cyan-500 transition-colors">
            <a href="/">Home</a>
          </li>
          <li className="md:text-base hover:text-cyan-500 transition-colors">
            <a href="/games">Jogos</a>
          </li>
          <li className="md:text-base hover:text-cyan-500 transition-colors">
            <a href="/news">Notícias</a>
          </li>
          <li className="md:text-base hover:text-cyan-500 transition-colors">
            <a href="/about">Sobre</a>
          </li>
          <li className="md:text-base hover:text-cyan-500 transition-colors">
            <a href="/guia">Guia</a>
          </li>
        </ul>

        <div className="text-sm text-zinc-400">
          © 2025 GamePad. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
