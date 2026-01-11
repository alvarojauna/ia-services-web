import { NextRequest, NextResponse } from 'next/server';
import { removeDeliverable, getProjectById } from '@/lib/services/projects';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string; deliverableId: string }> }
) {
  try {
    const { projectId, deliverableId } = await params;

    const project = await getProjectById(projectId);
    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }

    await removeDeliverable(projectId, deliverableId);

    return NextResponse.json({ success: true, message: 'Deliverable removed' });
  } catch (error) {
    console.error('Error removing deliverable:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to remove deliverable' },
      { status: 500 }
    );
  }
}
