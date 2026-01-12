'use client';

import { ReactNode } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import AuthProvider with SSR disabled
const AuthProvider = dynamic(
  () => import('@/contexts/AuthContext').then((mod) => mod.AuthProvider),
  { ssr: false }
);

export function ClientProviders({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
