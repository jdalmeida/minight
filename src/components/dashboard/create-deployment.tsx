"use client"
import type React from 'react';
import { useState } from 'react';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from '@/components/ui/alert-dialog';
import RepoSelect from '../repos/repo-select';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

const CreateDeployment: React.FC = () => {
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);
  const router = useRouter()
  const handleDeploy = () => {
    if (selectedRepo) {
      router.push(`/dashboard/build?repoUrl=${encodeURIComponent(selectedRepo)}`)
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Criar Deployment</Button>
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
