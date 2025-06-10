import React, { useState } from "react";
import { useUser } from "../../context/UserContext";
import {
  User,
  Settings as SettingsIcon,
  Mail,
  Lock,
  Trash2,
} from "lucide-react";

const sidebarItems = [
  {
    key: "edit-profile",
    label: "Perfil",
    icon: <User size={20} className="mr-3" />,
    desc: "Customize seu perfil do jeito que quiser",
  },
  {
    key: "account",
    label: "Conta",
    icon: <SettingsIcon size={20} className="mr-3" />,
    desc: "Atualize suas informações de conta",
  },
];

export default function Settings() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState("edit-profile");
  // Campos para os jogos favoritos
  const [favoriteGames, setFavoriteGames] = useState(
    user?.favoriteGames?.length === 5 ? user.favoriteGames : Array(5).fill("")
  );

  const handleFavoriteGameChange = (idx, value) => {
    setFavoriteGames((prev) => {
      const updated = [...prev];
      updated[idx] = value;
      return updated;
    });
  };

  return (
    <div className="min-h-[80vh] bg-zinc-900 text-zinc-200 px-0 md:px-48 py-10">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar */}
        <aside className="w-full md:w-80 max-w-xs flex-shrink-0">
          <h2 className="text-2xl font-bold text-zinc-100 mb-2">
            Configurações
          </h2>
          <nav className="flex flex-col gap-1">
            {sidebarItems.map((item) => (
              <button
                key={item.key}
                className={`cursor-pointer flex flex-col items-start w-full text-left px-5 py-3 rounded-lg transition-all border border-transparent
                  ${
                    activeTab === item.key
                      ? "bg-zinc-800 border-cyan-600 text-cyan-300 shadow"
                      : "hover:bg-zinc-800 text-zinc-300"
                  }
                `}
                onClick={() => setActiveTab(item.key)}
              >
                <span className="flex items-center text-base font-semibold">
                  {item.icon}
                  {item.label}
                </span>
                <span className="text-xs text-zinc-400 mt-1">{item.desc}</span>
              </button>
            ))}
          </nav>
        </aside>
        {/* Conteúdo principal */}
        <section className="flex-1 min-w-0">
          {activeTab === "edit-profile" && (
            <div className="max-w-2xl">
              <h1 className="text-3xl font-bold text-cyan-400 mb-8">Perfil</h1>
              <form className="flex flex-col gap-8">
                <div>
                  <label className="block text-zinc-400 mb-1 font-medium">
                    Nome de usuário
                  </label>
                  <input
                    type="text"
                    defaultValue={user?.nome}
                    className="w-full px-3 py-2 rounded bg-zinc-900 text-zinc-200 border border-zinc-700 focus:border-cyan-500 outline-none transition"
                  />
                  <span className="text-xs text-zinc-500 mt-1 block">
                    Altere o nome que aparece no seu perfil.
                  </span>
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1 font-medium">
                    Avatar
                  </label>
                  <div className="flex items-center gap-4">
                    <img
                      src={user?.imgUser}
                      alt="Avatar"
                      className="w-20 h-20 rounded-lg object-cover border border-zinc-700"
                    />
                    <button
                      type="button"
                      className="px-4 cursor-pointer py-2 rounded bg-zinc-800 text-cyan-400 border border-cyan-700 hover:bg-cyan-700 hover:text-white transition"
                    >
                      Alterar
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1 font-medium">
                    Biografia
                  </label>
                  <textarea
                    defaultValue={user?.bio}
                    rows={3}
                    placeholder="Conte um pouco sobre você..."
                    className="w-full px-3 py-2 rounded bg-zinc-900 text-zinc-200 border border-zinc-700 focus:border-cyan-500 outline-none transition resize-none"
                  />
                </div>
                {/* Campo para jogos favoritos */}
                <div>
                  <label className="block text-zinc-400 mb-2 font-medium">
                    Seus 5 jogos favoritos
                  </label>
                  <div className="flex flex-col gap-3">
                    {favoriteGames.map((game, idx) => (
                      <input
                        key={idx}
                        type="text"
                        placeholder={`Jogo favorito #${idx + 1}`}
                        value={game}
                        onChange={(e) =>
                          handleFavoriteGameChange(idx, e.target.value)
                        }
                        className="w-full px-3 py-2 rounded bg-zinc-900 text-zinc-200 border border-zinc-700 focus:border-cyan-500 outline-none transition"
                      />
                    ))}
                  </div>
                  <span className="text-xs text-zinc-500 mt-1 block">
                    Escolha até 5 jogos que representam você!
                  </span>
                </div>
                <button
                  type="submit"
                  className="cursor-pointer bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded font-semibold transition self-start"
                >
                  Salvar Alterações
                </button>
              </form>
            </div>
          )}
          {activeTab === "edit-profile" && (
            <hr className="my-12 border-zinc-700" />
          )}
          {activeTab === "account" && (
            <div className="max-w-2xl">
              <h1 className="text-3xl font-bold text-cyan-400 mb-8">Conta</h1>
              <form className="flex flex-col gap-8">
                <div>
                  <label className="block text-zinc-400 mb-1 font-medium flex items-center">
                    <Mail size={16} className="mr-2" /> Email
                  </label>
                  <input
                    type="email"
                    defaultValue={user?.email}
                    className="w-full px-3 py-2 rounded bg-zinc-900 text-zinc-200 border border-zinc-700 focus:border-cyan-500 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1 font-medium flex items-center">
                    <Lock size={16} className="mr-2" /> Nova Senha
                  </label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 rounded bg-zinc-900 text-zinc-200 border border-zinc-700 focus:border-cyan-500 outline-none transition"
                    placeholder="Deixe em branco se não quiser alterar"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1 font-medium">
                    Confirmar Nova Senha
                  </label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 rounded bg-zinc-900 text-zinc-200 border border-zinc-700 focus:border-cyan-500 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1 font-medium">
                    Senha Atual
                  </label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 rounded bg-zinc-900 text-zinc-200 border border-zinc-700 focus:border-cyan-500 outline-none transition"
                  />
                </div>
                <button
                  type="submit"
                  className="cursor-pointer bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded font-semibold transition self-start"
                >
                  Salvar Alterações
                </button>
              </form>
              <hr className="my-12 border-zinc-700" />
              {/* Apagar conta */}
              <div>
                <h2 className="text-xl font-bold text-red-400 mb-2 flex items-center">
                  <Trash2 size={18} className="mr-2" />
                  Apagar Conta
                </h2>
                <p className="mb-4 text-zinc-400">
                  Esta ação é irreversível. Todos os seus dados serão
                  permanentemente excluídos.
                </p>
                <button
                  className="cursor-pointer bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded font-semibold transition"
                  // onClick={handleDeleteAccount}
                >
                  Apagar Conta
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
