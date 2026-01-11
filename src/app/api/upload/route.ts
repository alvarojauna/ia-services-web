import { NextRequest, NextResponse } from 'next/server';
import { getUploadUrl, getDownloadUrl, getFileKey } from '@/lib/s3';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, folder, fileName, contentType } = body;

    if (!userId || !folder || !fileName || !contentType) {
      return NextResponse.json(
        { success: false, error: 'userId, folder, fileName, and contentType are required' },
        { status: 400 }
      );
    }

    const fileKey = getFileKey(userId, folder, fileName);
    const uploadUrl = await getUploadUrl(fileKey, contentType);

    return NextResponse.json({
      success: true,
      data: {
        uploadUrl,
        fileKey,
      },
    });
  } catch (error) {
    console.error('Error generating upload URL:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate upload URL' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const fileKey = searchParams.get('fileKey');

    if (!fileKey) {
      return NextResponse.json(
        { success: false, error: 'fileKey is required' },
        { status: 400 }
      );
    }

    const downloadUrl = await getDownloadUrl(fileKey);

    return NextResponse.json({
      success: true,
      data: { downloadUrl },
    });
  } catch (error) {
    console.error('Error generating download URL:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate download URL' },
      { status: 500 }
    );
  }
}
