'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

function VerifyForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { confirmEmail, resendCode, error, loading, clearError } = useAuth();
  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');
  const [resendSuccess, setResendSuccess] = useState(false);

  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await confirmEmail(email, code);
    if (success) {
      router.push('/login?verified=true');
    }
  };

  const handleResend = async () => {
    clearError();
    setResendSuccess(false);
    try {
      await resendCode(email);
      setResendSuccess(true);
    } catch {
      // Error handled by context
    }
  };

  return (
    <>
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Verifica tu email
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Hemos enviado un código de verificación a{' '}
          <span className="font-medium text-gray-900 dark:text-white">{email}</span>
        </p>
      </div>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        {error && (
          <div className="bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {resendSuccess && (
          <div className="bg-green-50 dark:bg-green-900/50 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400 px-4 py-3 rounded-lg text-sm">
            Código reenviado correctamente
          </div>
        )}

        <div className="space-y-4">
          {!searchParams.get('email') && (
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                placeholder="tu@email.com"
              />
            </div>
          )}

          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Código de verificación
            </label>
            <input
              id="code"
              name="code"
              type="text"
              required
              value={code}
              onChange={(e) => {
                clearError();
                setCode(e.target.value);
              }}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white text-center text-2xl tracking-widest"
              placeholder="123456"
              maxLength={6}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || code.length < 6}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Verificando...' : 'Verificar email'}
        </button>

        <div className="text-center">
          <button
            type="button"
            onClick={handleResend}
            disabled={loading}
            className="text-sm font-medium text-blue-600 hover:text-blue-500 disabled:opacity-50"
          >
            Reenviar código
          </button>
        </div>

        <div className="text-center">
          <Link href="/login" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
            Volver al inicio de sesión
          </Link>
        </div>
      </form>
    </>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    }>
      <VerifyForm />
    </Suspense>
  );
}
