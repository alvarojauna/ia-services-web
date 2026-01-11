import { NextRequest, NextResponse } from 'next/server';
import { getAllProjects, createProject, getProjectsByClientId } from '@/lib/services/projects';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const clientId = searchParams.get('clientId');

    const projects = clientId
      ? await getProjectsByClientId(clientId)
      : await getAllProjects();

    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { clientId, name, description, plan, amount } = body;

    if (!clientId || !name || !plan) {
      return NextResponse.json(
        { success: false, error: 'clientId, name, and plan are required' },
        { status: 400 }
      );
    }

    const project = await createProject({
      clientId,
      name,
      description: description || '',
      plan,
      status: 'pending',
      progress: 0,
      amount: amount || 0,
    });

    return NextResponse.json({ success: true, data: project }, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create project' },
      { status: 500 }
    );
  }
}
