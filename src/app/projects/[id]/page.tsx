'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { WorkflowProvider } from '@/contexts/WorkflowContext';
import ProjectDashboard from '@/components/ProjectDashboard';
import { Project } from '@/lib/models';

export default function ProjectPage() {
  const [project, setProject] = useState<Project | null>(null);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (id) {
      async function fetchProject() {
        const res = await fetch(`/api/projects/${id}`);
        if (res.ok) {
          const data = await res.json();
          setProject(data[0]);
        }
      }
      fetchProject();
    }
  }, [id]);

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <WorkflowProvider initialData={project}>
      <ProjectDashboard project={project} />
    </WorkflowProvider>
  );
}
