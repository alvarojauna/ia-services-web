import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { awsConfig } from './aws-config';

const s3Client = new S3Client({ region: awsConfig.region });

export async function getUploadUrl(key: string, contentType: string, expiresIn = 3600): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: awsConfig.s3.bucket,
    Key: key,
    ContentType: contentType,
  });
  return getSignedUrl(s3Client, command, { expiresIn });
}

export async function getDownloadUrl(key: string, expiresIn = 3600): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: awsConfig.s3.bucket,
    Key: key,
  });
  return getSignedUrl(s3Client, command, { expiresIn });
}

export async function deleteFile(key: string): Promise<void> {
  const command = new DeleteObjectCommand({
    Bucket: awsConfig.s3.bucket,
    Key: key,
  });
  await s3Client.send(command);
}

export function getFileKey(userId: string, folder: string, fileName: string): string {
  return `${userId}/${folder}/${Date.now()}-${fileName}`;
}
