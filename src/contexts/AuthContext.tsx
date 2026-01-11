'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  AuthUser,
  getCurrentAuthUser,
  loginUser,
  logoutUser,
  registerUser,
  confirmRegistration,
  resendVerificationCode,
  requestPasswordReset,
  confirmPasswordReset,
} from '@/lib/auth';

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<{ needsConfirmation: boolean }>;
  confirmEmail: (email: string, code: string) => Promise<boolean>;
  resendCode: (email: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (email: string, code: string, newPassword: string) => Promise<boolean>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const currentUser = await getCurrentAuthUser();
      setUser(currentUser);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function login(email: string, password: string): Promise<boolean> {
    setError(null);
    setLoading(true);
    try {
      const result = await loginUser(email, password);
      if (result.isSignedIn) {
        const currentUser = await getCurrentAuthUser();
        setUser(currentUser);
        return true;
      }
      return false;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al iniciar sesión';
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  }

  async function logout(): Promise<void> {
    setLoading(true);
    try {
      await logoutUser();
      setUser(null);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al cerrar sesión';
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  async function register(
    email: string,
    password: string,
    name: string
  ): Promise<{ needsConfirmation: boolean }> {
    setError(null);
    setLoading(true);
    try {
      const result = await registerUser(email, password, name);
      return {
        needsConfirmation: result.nextStep.signUpStep === 'CONFIRM_SIGN_UP',
      };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al registrarse';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function confirmEmail(email: string, code: string): Promise<boolean> {
    setError(null);
    setLoading(true);
    try {
      await confirmRegistration(email, code);
      return true;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Código inválido';
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  }

  async function resendCode(email: string): Promise<void> {
    setError(null);
    try {
      await resendVerificationCode(email);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al reenviar código';
      setError(message);
      throw err;
    }
  }

  async function forgotPassword(email: string): Promise<void> {
    setError(null);
    setLoading(true);
    try {
      await requestPasswordReset(email);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al solicitar recuperación';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function resetPassword(email: string, code: string, newPassword: string): Promise<boolean> {
    setError(null);
    setLoading(true);
    try {
      await confirmPasswordReset(email, code, newPassword);
      return true;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al cambiar contraseña';
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  }

  function clearError() {
    setError(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        logout,
        register,
        confirmEmail,
        resendCode,
        forgotPassword,
        resetPassword,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
