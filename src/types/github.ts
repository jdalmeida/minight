// types/github.ts

export interface GitHubRepo {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
    // Outras propriedades se necessário
  };
  html_url: string;
  description: string | null;
  fork: boolean;
  url: string;
  forks_count: number;
  stargazers_count: number;
  watchers_count: number;
  language: string | null;
  open_issues_count: number;
  default_branch: string;
  // Outras propriedades disponíveis na API...
}
