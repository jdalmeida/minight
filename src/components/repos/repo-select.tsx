"use client"
import type React from 'react';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { api } from '@/trpc/react';
import type { GitHubRepo } from '@/types/github';

interface RepoSelectProps {
  onChange?: (value: GitHubRepo) => void
}

const RepoSelect: React.FC<RepoSelectProps> = ({onChange}) => {
  const { data: repos } = api.repo.getRepos.useQuery() ;
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepo>();

  const handleSelectChange = (value: string) => {
    setSelectedRepo(JSON.parse(value));
    if (onChange){
      onChange(JSON.parse(value) as GitHubRepo)
    }
  };

  return (
    <Select value={JSON.stringify(selectedRepo)} onValueChange={handleSelectChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Selecione um repositório" />
      </SelectTrigger>
      <SelectContent>
        {repos?.map((repo) => (
          <SelectItem key={repo.id} value={JSON.stringify(repo)}>
            {repo.full_name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default RepoSelect;
