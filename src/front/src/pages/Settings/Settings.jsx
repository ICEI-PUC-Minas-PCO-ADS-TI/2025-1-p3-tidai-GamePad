import React, { useState } from "react";
import FavoriteGamesInput from "../../components/Profile/FavoriteGamesInput";
import { useUser } from "../../context/UserContext";
import {
  updateUser,
  deleteUser,
  verifyPasswordById,
} from "../../service/userService";
import PasswordConfirmModal from "../../components/Modals/PasswordConfirmModal";
import { useNavigate, Navigate } from "react-router-dom";
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
  // Estado para modal de confirmação de senha ao apagar conta
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState(null);
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("edit-profile");
  // Campos para os jogos favoritos (array de objetos {id, name})
  let initialFav = [];
  if (user?.favoriteGames) {
    if (Array.isArray(user.favoriteGames)) {
      initialFav = user.favoriteGames;
    } else if (typeof user.favoriteGames === "string") {
      try {
        const arr = JSON.parse(user.favoriteGames);
        if (Array.isArray(arr)) {
          initialFav = arr;
        }
      } catch {
        /* empty */
      }
    }
  }
  const [favoriteGames, setFavoriteGames] = useState(
    initialFav.map((g) => {
      return typeof g === "object" ? g : { id: g };
    })
  );

  // States para os campos editáveis
  const [nome, setNome] = useState(user?.nome || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [email, setEmail] = useState(user?.email || "");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [senhaAtual, setSenhaAtual] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // Função para selecionar a imagem (apenas pré-visualização)
  function handleImageSelect(e) {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedImage({
      file,
      preview: URL.createObjectURL(file),
    });
  }

  // Atualizar perfil
  async function handleProfileSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setAlert(null);
    try {
      let imgUser = user.imgUser;
      let cacheBuster = "";
      // Se uma nova imagem foi selecionada, faz upload primeiro
      if (selectedImage && selectedImage.file) {
        const formData = new FormData();
        formData.append("image", selectedImage.file);
        const response = await fetch(
          `http://localhost:5069/api/Usuarios/${user.id}/upload-image`,
          {
            method: "POST",
            body: formData,
          }
        );
        if (!response.ok) throw new Error("Erro ao enviar imagem");
        const data = await response.json();
        imgUser = data.imgUser;
        cacheBuster = `?t=${Date.now()}`; // força recarregar a imagem
      }
      // Garante que favoriteGames seja sempre array de IDs (nunca array de objetos)
      const favIds = favoriteGames.filter((g) => g && g.id).map((g) => g.id);
      const updated = {
        Id: user.id,
        nome: nome,
        bio: bio,
        favoriteGames: JSON.stringify(favIds),
        email: user.email,
        imgUser: imgUser,
        tipo: user.tipo,
        // NÃO envie senha aqui!
      };
      await updateUser(user.id, updated);
      setUser({
        ...user,
        nome: nome,
        bio: bio,
        favoriteGames: JSON.stringify(favIds),
        imgUser: imgUser + cacheBuster, // força atualização da imagem
      });
      setSelectedImage(null); // Limpa a seleção após salvar
      setAlert({ type: "success", message: "Perfil atualizado!" });
    } catch (err) {
      setAlert({ type: "error", message: err.message });
    } finally {
      setLoading(false);
    }
  }

  // Atualizar conta (email/senha)
  async function handleAccountSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setAlert(null);
    // Checa se senha atual foi preenchida
    if (!senhaAtual) {
      setAlert({
        type: "error",
        message: "Para alterar o e-mail ou senha, preencha sua senha atual.",
      });
      setLoading(false);
      return;
    }
    // Checa se as novas senhas coincidem
    if (novaSenha && novaSenha !== confirmarSenha) {
      setAlert({ type: "error", message: "As senhas não coincidem." });
      setLoading(false);
      return;
    }
    // Valida senha atual no backend usando o ID do usuário (robusto mesmo após alteração de email)
    const senhaValida = await verifyPasswordById(user.id, senhaAtual);
    if (!senhaValida) {
      setAlert({ type: "error", message: "Senha atual incorreta." });
      setLoading(false);
      return;
    }
    try {
      // Envie apenas os campos alterados
      const updated = { Id: user.id };
      if (email !== user.email) updated.email = email;
      if (novaSenha) updated.senha = novaSenha;
      const updatedUser = await updateUser(user.id, updated);
      // Atualiza o contexto/local se necessário
      if (updatedUser) {
        setUser(updatedUser);
        setEmail(updatedUser.email);
      } else {
        setUser({
          ...user,
          ...(updated.email ? { email: updated.email } : {}),
        });
        if (updated.email) setEmail(updated.email);
      }
      setAlert({ type: "success", message: "Conta atualizada!" });
      setSenhaAtual("");
      setNovaSenha("");
      setConfirmarSenha("");
    } catch (err) {
      setAlert({ type: "error", message: err.message });
    } finally {
      setLoading(false);
    }
  }

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
        <section className="flex-1 min-w-0 w-full">
          {activeTab === "edit-profile" && (
            <div className="w-full">
              <h1 className="text-3xl font-bold text-cyan-400 mb-8">Perfil</h1>
              <form
                className="flex flex-col gap-8"
                onSubmit={handleProfileSubmit}
              >
                <div>
                  <label className="block text-zinc-400 mb-1 font-medium">
                    Nome de usuário
                  </label>
                  <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-zinc-900 text-zinc-200 border border-zinc-700 focus:border-cyan-500 outline-none transition"
                  />
                  <span className="text-xs text-zinc-500 mt-1 block">
                    Altere o nome que aparece no seu perfil.
                  </span>
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1 font-medium">
                    Biografia
                  </label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={3}
                    placeholder="Conte um pouco sobre você..."
                    className="w-full px-3 py-2 rounded bg-zinc-900 text-zinc-200 border border-zinc-700 focus:border-cyan-500 outline-none transition resize-none"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1 font-medium">
                    Avatar
                  </label>
                  <div className="flex items-center gap-6">
                    <img
                      src={
                        selectedImage?.preview
                          ? selectedImage.preview
                          : user?.imgUser &&
                            user.imgUser.startsWith("/profile-images/")
                          ? `http://localhost:5069${user.imgUser}`
                          : user?.imgUser
                      }
                      alt="Avatar"
                      className="w-32 h-32 rounded-xl object-cover  shadow-lg transition"
                    />
                    <label className="px-5 cursor-pointer py-3 rounded-lg bg-zinc-800 text-cyan-400 hover:bg-cyan-700 hover:text-white transition font-semibold text-base">
                      Alterar
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageSelect}
                        disabled={loading}
                      />
                    </label>
                  </div>
                </div>
                {/* Campo para jogos favoritos */}
                <div className="w-full">
                  <label className="block text-zinc-400 mb-2 font-medium">
                    Seus 5 jogos favoritos
                  </label>
                  <div className="w-full">
                    <FavoriteGamesInput
                      value={favoriteGames}
                      onChange={setFavoriteGames}
                      max={5}
                    />
                  </div>
                  <span className="text-xs text-zinc-500 mt-1 block">
                    Escolha até 5 jogos que representam você!
                  </span>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="cursor-pointer bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded font-semibold transition self-start disabled:opacity-60"
                >
                  {loading ? "Salvando..." : "Salvar Alterações"}
                </button>
                {alert && (
                  <div
                    className={`mt-2 text-sm ${
                      alert.type === "success"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {alert.message}
                  </div>
                )}
              </form>
            </div>
          )}
          {activeTab === "edit-profile" && (
            <hr className="my-12 border-zinc-700" />
          )}
          {activeTab === "account" && (
            <div className="w-full">
              <h1 className="text-3xl font-bold text-cyan-400 mb-8">Conta</h1>
              <form
                className="flex flex-col gap-8"
                onSubmit={handleAccountSubmit}
              >
                <div>
                  <label className="block text-zinc-400 mb-1 font-medium flex items-center">
                    <Mail size={16} className="mr-2" /> Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-zinc-900 text-zinc-200 border border-zinc-700 focus:border-cyan-500 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1 font-medium flex items-center">
                    <Lock size={16} className="mr-2" /> Nova Senha
                  </label>
                  <input
                    type="password"
                    value={novaSenha}
                    onChange={(e) => setNovaSenha(e.target.value)}
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
                    value={confirmarSenha}
                    onChange={(e) => setConfirmarSenha(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-zinc-900 text-zinc-200 border border-zinc-700 focus:border-cyan-500 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1 font-medium">
                    Senha Atual
                  </label>
                  <input
                    type="password"
                    value={senhaAtual}
                    onChange={(e) => setSenhaAtual(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-zinc-900 text-zinc-200 border border-zinc-700 focus:border-cyan-500 outline-none transition"
                    placeholder="Para fazer alterações, preencha sua senha."
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="cursor-pointer bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded font-semibold transition self-start disabled:opacity-60"
                >
                  {loading ? "Salvando..." : "Salvar Alterações"}
                </button>
                {alert && (
                  <div
                    className={`mt-2 text-sm ${
                      alert.type === "success"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {alert.message}
                  </div>
                )}
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
                  onClick={() => setShowPasswordModal(true)}
                  disabled={loading}
                >
                  {loading ? "Apagando..." : "Apagar Conta"}
                </button>
                <PasswordConfirmModal
                  open={showPasswordModal}
                  onClose={() => {
                    setShowPasswordModal(false);
                    setPasswordError(null);
                  }}
                  loading={passwordLoading}
                  error={passwordError}
                  title="Confirme sua senha para apagar a conta"
                  description="Por segurança, digite sua senha para confirmar a exclusão da conta."
                  onConfirm={async (senha) => {
                    setPasswordLoading(true);
                    setPasswordError(null);
                    const ok = await verifyPasswordById(user.id, senha);
                    if (!ok) {
                      setPasswordError("Senha incorreta.");
                      setPasswordLoading(false);
                      return;
                    }
                    // Senha correta, pode apagar
                    try {
                      await deleteUser(user.id);
                      setUser(null);
                      setShowPasswordModal(false);
                      setAlert({
                        type: "success",
                        message: "Conta apagada com sucesso.",
                      });
                      setTimeout(() => {
                        navigate("/");
                      }, 1500);
                    } catch (err) {
                      setPasswordError(err.message || "Erro ao apagar conta.");
                    } finally {
                      setPasswordLoading(false);
                    }
                  }}
                />
                {alert && (
                  <div
                    className={`mt-2 text-sm ${
                      alert.type === "success"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {alert.message}
                  </div>
                )}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}