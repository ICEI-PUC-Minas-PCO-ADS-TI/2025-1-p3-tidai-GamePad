// Busca comentários reais do banco para o slider da Home
export async function fetchRandomComments(limit = 5) {
  // Busca todas as avaliações
  const res = await fetch("http://localhost:5069/api/AvaliacoesApi");
  const data = await res.json();
  // Filtra apenas avaliações com comentário não vazio
  const comments = data.filter((a) => a.comentario && a.comentario.trim());
  // Embaralha e pega um número limitado
  const shuffled = comments.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, limit);
}
