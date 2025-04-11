"use client"
import type React from 'react';
import { useState } from 'react';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from '@/components/ui/alert-dialog';
import RepoSelect from '../repos/repo-select';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { api } from '@/trpc/react';
import type { GitHubRepo } from '@/types/github';
import { PlusCircleIcon } from 'lucide-react';

const CreateDeployment: React.FC = () => {
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepo>();
  const projectMutation = api.repo.createProject.useMutation({
    onSuccess: (data) => {
      console.log('Project created successfully:', data);
      router.push(`/dashboard/build?repoUrl=${encodeURIComponent(data.repositoryUrl)}`)
    }
  });

  const router = useRouter()
  const handleDeploy = () => {
    if (selectedRepo) {
      projectMutation.mutate({
        name: selectedRepo.full_name,
        slug: selectedRepo.name,
        description: '',
        repositoryUrl: selectedRepo.html_url,
        branch: 'main',
      })
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Criar Deployment <PlusCircleIcon/></Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Iniciar Deployment</AlertDialogTitle>
          <AlertDialogDescription>
            Selecione um repositório para iniciar o deployment.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <RepoSelect onChange={(v)=>setSelectedRepo(v)} />
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeploy}>Deploy</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CreateDeployment;
