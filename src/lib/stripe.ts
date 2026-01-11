import Stripe from 'stripe';

// Lazy initialization - creates Stripe client on first use (runtime, not build time)
let stripeInstance: Stripe | null = null;

export function getStripe(): Stripe {
  if (!stripeInstance) {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      throw new Error('STRIPE_SECRET_KEY is not configured');
    }
    stripeInstance = new Stripe(secretKey, {
      apiVersion: '2025-12-15.clover',
      typescript: true,
    });
  }
  return stripeInstance;
}

// Plan configuration
export const plans = {
  basic: {
    name: 'Básico',
    price: 499,
    features: [
      'Chatbot simple para tu web',
      '1 revisión incluida',
      'Documentación básica',
      'Soporte por email',
      'Entrega en 2 semanas',
    ],
  },
  pro: {
    name: 'Pro',
    price: 999,
    features: [
      'Todo lo del plan Básico',
      'Integración con APIs externas',
      'Modelo ML personalizado',
      '3 revisiones incluidas',
      'Soporte 30 días',
      'Entrega en 3 semanas',
    ],
  },
  enterprise: {
    name: 'Enterprise',
    price: 2499,
    features: [
      'Todo lo del plan Pro',
      'Consultoría dedicada',
      'Soporte prioritario 24/7',
      'Código fuente completo',
      'Revisiones ilimitadas',
      'Mantenimiento 3 meses',
    ],
  },
};

export type PlanKey = keyof typeof plans;
