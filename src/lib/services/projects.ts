import { v4 as uuid } from 'uuid';
import { getItem, putItem, updateItem, deleteItem, queryByIndex, scanTable } from '../dynamodb';
import { awsConfig } from '../aws-config';
import { Project, Deliverable } from '@/types';

const TABLE = awsConfig.dynamodb.tables.projects;

export async function createProject(data: Omit<Project, 'projectId' | 'createdAt' | 'updatedAt' | 'deliverables'>): Promise<Project> {
  const project: Project = {
    projectId: uuid(),
    ...data,
    deliverables: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  await putItem(TABLE, project);
  return project;
}

export async function getProjectById(projectId: string): Promise<Project | null> {
  return getItem<Project>(TABLE, { projectId });
}

export async function getProjectsByClientId(clientId: string): Promise<Project[]> {
  return queryByIndex<Project>(TABLE, 'clientId-index', 'clientId', clientId);
}

export async function updateProject(projectId: string, updates: Partial<Project>): Promise<void> {
  await updateItem(TABLE, { projectId }, {
    ...updates,
    updatedAt: new Date().toISOString(),
  });
}

export async function deleteProject(projectId: string): Promise<void> {
  await deleteItem(TABLE, { projectId });
}

export async function getAllProjects(): Promise<Project[]> {
  return scanTable<Project>(TABLE);
}

export async function addDeliverable(projectId: string, deliverable: Omit<Deliverable, 'id' | 'uploadedAt'>): Promise<Deliverable> {
  const project = await getProjectById(projectId);
  if (!project) throw new Error('Project not found');

  const newDeliverable: Deliverable = {
    id: uuid(),
    ...deliverable,
    uploadedAt: new Date().toISOString(),
  };

  const deliverables = [...project.deliverables, newDeliverable];
  await updateProject(projectId, { deliverables });

  return newDeliverable;
}

export async function removeDeliverable(projectId: string, deliverableId: string): Promise<void> {
  const project = await getProjectById(projectId);
  if (!project) throw new Error('Project not found');

  const deliverables = project.deliverables.filter(d => d.id !== deliverableId);
  await updateProject(projectId, { deliverables });
}

export async function updateProjectStatus(
  projectId: string,
  status: Project['status'],
  progress: number
): Promise<void> {
  const updates: Partial<Project> = { status, progress };

  if (status === 'completed') {
    updates.completedAt = new Date().toISOString();
  }

  await updateProject(projectId, updates);
}
