export const awsConfig = {
  region: process.env.AWS_REGION || 'eu-north-1',
  cognito: {
    userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!,
    clientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
  },
  dynamodb: {
    tables: {
      users: process.env.DYNAMODB_TABLE_USERS || 'ia-services-users',
      projects: process.env.DYNAMODB_TABLE_PROJECTS || 'ia-services-projects',
      blog: process.env.DYNAMODB_TABLE_BLOG || 'ia-services-blog',
      reviews: process.env.DYNAMODB_TABLE_REVIEWS || 'ia-services-reviews',
    },
  },
  s3: {
    bucket: process.env.S3_BUCKET_NAME || 'ia-services-files-916707935254',
  },
  ses: {
    fromEmail: process.env.SES_FROM_EMAIL || 'alvarojauna100@gmail.com',
    region: process.env.SES_REGION || 'eu-north-1',
  },
};
