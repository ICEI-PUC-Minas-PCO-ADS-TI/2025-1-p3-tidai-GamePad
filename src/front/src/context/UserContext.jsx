import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";

export const UserContext = createContext();

// sessão termina em 2 hrs
const SESSION_TIMEOUT = 2 * 60 * 60 * 1000;
const LAST_ACTIVITY_KEY = "lastActivity";

export function UserProvider({ children }) {
  const [user, setUserState] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });
  const timeoutRef = useRef();

  // limap o local storage e o estado do usuário ao sair da sessão
  const logout = React.useCallback(() => {
    setUserState(null);
    localStorage.removeItem("user");
    localStorage.removeItem(LAST_ACTIVITY_KEY);
  }, []);

  // define a função para atualizar o usuário
  // e salva no local storage
  const setUser = React.useCallback((u) => {
    setUserState(u);
    if (u) {
      localStorage.setItem("user", JSON.stringify(u));
      localStorage.setItem(LAST_ACTIVITY_KEY, Date.now().toString());
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem(LAST_ACTIVITY_KEY);
    }
  }, []);

  useEffect(() => {
    if (!user) return;
    const updateActivity = () => {
      localStorage.setItem(LAST_ACTIVITY_KEY, Date.now().toString());
    };
    window.addEventListener("mousemove", updateActivity);
    window.addEventListener("keydown", updateActivity);
    window.addEventListener("mousedown", updateActivity);
    window.addEventListener("touchstart", updateActivity);
    return () => {
      window.removeEventListener("mousemove", updateActivity);
      window.removeEventListener("keydown", updateActivity);
      window.removeEventListener("mousedown", updateActivity);
      window.removeEventListener("touchstart", updateActivity);
    };
  }, [user]);

  // verifica se a sessão expirou
  useEffect(() => {
    if (!user) return;
    function checkTimeout() {
      const last = parseInt(localStorage.getItem(LAST_ACTIVITY_KEY), 10);
      if (!last || Date.now() - last > SESSION_TIMEOUT) {
        logout();
        //
      }
    }
    timeoutRef.current = setInterval(checkTimeout, 60 * 1000); // check every minute
    return () => clearInterval(timeoutRef.current);
  }, [user, logout]);

  useEffect(() => {
    // verifica se a sessão expirou ao carregar o componente
    if (user) {
      const last = parseInt(localStorage.getItem(LAST_ACTIVITY_KEY), 10);
      if (!last || Date.now() - last > SESSION_TIMEOUT) {
        logout();
      }
    }
  }, []);

  useEffect(() => {
    console.log("Usuário logado:", user);
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}

// Novo hook para logout
export function useLogout() {
  const { logout } = useUser();
  return logout;
}
