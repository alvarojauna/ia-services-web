'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Mi Perfil
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Gestiona tu información personal y preferencias
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 h-24" />
        <div className="px-6 pb-6">
          <div className="flex items-end -mt-12 mb-4">
            <div className="w-24 h-24 rounded-full bg-white dark:bg-gray-700 border-4 border-white dark:border-gray-800 flex items-center justify-center">
              <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {user?.email?.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {user?.email?.split('@')[0]}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">{user?.email}</p>
        </div>
      </div>

      {/* Account Information */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Información de la cuenta
        </h3>
        <dl className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:justify-between py-3 border-b border-gray-200 dark:border-gray-700">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
              ID de usuario
            </dt>
            <dd className="mt-1 sm:mt-0 text-sm text-gray-900 dark:text-white font-mono">
              {user?.userId}
            </dd>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between py-3 border-b border-gray-200 dark:border-gray-700">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Email
            </dt>
            <dd className="mt-1 sm:mt-0 text-sm text-gray-900 dark:text-white">
              {user?.email}
            </dd>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between py-3 border-b border-gray-200 dark:border-gray-700">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Email verificado
            </dt>
            <dd className="mt-1 sm:mt-0 text-sm">
              {user?.emailVerified ? (
                <span className="inline-flex items-center gap-1 text-green-600 dark:text-green-400">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Verificado
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-yellow-600 dark:text-yellow-400">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Pendiente
                </span>
              )}
            </dd>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between py-3">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Tipo de cuenta
            </dt>
            <dd className="mt-1 sm:mt-0 text-sm text-gray-900 dark:text-white">
              Cliente
            </dd>
          </div>
        </dl>
      </div>

      {/* Security */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Seguridad
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Contraseña</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Cambia tu contraseña de acceso
              </p>
            </div>
            <a
              href="/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium"
            >
              Cambiar
            </a>
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Cerrar sesión</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Cierra la sesión en este dispositivo
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 font-medium"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-red-200 dark:border-red-900">
        <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-4">
          Zona de peligro
        </h3>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="font-medium text-gray-900 dark:text-white">Eliminar cuenta</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Elimina permanentemente tu cuenta y todos tus datos
            </p>
          </div>
          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="text-sm border border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 px-4 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition"
            >
              Eliminar cuenta
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="text-sm text-gray-600 dark:text-gray-400 px-4 py-2 hover:text-gray-900 dark:hover:text-white"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  // In a real app, this would call an API to delete the account
                  alert('Esta funcionalidad requiere implementación del backend');
                }}
                className="text-sm bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Confirmar eliminación
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Support */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          ¿Necesitas ayuda?
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Si tienes alguna pregunta o problema con tu cuenta, no dudes en contactarnos.
        </p>
        <a
          href="/contact"
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:underline"
        >
          Contactar soporte
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </div>
  );
}
