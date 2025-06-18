import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import ProfileTabs from "../../components/Profile/ProfileTabs";
import ProfileBio from "../../components/Profile/ProfileBio";
import ProfileStats from "../../components/Profile/ProfileStats";
import GamesTab from "../../components/Profile/GamesTab";
import ReviewsTab from "../../components/Profile/ReviewsTab";
import ListsTab from "../../components/Profile/ListsTab";
import ProfileActionButton from "../../components/Profile/ProfileActionButton";
import ProfileTab from "../../components/Profile/ProfileTab";
import { fetchUserGamesWithStatuses } from "../../service/userGamesService";

// Abas do menu horizontal em português
const TABS = [
  { key: "profile", label: "Perfil" },
  { key: "games", label: "Jogos" },
  { key: "reviews", label: "Reviews" },
  { key: "lists", label: "Listas" },
];

const TAB_COMPONENTS = {
  profile: ProfileTab,
  games: GamesTab,
  reviews: ReviewsTab,
  lists: ListsTab,
};

export default function Profile() {
  const { username } = useParams();
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState("profile");
  const [userGames, setUserGames] = useState([]);
  const [loadingGames, setLoadingGames] = useState(false);
  const [profileUser, setProfileUser] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Buscar dados do usuário pelo username da URL
  useEffect(() => {
    if (!username) return;
    setLoadingProfile(true);
    fetch(`http://localhost:5069/api/Usuarios/username/${username}`)
      .then((res) => {
        if (!res.ok) throw new Error("Usuário não encontrado");
        return res.json();
      })
      .then((data) => {
        setProfileUser(data);
        setError("");
      })
      .catch(() => setError("Usuário não encontrado."))
      .finally(() => setLoadingProfile(false));
  }, [username]);

  // Buscar jogos do usuário do perfil
  useEffect(() => {
    if (!profileUser?.id) return;
    setLoadingGames(true);
    fetchUserGamesWithStatuses(profileUser.id)
      .then(setUserGames)
      .catch(() => setUserGames([]))
      .finally(() => setLoadingGames(false));
  }, [profileUser]);

  const TabComponent = TAB_COMPONENTS[activeTab] || (() => <div />);

  if (loadingProfile)
    return <div className="text-zinc-400">Carregando perfil...</div>;
  if (error) return <div className="text-red-400">{error}</div>;
  if (!profileUser) return null;

  return (
    <div className="min-h-[80vh] bg-zinc-900 text-zinc-200 px-0 md:px-48 py-10">
      {/* Topo do perfil */}
      <div className="flex flex-col md:flex-row items-center md:items-end gap-6 mb-4">
        {(() => {
          const navbarImg =
            profileUser.imgUser &&
            profileUser.imgUser.startsWith("/profile-images/")
              ? `http://localhost:5069${profileUser.imgUser}`
              : profileUser.imgUser;
          return (
            <img
              src={navbarImg}
              alt="Avatar"
              className="w-36 h-36 rounded-xl object-cover"
            />
          );
        })()}
        <div className="flex-1 flex flex-col md:flex-row md:items-end gap-2">
          <div>
            <h2 className="text-3xl font-bold">{profileUser.nome}</h2>
          </div>
          <ProfileActionButton
            isOwner={
              user &&
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
          <ProfileBio user={profileUser} onExpand={() => {}} />
          <ProfileStats userGames={userGames} />
        </aside>
        {/* Coluna direita */}
        <section className="flex-1 min-w-0">
          {/* Passe o usuário para o TabComponent */}
          {activeTab === "reviews" ? (
            <ReviewsTab userId={profileUser?.id} userName={profileUser?.nome} />
          ) : activeTab === "games" ? (
            loadingGames ? (
              <div className="text-zinc-400">Carregando jogos...</div>
            ) : (
              <GamesTab userGames={userGames} />
            )
          ) : activeTab === "lists" ? (
            <ListsTab user={profileUser} />
          ) : (
            <TabComponent user={profileUser} />
          )}
        </section>
      </div>
    </div>
  );
}
