'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Project } from '@/lib/models';

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchProjects() {
      const res = await fetch('/api/projects');
      const data = await res.json();
      setProjects(data);
    }
    fetchProjects();
  }, []);

  const handleCreateProject = async () => {
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: 'New Project' }),
    });
    const newProject = await res.json();
    router.push(`/projects/${newProject[0].id}`);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Button onClick={handleCreateProject}>Create Project</Button>
      </div>
      <div className="grid gap-4">
        {projects.map((project) => (
          <Card key={project.id} onClick={() => router.push(`/projects/${project.id}`)} className="cursor-pointer">
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Created at: {new Date(project.createdAt).toLocaleDateString()}</p>
              <p>Last updated: {new Date(project.updatedAt).toLocaleDateString()}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
