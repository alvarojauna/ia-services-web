'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                IA Services
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {user?.email}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm text-red-600 hover:text-red-500"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Bienvenido a tu Dashboard
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Has iniciado sesión correctamente. Aquí podrás ver tus proyectos y gestionar tu cuenta.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                  Mis Proyectos
                </h3>
                <p className="text-3xl font-bold text-blue-600 mt-2">0</p>
                <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                  proyectos activos
                </p>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-900 dark:text-green-100">
                  Completados
                </h3>
                <p className="text-3xl font-bold text-green-600 mt-2">0</p>
                <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                  proyectos finalizados
                </p>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100">
                  Archivos
                </h3>
                <p className="text-3xl font-bold text-purple-600 mt-2">0</p>
                <p className="text-sm text-purple-700 dark:text-purple-300 mt-1">
                  entregables disponibles
                </p>
              </div>
            </div>

            <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Tu información
              </h3>
              <dl className="grid grid-cols-1 gap-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-500 dark:text-gray-400">User ID:</dt>
                  <dd className="text-gray-900 dark:text-white font-mono">{user?.userId}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500 dark:text-gray-400">Email:</dt>
                  <dd className="text-gray-900 dark:text-white">{user?.email}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500 dark:text-gray-400">Email verificado:</dt>
                  <dd className="text-gray-900 dark:text-white">
                    {user?.emailVerified ? '✓ Sí' : '✗ No'}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
