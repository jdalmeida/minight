"use client"
import type React from 'react';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { api } from '@/trpc/react';

interface RepoSelectProps {
  onChange?: (value: string) => void
}

const RepoSelect: React.FC<RepoSelectProps> = ({onChange}) => {
  const { data: repos } = api.repo.getRepos.useQuery() ;
  const [selectedRepo, setSelectedRepo] = useState<string>('');

  const handleSelectChange = (value: string) => {
    setSelectedRepo(value);
    if (onChange){
      onChange(value)
    }
  };

  return (
    <Select value={selectedRepo} onValueChange={handleSelectChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Selecione um repositório" />
      </SelectTrigger>
      <SelectContent>
        {repos?.map((repo) => (
          <SelectItem key={repo.id} value={repo.html_url}>
            {repo.full_name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default RepoSelect;
