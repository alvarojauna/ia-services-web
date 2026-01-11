import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, PutCommand, UpdateCommand, DeleteCommand, QueryCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { awsConfig } from './aws-config';

const region = process.env.APP_AWS_REGION || process.env.AWS_REGION || awsConfig.region;

const clientConfig: ConstructorParameters<typeof DynamoDBClient>[0] = { region };

// Use custom credentials if available (for Amplify deployment)
if (process.env.APP_AWS_ACCESS_KEY_ID && process.env.APP_AWS_SECRET_ACCESS_KEY) {
  clientConfig.credentials = {
    accessKeyId: process.env.APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.APP_AWS_SECRET_ACCESS_KEY,
  };
}

const client = new DynamoDBClient(clientConfig);
export const dynamodb = DynamoDBDocumentClient.from(client);

// Generic CRUD operations
export async function getItem<T>(tableName: string, key: Record<string, string>): Promise<T | null> {
  const result = await dynamodb.send(new GetCommand({ TableName: tableName, Key: key }));
  return (result.Item as T) || null;
}

export async function putItem<T>(tableName: string, item: T): Promise<T> {
  await dynamodb.send(new PutCommand({ TableName: tableName, Item: item as Record<string, unknown> }));
  return item;
}

export async function updateItem(
  tableName: string,
  key: Record<string, string>,
  updates: Record<string, unknown>
): Promise<void> {
  const updateExpression = Object.keys(updates)
    .map((k, i) => `#key${i} = :val${i}`)
    .join(', ');

  const expressionAttributeNames = Object.keys(updates).reduce<Record<string, string>>(
    (acc, k, i) => ({ ...acc, [`#key${i}`]: k }),
    {}
  );

  const expressionAttributeValues = Object.values(updates).reduce<Record<string, unknown>>(
    (acc, v, i) => ({ ...acc, [`:val${i}`]: v }),
    {}
  );

  await dynamodb.send(new UpdateCommand({
    TableName: tableName,
    Key: key,
    UpdateExpression: `SET ${updateExpression}`,
    ExpressionAttributeNames: expressionAttributeNames,
    ExpressionAttributeValues: expressionAttributeValues,
  }));
}

export async function deleteItem(tableName: string, key: Record<string, string>): Promise<void> {
  await dynamodb.send(new DeleteCommand({ TableName: tableName, Key: key }));
}

export async function queryByIndex<T>(
  tableName: string,
  indexName: string,
  keyName: string,
  keyValue: string
): Promise<T[]> {
  const result = await dynamodb.send(new QueryCommand({
    TableName: tableName,
    IndexName: indexName,
    KeyConditionExpression: `${keyName} = :val`,
    ExpressionAttributeValues: { ':val': keyValue },
  }));
  return (result.Items as T[]) || [];
}

export async function scanTable<T>(tableName: string): Promise<T[]> {
  const result = await dynamodb.send(new ScanCommand({ TableName: tableName }));
  return (result.Items as T[]) || [];
}
