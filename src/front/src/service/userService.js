// Verifica se a senha está correta para o usuário pelo ID
export async function verifyPasswordById(id, senha) {
  const response = await fetch(
    `http://localhost:5069/api/Usuarios/${id}/verify-password`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ senha }),
    }
  );
  return response.ok;
}
// Verifica se a senha está correta para o usuário logado
export async function verifyPassword(email, senha) {
  // Usa o mesmo endpoint de autenticação, mas só para checar a senha
  const response = await fetch(
    "http://localhost:5069/api/Usuarios/authenticate",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Email: email, Senha: senha }),
    }
  );
  if (!response.ok) {
    // senha incorreta ou outro erro
    return false;
  }
  return true;
}
const API_URL = "http://localhost:5069/api/Usuarios";

// Atualizar usuário
export async function updateUser(id, data) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Erro ao atualizar usuário");
  }
  // Se for 204 No Content, não tente fazer .json()
  if (response.status === 204) {
    return null;
  }
  // Se houver corpo, tente converter para JSON
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

// Deletar usuário
export async function deleteUser(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Erro ao deletar usuário");
  }
  return true;
}

// Função para registrar um novo usuário
export async function registerUser({ nome, email, senha, imgUser, tipo }) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nome,
      email,
      senha,
      imgUser,
      tipo,
    }),
  });

  // Retorna o JSON da resposta ou lança erro
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erro ao registrar usuário");
  }
  return response.json();
}

// Função para fazer login de usuário
export async function loginUser({ email, senha }) {
  const response = await fetch(
    "http://localhost:5069/api/Usuarios/authenticate",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Email: email, Senha: senha }),
    }
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Erro ao fazer login");
  }
  return response.json();
}

// Função para buscar usuário por e-mail
export async function getUserByEmail(email) {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Erro ao buscar usuários");
  }
  const users = await response.json();
  // Busca o usuário com e-mail exato (case-insensitive)
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}
