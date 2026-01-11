// User types
export interface User {
  userId: string;
  email: string;
  name: string;
  company?: string;
  role: 'client' | 'admin';
  createdAt: string;
  updatedAt: string;
}

// Project types
export type ProjectStatus = 'pending' | 'in_progress' | 'review' | 'completed' | 'cancelled';

export interface Project {
  projectId: string;
  clientId: string;
  name: string;
  description: string;
  plan: 'basic' | 'pro' | 'enterprise';
  status: ProjectStatus;
  progress: number;
  amount: number;
  stripePaymentId?: string;
  deliverables: Deliverable[];
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

export interface Deliverable {
  id: string;
  name: string;
  description?: string;
  fileKey: string;
  fileType: string;
  fileSize: number;
  uploadedAt: string;
}

// Blog types
export interface BlogPost {
  postId: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  author: string;
  tags: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

// Review types
export interface Review {
  reviewId: string;
  projectId: string;
  clientId: string;
  clientName: string;
  rating: number;
  comment: string;
  approved: boolean;
  createdAt: string;
}

// Plan types
export interface Plan {
  id: 'basic' | 'pro' | 'enterprise';
  name: string;
  price: number;
  description: string;
  features: string[];
  stripePriceId?: string;
}

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
