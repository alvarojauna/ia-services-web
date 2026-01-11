import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const plans = [
  {
    name: 'Básico',
    price: '499',
    description: 'Ideal para pequeños negocios que quieren empezar con IA',
    features: [
      'Chatbot simple para tu web',
      '1 revisión incluida',
      'Documentación básica',
      'Soporte por email',
      'Entrega en 2 semanas',
    ],
    highlighted: false,
    cta: 'Empezar',
  },
  {
    name: 'Pro',
    price: '999',
    description: 'Para empresas que necesitan soluciones más avanzadas',
    features: [
      'Todo lo del plan Básico',
      'Integración con APIs externas',
      'Modelo ML personalizado',
      '3 revisiones incluidas',
      'Soporte 30 días',
      'Entrega en 3 semanas',
    ],
    highlighted: true,
    cta: 'Más Popular',
  },
  {
    name: 'Enterprise',
    price: '2499',
    description: 'Soluciones a medida para grandes proyectos',
    features: [
      'Todo lo del plan Pro',
      'Consultoría dedicada',
      'Soporte prioritario 24/7',
      'Código fuente completo',
      'Revisiones ilimitadas',
      'Mantenimiento 3 meses',
    ],
    highlighted: false,
    cta: 'Contactar',
  },
];

const faqs = [
  {
    question: '¿Qué incluye cada plan?',
    answer:
      'Cada plan incluye desarrollo personalizado, documentación y soporte. Los planes superiores agregan más funcionalidades y tiempo de soporte.',
  },
  {
    question: '¿Cuánto tiempo tarda el desarrollo?',
    answer:
      'El tiempo varía según el plan: Básico (2 semanas), Pro (3 semanas), Enterprise (a medida según complejidad).',
  },
  {
    question: '¿Puedo cambiar de plan después?',
    answer:
      'Sí, puedes actualizar tu plan en cualquier momento. Te ayudamos a escalar tu solución según crezcan tus necesidades.',
  },
  {
    question: '¿Ofrecen garantía?',
    answer:
      'Todos nuestros proyectos incluyen garantía de funcionamiento. Si algo no funciona como se acordó, lo corregimos sin costo adicional.',
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Nuestros Servicios
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Elige el plan que mejor se adapte a las necesidades de tu negocio
            </p>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden ${
                    plan.highlighted
                      ? 'ring-2 ring-blue-600 scale-105'
                      : ''
                  }`}
                >
                  {plan.highlighted && (
                    <div className="absolute top-0 left-0 right-0 bg-blue-600 text-white text-center py-1 text-sm font-semibold">
                      Recomendado
                    </div>
                  )}
                  <div className={`p-8 ${plan.highlighted ? 'pt-10' : ''}`}>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      {plan.description}
                    </p>
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-gray-900 dark:text-white">
                        €{plan.price}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">
                        /proyecto
                      </span>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start text-gray-600 dark:text-gray-300"
                        >
                          <svg
                            className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/contact"
                      className={`block w-full text-center py-3 rounded-lg font-semibold transition ${
                        plan.highlighted
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {plan.cta}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Detail Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
              ¿Qué podemos hacer por ti?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm">
                <div className="text-4xl mb-4">🤖</div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  Chatbots Inteligentes
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Desarrollamos chatbots personalizados que entienden el contexto
                  de tu negocio y pueden atender a tus clientes 24/7.
                </p>
                <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                  <li>• Integración con WhatsApp, Web, Telegram</li>
                  <li>• Procesamiento de lenguaje natural</li>
                  <li>• Base de conocimiento personalizada</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm">
                <div className="text-4xl mb-4">🧠</div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  Modelos de Machine Learning
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Creamos modelos predictivos y de clasificación adaptados a tus
                  datos y objetivos de negocio.
                </p>
                <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                  <li>• Predicción de ventas y demanda</li>
                  <li>• Clasificación de clientes</li>
                  <li>• Detección de anomalías</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  Automatización con IA
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Automatizamos procesos repetitivos usando inteligencia
                  artificial para que tu equipo se enfoque en lo importante.
                </p>
                <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                  <li>• Procesamiento de documentos</li>
                  <li>• Extracción de información</li>
                  <li>• Flujos de trabajo automatizados</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm">
                <div className="text-4xl mb-4">💡</div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  Consultoría en IA
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Te asesoramos para identificar oportunidades de implementar IA
                  en tu empresa y maximizar el retorno de inversión.
                </p>
                <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                  <li>• Análisis de viabilidad</li>
                  <li>• Roadmap de implementación</li>
                  <li>• Formación a equipos</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
              Preguntas Frecuentes
            </h2>
            <div className="space-y-6">
              {faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
                >
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              ¿No estás seguro de qué plan elegir?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Contáctanos y te ayudaremos a encontrar la solución perfecta para
              tu negocio.
            </p>
            <Link
              href="/contact"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition inline-block"
            >
              Hablar con un experto
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
