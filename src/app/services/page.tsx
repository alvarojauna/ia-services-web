'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CheckoutButton from '@/components/CheckoutButton';
import FadeInOnScroll from '@/components/animations/FadeInOnScroll';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui';

const plans = [
  {
    name: 'Básico',
    monthlyPrice: 499,
    yearlyPrice: 4490,
    planId: 'basic' as const,
    description: 'Ideal para pequeños negocios que quieren empezar con IA',
    features: [
      { text: 'Chatbot simple para tu web', included: true },
      { text: '1 revisión incluida', included: true },
      { text: 'Documentación básica', included: true },
      { text: 'Soporte por email', included: true },
      { text: 'Entrega en 2 semanas', included: true },
      { text: 'Integración APIs', included: false },
      { text: 'Modelo ML personalizado', included: false },
    ],
    highlighted: false,
    color: 'from-gray-500 to-gray-600',
  },
  {
    name: 'Pro',
    monthlyPrice: 999,
    yearlyPrice: 8990,
    planId: 'pro' as const,
    description: 'Para empresas que necesitan soluciones avanzadas',
    badge: 'Más Popular',
    features: [
      { text: 'Todo lo del plan Básico', included: true },
      { text: 'Integración con APIs externas', included: true },
      { text: 'Modelo ML personalizado', included: true },
      { text: '3 revisiones incluidas', included: true },
      { text: 'Soporte 30 días', included: true },
      { text: 'Entrega en 3 semanas', included: true },
      { text: 'Código fuente', included: false },
    ],
    highlighted: true,
    color: 'from-blue-500 to-purple-600',
  },
  {
    name: 'Enterprise',
    monthlyPrice: 2499,
    yearlyPrice: 22490,
    planId: 'enterprise' as const,
    description: 'Soluciones a medida para grandes proyectos',
    features: [
      { text: 'Todo lo del plan Pro', included: true },
      { text: 'Consultoría dedicada', included: true },
      { text: 'Soporte prioritario 24/7', included: true },
      { text: 'Código fuente completo', included: true },
      { text: 'Revisiones ilimitadas', included: true },
      { text: 'Mantenimiento 3 meses', included: true },
      { text: 'SLA garantizado', included: true },
    ],
    highlighted: false,
    color: 'from-emerald-500 to-teal-600',
  },
];

const faqs = [
  {
    id: '1',
    question: '¿Qué incluye cada plan?',
    answer: 'Cada plan incluye desarrollo personalizado, documentación técnica y soporte post-entrega. Los planes superiores agregan más funcionalidades, integraciones avanzadas y tiempo de soporte extendido. Todos los proyectos incluyen reuniones de seguimiento y ajustes según feedback.',
  },
  {
    id: '2',
    question: '¿Cuánto tiempo tarda el desarrollo?',
    answer: 'El tiempo varía según la complejidad: Plan Básico (2 semanas), Plan Pro (3 semanas), Plan Enterprise (timeline personalizado según requerimientos). Estos tiempos incluyen desarrollo, testing y entrega de documentación.',
  },
  {
    id: '3',
    question: '¿Puedo cambiar de plan después?',
    answer: 'Sí, puedes actualizar tu plan en cualquier momento. Si necesitas escalar tu solución, te ayudamos a migrar al plan superior manteniendo todo el trabajo ya realizado. Solo pagas la diferencia.',
  },
  {
    id: '4',
    question: '¿Ofrecen garantía?',
    answer: 'Todos nuestros proyectos incluyen garantía de funcionamiento por el período de soporte incluido en cada plan. Si algo no funciona como se acordó en las especificaciones, lo corregimos sin costo adicional.',
  },
  {
    id: '5',
    question: '¿Qué métodos de pago aceptan?',
    answer: 'Aceptamos tarjetas de crédito/débito (Visa, Mastercard, American Express) a través de Stripe. Para planes Enterprise, también ofrecemos facturación y transferencia bancaria.',
  },
];

const services = [
  {
    title: 'Chatbots Inteligentes',
    description: 'Desarrollamos chatbots personalizados que entienden el contexto de tu negocio y pueden atender a tus clientes 24/7.',
    features: ['Integración con WhatsApp, Web, Telegram', 'Procesamiento de lenguaje natural', 'Base de conocimiento personalizada'],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Modelos de Machine Learning',
    description: 'Creamos modelos predictivos y de clasificación adaptados a tus datos y objetivos de negocio.',
    features: ['Predicción de ventas y demanda', 'Clasificación de clientes', 'Detección de anomalías'],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Automatización con IA',
    description: 'Automatizamos procesos repetitivos usando inteligencia artificial para que tu equipo se enfoque en lo importante.',
    features: ['Procesamiento de documentos', 'Extracción de información', 'Flujos de trabajo automatizados'],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    color: 'from-amber-500 to-orange-500',
  },
  {
    title: 'Consultoría en IA',
    description: 'Te asesoramos para identificar oportunidades de implementar IA en tu empresa y maximizar el ROI.',
    features: ['Análisis de viabilidad', 'Roadmap de implementación', 'Formación a equipos'],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    color: 'from-emerald-500 to-teal-500',
  },
];

export default function ServicesPage() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <FadeInOnScroll>
              <span className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium mb-6">
                Planes flexibles para cada necesidad
              </span>
            </FadeInOnScroll>

            <FadeInOnScroll delay={0.1}>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Nuestros <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-400">Servicios</span>
              </h1>
            </FadeInOnScroll>

            <FadeInOnScroll delay={0.2}>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                Elige el plan que mejor se adapte a las necesidades de tu negocio. Todos incluyen soporte y garantía.
              </p>
            </FadeInOnScroll>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Billing Toggle */}
            <FadeInOnScroll>
              <div className="flex items-center justify-center gap-4 mb-12">
                <span className={`text-sm font-medium ${!isYearly ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}>
                  Por proyecto
                </span>
                <button
                  onClick={() => setIsYearly(!isYearly)}
                  className="relative w-14 h-7 bg-gray-200 dark:bg-gray-700 rounded-full transition-colors"
                >
                  <motion.div
                    className="absolute top-1 w-5 h-5 bg-blue-600 rounded-full"
                    animate={{ left: isYearly ? '32px' : '4px' }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </button>
                <span className={`text-sm font-medium ${isYearly ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}>
                  Anual
                  <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                    -25%
                  </span>
                </span>
              </div>
            </FadeInOnScroll>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              {plans.map((plan, index) => (
                <FadeInOnScroll key={plan.name} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    className={`relative rounded-3xl overflow-hidden ${
                      plan.highlighted
                        ? 'bg-gradient-to-br from-blue-600 to-purple-700 p-[2px]'
                        : ''
                    }`}
                  >
                    {/* Animated border for highlighted */}
                    {plan.highlighted && (
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-gradient-x opacity-75 blur-sm" />
                    )}

                    <div
                      className={`relative h-full rounded-3xl ${
                        plan.highlighted
                          ? 'bg-white dark:bg-gray-800'
                          : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      {/* Badge */}
                      {plan.badge && (
                        <div className="absolute -top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                          <span className="px-4 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold rounded-full shadow-lg">
                            {plan.badge}
                          </span>
                        </div>
                      )}

                      <div className="p-8">
                        {/* Plan Icon */}
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center text-white mb-4`}>
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>

                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                          {plan.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                          {plan.description}
                        </p>

                        {/* Price */}
                        <div className="mb-6">
                          <div className="flex items-baseline gap-1">
                            <span className="text-4xl font-bold text-gray-900 dark:text-white">
                              €{isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                            </span>
                            <span className="text-gray-500 dark:text-gray-400">
                              /{isYearly ? 'año' : 'proyecto'}
                            </span>
                          </div>
                          {isYearly && (
                            <p className="text-sm text-green-600 mt-1">
                              Ahorras €{(plan.monthlyPrice * 12 - plan.yearlyPrice).toLocaleString()}
                            </p>
                          )}
                        </div>

                        {/* Features */}
                        <ul className="space-y-3 mb-8">
                          {plan.features.map((feature) => (
                            <li key={feature.text} className="flex items-start gap-3">
                              {feature.included ? (
                                <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              ) : (
                                <svg className="w-5 h-5 text-gray-300 dark:text-gray-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                              )}
                              <span className={feature.included ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400 dark:text-gray-600'}>
                                {feature.text}
                              </span>
                            </li>
                          ))}
                        </ul>

                        {/* CTA Button */}
                        <CheckoutButton plan={plan.planId} highlighted={plan.highlighted}>
                          Empezar ahora
                        </CheckoutButton>
                      </div>
                    </div>
                  </motion.div>
                </FadeInOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* Services Detail Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInOnScroll>
              <div className="text-center mb-16">
                <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
                  Nuestras Especialidades
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mt-2 text-gray-900 dark:text-white">
                  ¿Qué podemos hacer <span className="text-gradient">por ti</span>?
                </h2>
              </div>
            </FadeInOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((service, index) => (
                <FadeInOnScroll key={service.title} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow"
                  >
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform`}>
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {service.description}
                    </p>
                    <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.color}`} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </FadeInOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInOnScroll>
              <div className="text-center mb-12">
                <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
                  FAQ
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mt-2 text-gray-900 dark:text-white">
                  Preguntas <span className="text-gradient">Frecuentes</span>
                </h2>
              </div>
            </FadeInOnScroll>

            <FadeInOnScroll delay={0.1}>
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <Accordion type="single" defaultValue="1">
                  {faqs.map((faq) => (
                    <AccordionItem key={faq.id} value={faq.id}>
                      <div className="px-6">
                        <AccordionTrigger>{faq.question}</AccordionTrigger>
                        <AccordionContent>{faq.answer}</AccordionContent>
                      </div>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </FadeInOnScroll>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700" />
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <FadeInOnScroll>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                ¿No estás seguro de qué plan elegir?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Agenda una llamada gratuita y te ayudaremos a encontrar la solución perfecta para tu negocio.
              </p>
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg shadow-2xl hover:shadow-white/25 transition-shadow"
                >
                  Hablar con un experto
                </motion.button>
              </Link>
            </FadeInOnScroll>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
