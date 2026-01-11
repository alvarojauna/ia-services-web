import { v4 as uuid } from 'uuid';
import { getItem, putItem, updateItem, deleteItem, queryByIndex, scanTable } from '../dynamodb';
import { awsConfig } from '../aws-config';
import { Review } from '@/types';

const TABLE = awsConfig.dynamodb.tables.reviews;

export async function createReview(data: Omit<Review, 'reviewId' | 'createdAt' | 'approved'>): Promise<Review> {
  const review: Review = {
    reviewId: uuid(),
    ...data,
    approved: false,
    createdAt: new Date().toISOString(),
  };
  await putItem(TABLE, review);
  return review;
}

export async function getReviewById(reviewId: string): Promise<Review | null> {
  return getItem<Review>(TABLE, { reviewId });
}

export async function getReviewsByProjectId(projectId: string): Promise<Review[]> {
  return queryByIndex<Review>(TABLE, 'projectId-index', 'projectId', projectId);
}

export async function updateReview(reviewId: string, updates: Partial<Review>): Promise<void> {
  await updateItem(TABLE, { reviewId }, updates);
}

export async function deleteReview(reviewId: string): Promise<void> {
  await deleteItem(TABLE, { reviewId });
}

export async function getAllReviews(approvedOnly = false): Promise<Review[]> {
  const reviews = await scanTable<Review>(TABLE);

  const filtered = approvedOnly ? reviews.filter(r => r.approved) : reviews;

  return filtered.sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function approveReview(reviewId: string): Promise<void> {
  await updateReview(reviewId, { approved: true });
}

export async function getApprovedReviewsForDisplay(): Promise<Review[]> {
  const reviews = await getAllReviews(true);
  return reviews.slice(0, 10);
}
