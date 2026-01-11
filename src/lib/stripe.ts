import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

export const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, {
      apiVersion: '2025-12-15.clover',
      typescript: true,
    })
  : (null as unknown as Stripe);

// Plan configuration with Stripe price IDs
export const plans = {
  basic: {
    name: 'Básico',
    price: 499,
    priceId: process.env.STRIPE_PRICE_BASIC || '',
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
    priceId: process.env.STRIPE_PRICE_PRO || '',
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
    priceId: process.env.STRIPE_PRICE_ENTERPRISE || '',
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
