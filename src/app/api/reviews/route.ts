import { NextRequest, NextResponse } from 'next/server';
import { getAllReviews, createReview, getReviewsByProjectId, getApprovedReviewsForDisplay } from '@/lib/services/reviews';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');
    const approvedOnly = searchParams.get('approved') === 'true';
    const forDisplay = searchParams.get('display') === 'true';

    if (forDisplay) {
      const reviews = await getApprovedReviewsForDisplay();
      return NextResponse.json({ success: true, data: reviews });
    }

    if (projectId) {
      const reviews = await getReviewsByProjectId(projectId);
      return NextResponse.json({ success: true, data: reviews });
    }

    const reviews = await getAllReviews(approvedOnly);
    return NextResponse.json({ success: true, data: reviews });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { projectId, clientId, clientName, rating, comment } = body;

    if (!projectId || !clientId || !clientName || !rating || !comment) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { success: false, error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    const review = await createReview({
      projectId,
      clientId,
      clientName,
      rating,
      comment,
    });

    return NextResponse.json({ success: true, data: review }, { status: 201 });
  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create review' },
      { status: 500 }
    );
  }
}
