import { v4 as uuid } from 'uuid';
import { getItem, putItem, updateItem, deleteItem, scanTable } from '../dynamodb';
import { awsConfig } from '../aws-config';
import { User } from '@/types';

const TABLE = awsConfig.dynamodb.tables.users;

export async function createUser(data: Omit<User, 'userId' | 'createdAt' | 'updatedAt'>): Promise<User> {
  const user: User = {
    userId: uuid(),
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  await putItem(TABLE, user);
  return user;
}

export async function getUserById(userId: string): Promise<User | null> {
  return getItem<User>(TABLE, { userId });
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const users = await scanTable<User>(TABLE);
  return users.find(u => u.email === email) || null;
}

export async function updateUser(userId: string, updates: Partial<User>): Promise<void> {
  await updateItem(TABLE, { userId }, {
    ...updates,
    updatedAt: new Date().toISOString(),
  });
}

export async function deleteUser(userId: string): Promise<void> {
  await deleteItem(TABLE, { userId });
}

export async function getAllUsers(): Promise<User[]> {
  return scanTable<User>(TABLE);
}

export async function getOrCreateUser(cognitoUserId: string, email: string, name: string): Promise<User> {
  let user = await getUserById(cognitoUserId);

  if (!user) {
    user = {
      userId: cognitoUserId,
      email,
      name,
      role: 'client',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await putItem(TABLE, user);
  }

  return user;
}
