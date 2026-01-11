import { NextRequest, NextResponse } from 'next/server';
import { addDeliverable, getProjectById } from '@/lib/services/projects';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await params;
    const body = await request.json();
    const { name, fileKey, fileSize, fileType } = body;

    if (!name || !fileKey) {
      return NextResponse.json(
        { success: false, error: 'name and fileKey are required' },
        { status: 400 }
      );
    }

    const project = await getProjectById(projectId);
    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }

    const deliverable = await addDeliverable(projectId, {
      name,
      fileKey,
      fileSize: fileSize || 0,
      fileType: fileType || 'application/octet-stream',
    });

    return NextResponse.json({ success: true, deliverable }, { status: 201 });
  } catch (error) {
    console.error('Error adding deliverable:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to add deliverable' },
      { status: 500 }
    );
  }
}
