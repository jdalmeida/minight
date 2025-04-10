import type { GitHubRepo } from "@/types/github";
import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";

export async function getGitHubRepos() {
  // Recupera informações de autenticação do Clerk
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Usuário não autenticado");
  }

  const client = await clerkClient()

  // Obtem os detalhes completos do usuário
  const user = await client.users.getUser(userId);

  // Extrai o token de acesso do GitHub
  const githubAccessToken = await client.users.getUserOauthAccessToken(userId, 'github');
  console.log(githubAccessToken)
  if (!githubAccessToken) {
    throw new Error("Token de acesso do GitHub não disponível");
  }
  
  if (githubAccessToken.totalCount<1){
    throw new Error("Token de acesso do GitHub não disponível");
  }

  // Chama a API do GitHub para obter os repositórios
  const response = await fetch("https://api.github.com/user/repos", {
    headers: {
      Authorization: `token ${githubAccessToken.data.at(0)?.token}`,
      Accept: "application/vnd.github.v3+json",
    },
    // O cache pode ser ajustado conforme a necessidade:
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar repositórios");
  }

  // Retorna os repositórios no formato JSON
  const repos: GitHubRepo[] = await response.json();
  return repos;
}