'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface CheckoutButtonProps {
  plan: 'basic' | 'pro' | 'enterprise';
  highlighted?: boolean;
  children: React.ReactNode;
}

export default function CheckoutButton({
  plan,
  highlighted = false,
  children,
}: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const handleCheckout = async () => {
    if (!user) {
      // Redirect to login with return URL
      router.push(`/login?redirect=/services&plan=${plan}`);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan,
          userId: user.userId,
          userEmail: user.email,
        }),
      });

      const data = await response.json();

      if (data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        console.error('Error creating checkout session:', data.error);
        alert('Error al procesar el pago. Inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Error al procesar el pago. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className={`block w-full text-center py-3 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed ${
        highlighted
          ? 'bg-blue-600 text-white hover:bg-blue-700'
          : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
      }`}
    >
      {loading ? (
        <span className="flex items-center justify-center">
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Procesando...
        </span>
      ) : (
        children
      )}
    </button>
  );
}
