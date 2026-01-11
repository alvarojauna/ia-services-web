import { v4 as uuid } from 'uuid';
import { getItem, putItem, updateItem, deleteItem, queryByIndex, scanTable } from '../dynamodb';
import { awsConfig } from '../aws-config';
import { BlogPost } from '@/types';

const TABLE = awsConfig.dynamodb.tables.blog;

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export async function createBlogPost(data: Omit<BlogPost, 'postId' | 'slug' | 'createdAt' | 'updatedAt'>): Promise<BlogPost> {
  const post: BlogPost = {
    postId: uuid(),
    slug: generateSlug(data.title),
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  await putItem(TABLE, post);
  return post;
}

export async function getBlogPostById(postId: string): Promise<BlogPost | null> {
  return getItem<BlogPost>(TABLE, { postId });
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await queryByIndex<BlogPost>(TABLE, 'slug-index', 'slug', slug);
  return posts[0] || null;
}

export async function updateBlogPost(postId: string, updates: Partial<BlogPost>): Promise<void> {
  const updateData = { ...updates, updatedAt: new Date().toISOString() };

  if (updates.title) {
    updateData.slug = generateSlug(updates.title);
  }

  await updateItem(TABLE, { postId }, updateData);
}

export async function deleteBlogPost(postId: string): Promise<void> {
  await deleteItem(TABLE, { postId });
}

export async function getAllBlogPosts(publishedOnly = false): Promise<BlogPost[]> {
  const posts = await scanTable<BlogPost>(TABLE);

  const filtered = publishedOnly ? posts.filter(p => p.published) : posts;

  return filtered.sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function getBlogPostsByTag(tag: string): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts(true);
  return posts.filter(p => p.tags.includes(tag));
}
