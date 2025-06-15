import React, { useState } from 'react'
import CardNews from '../../components/News/cardNews'
import imgHeader from "../../assets/imgHeader.jpg";


const News = () => {
  const [date, setDate] = useState("today");
  const [platform, setPlatform] = useState("");
  const [search, setSearch] = useState("");

  const handleFilter = () => {
    onFilter({ date, platform, search });
  };

  return (

    <main className="min-h-screen bg-zinc-900 py-8">
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
            <span>Acompanhe tudo sobre os Games</span>
          </div>
        </div>
      </header>



      <CardNews />
    </main>
  )
}

export default News