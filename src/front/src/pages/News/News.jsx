import React, { useState, createContext } from 'react'
import CardNews from '../../components/News/cardNews'
import newsBanner from "../../assets/newsBanner.png";


const UserContext = createContext();

export function UserProvider({ children }) {
  // ... your provider logic here
}

const News = () => {
  
  return (

    <main className="min-h-screen bg-zinc-900 py-8">
      <header className="flex justify-center items-start w-full">
        <div className="relative w-full md:px-full ">
          {/* Imagem principal do header, alinhada com a navbar */}
          <img
            src={newsBanner}
            alt="Header"
            className="mask-x-from-80%  mask-y-from-80% w-full h-130 object-cover h-[50vh]"
          />
          {/* Texto centralizado sobre a imagem, com transição para transparência */}
          <div className="absolute left-1/2 bottom-4 -translate-x-1/2 w-[90%] text-white text-center text-3xl font-semibold drop-shadow-lg pointer-events-none flex flex-col gap-y-2">
            <span>Acompanhe tudo sobre os Games</span>
          </div>
        </div>
      </header>



      <CardNews />
    </main>
  )
}

export default News