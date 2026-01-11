'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface SessionDetails {
  customerEmail: string;
  planName: string;
  amount: number;
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState<SessionDetails | null>(null);

  useEffect(() => {
    if (sessionId) {
      // Fetch session details
      fetch(`/api/checkout/session?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setDetails(data.session);
          }
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 text-center">
        {loading ? (
          <div className="animate-spin w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full mx-auto" />
        ) : (
          <>
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              ¡Pago completado!
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Gracias por tu compra. Hemos recibido tu pago correctamente.
            </p>

            {details && (
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-6 text-left">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                  Detalles del pedido
                </h3>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-gray-500 dark:text-gray-400">Plan</dt>
                    <dd className="font-medium text-gray-900 dark:text-white">
                      {details.planName}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500 dark:text-gray-400">Importe</dt>
                    <dd className="font-medium text-gray-900 dark:text-white">
                      €{details.amount}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500 dark:text-gray-400">Email</dt>
                    <dd className="font-medium text-gray-900 dark:text-white">
                      {details.customerEmail}
                    </dd>
                  </div>
                </dl>
              </div>
            )}

            <div className="space-y-3">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Recibirás un email de confirmación con los detalles de tu proyecto.
                Nos pondremos en contacto contigo pronto.
              </p>

              <div className="flex flex-col gap-3 pt-4">
                <Link
                  href="/dashboard"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Ir a mi dashboard
                </Link>
                <Link
                  href="/"
                  className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  Volver al inicio
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <div className="animate-spin w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full" />
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
