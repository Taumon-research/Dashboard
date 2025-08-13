'use client';

import { useWorkflow } from '@/contexts/WorkflowContext';
import { Button } from '@/components/ui/button';
import MultiStepWorkflow from '@/components/MultiStepWorkflow';
import Chatbot from '@/components/Chatbot';
import Timeline from '@/components/Timeline';
import { Project } from '@/lib/models';

export default function ProjectDashboard({ project }: { project: Project }) {
  const { data } = useWorkflow();

  const handleSave = async () => {
    await fetch(`/api/projects/${project.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: project.name, ...data }),
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{project.name}</h1>
        <Button onClick={handleSave}>Save</Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MultiStepWorkflow />
        </div>
        <div className="space-y-6">
          <Chatbot />
          <Timeline />
        </div>
      </div>
    </div>
  );
}
