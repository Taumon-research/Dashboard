import { NextResponse } from 'next/server';
import db from '@/lib/surreal';
import { Project } from '@/lib/models';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const project = await db.select<Project>(`project:${params.id}`);
    if (!project) {
      return new NextResponse('Project not found', { status: 404 });
    }
    return NextResponse.json(project);
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { name, ...workflowData } = body;

    const updatedData: Partial<Project> = {
      name,
      ...workflowData,
      updatedAt: new Date().toISOString(),
    };

    const updatedProject = await db.update(`project:${params.id}`, updatedData);
    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
