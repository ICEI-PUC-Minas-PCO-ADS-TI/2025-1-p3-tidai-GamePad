import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ProfileTabs({ tabs, activeTab, onTabChange }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Atualiza a opção no menu horizontal com base na query string
  // Se a query string tiver ?tab=..., atualiza o estado do componente
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabParam = params.get("tab");
    if (tabParam && tabParam !== activeTab) {
      onTabChange(tabParam);
    }
  }, [location.search]);

  // Ao clicar vai atualiza a query string ?tab=nome-da-aba 
  function handleTabClick(tabKey) {
    const params = new URLSearchParams(location.search);
    params.set("tab", tabKey);
    navigate({ search: params.toString() }, { replace: true });
    onTabChange(tabKey);
  }

  return (
    <div className="flex gap-2 border-b border-zinc-700 mb-8">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          className={`px-4 py-2 font-semibold transition border-b-2 cursor-pointer ${
            activeTab === tab.key
              ? "border-pink-400 text-pink-400"
              : "border-transparent text-zinc-300 hover:text-cyan-400"
          }`}
          onClick={() => handleTabClick(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
