import { NextResponse } from 'next/server';
import db from '@/lib/surreal';
import { Project } from '@/lib/models';

export async function GET() {
  try {
    const projects = await db.select<Project>('project');
    return NextResponse.json(projects);
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, ...workflowData } = body;

    const newProject: Partial<Project> = {
      name,
      ...workflowData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const createdProject = await db.create('project', newProject);
    return NextResponse.json(createdProject, { status: 201 });
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
