'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm sticky top-0 z-50 transition-colors">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-xl font-bold text-gradient-blue hover-scale inline-block"
            >
              IA Services
            </Link>
            <div className="hidden md:flex ml-10 space-x-8">
              <Link
                href="/services"
                className="text-gray-600 dark:text-gray-300 link-hover py-1"
              >
                Servicios
              </Link>
              <Link
                href="/portfolio"
                className="text-gray-600 dark:text-gray-300 link-hover py-1"
              >
                Portfolio
              </Link>
              <Link
                href="/blog"
                className="text-gray-600 dark:text-gray-300 link-hover py-1"
              >
                Blog
              </Link>
              <Link
                href="/contact"
                className="text-gray-600 dark:text-gray-300 link-hover py-1"
              >
                Contacto
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <Link
                href="/dashboard"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all hover-lift focus-ring ripple"
              >
                Mi Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-600 dark:text-gray-300 link-hover py-1"
                >
                  Iniciar sesión
                </Link>
                <Link
                  href="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all hover-lift focus-ring ripple"
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
