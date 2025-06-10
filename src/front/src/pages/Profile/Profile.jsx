import React, { useState } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import ProfileTabs from "../../components/Profile/ProfileTabs";
import ProfileBio from "../../components/Profile/ProfileBio";
import ProfileStats from "../../components/Profile/ProfileStats";
import LikedGames from "../../components/Profile/LikedGames";
import GamesTab from "../../components/Profile/GamesTab";
import ActivityTab from "../../components/Profile/ActivityTab";
import ReviewsTab from "../../components/Profile/ReviewsTab";
import ListsTab from "../../components/Profile/ListsTab";
import ConnectionsTab from "../../components/Profile/ConnectionsTab";
import ProfileActionButton from "../../components/Profile/ProfileActionButton";
import ProfileTab from "../../components/Profile/ProfileTab";

// Abas do menu horizontal em português
const TABS = [
  { key: "profile", label: "Perfil" },
  { key: "liked", label: "Curtidos" },
  { key: "games", label: "Jogos" },
  { key: "activity", label: "Atividades" },
  { key: "reviews", label: "Reviews" },
  { key: "lists", label: "Listas" },
  { key: "connections", label: "Conexões" },
];

const TAB_COMPONENTS = {
  profile: ProfileTab,
  liked: LikedGames,
  games: GamesTab,
  activity: ActivityTab,
  reviews: ReviewsTab,
  lists: ListsTab,
  connections: ConnectionsTab,
};

export default function Profile() {
  const { username } = useParams();
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState("profile");
  const navigate = useNavigate();

  if (
    !user ||
    !username ||
    username.toLowerCase() !== user.nome.toLowerCase().replace(/\s+/g, "-")
  ) {
    return (
      <Navigate
        to={`/profile/${
          user ? user.nome.toLowerCase().replace(/\s+/g, "-") : ""
        }`}
        replace
      />
    );
  }

  const TabComponent = TAB_COMPONENTS[activeTab] || (() => <div />);

  return (
    <div className="min-h-[80vh] bg-zinc-900 text-zinc-200 px-0 md:px-48 py-10">
      {/* Topo do perfil */}
      <div className="flex flex-col md:flex-row items-center md:items-end gap-6 mb-4">
        <img
          src={user.imgUser}
          alt="Avatar"
          className="w-36 h-36 rounded-xl object-cover"
        />
        <div className="flex-1 flex flex-col md:flex-row md:items-end gap-2">
          <div>
            <h2 className="text-3xl font-bold">{user.nome}</h2>
          </div>
          <ProfileActionButton
            isOwner={
              username.toLowerCase() ===
              user.nome.toLowerCase().replace(/\s+/g, "-")
            }
            onEdit={() => navigate("/settings")}
            onFollow={() => {}}
          />
        </div>
      </div>
      {/* Menu horizontal de abas */}
      <ProfileTabs
        tabs={TABS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      {/* Conteúdo em duas colunas */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Coluna esquerda */}
        <aside className="w-full md:w-80 flex-shrink-0 flex flex-col gap-8">
          {/* Bio */}
          <ProfileBio user={user} onExpand={() => {}} />
          <ProfileStats />
        </aside>
        {/* Coluna direita */}
        <section className="flex-1 min-w-0">
          <TabComponent user={user} />
        </section>
      </div>
    </div>
  );
}
