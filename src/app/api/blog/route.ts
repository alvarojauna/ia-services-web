import { NextRequest, NextResponse } from 'next/server';
import { getAllBlogPosts, createBlogPost, getBlogPostBySlug } from '@/lib/services/blog';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const publishedOnly = searchParams.get('published') === 'true';
    const slug = searchParams.get('slug');

    if (slug) {
      const post = await getBlogPostBySlug(slug);
      if (!post) {
        return NextResponse.json(
          { success: false, error: 'Post not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: post });
    }

    const posts = await getAllBlogPosts(publishedOnly);
    return NextResponse.json({ success: true, data: posts });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, excerpt, content, author, tags = [], published = false, coverImage } = body;

    if (!title || !content || !author) {
      return NextResponse.json(
        { success: false, error: 'title, content, and author are required' },
        { status: 400 }
      );
    }

    const post = await createBlogPost({
      title,
      excerpt: excerpt || content.substring(0, 150) + '...',
      content,
      author,
      tags,
      published,
      coverImage,
    });

    return NextResponse.json({ success: true, data: post }, { status: 201 });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}
