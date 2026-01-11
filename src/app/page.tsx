import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const services = [
  {
    title: 'Chatbots IA',
    description: 'Asistentes virtuales inteligentes para tu negocio que atienden 24/7.',
    icon: '🤖',
  },
  {
    title: 'Modelos ML',
    description: 'Modelos de Machine Learning personalizados para tus necesidades.',
    icon: '🧠',
  },
  {
    title: 'Automatización',
    description: 'Automatiza procesos repetitivos con inteligencia artificial.',
    icon: '⚡',
  },
  {
    title: 'Consultoría',
    description: 'Asesoramiento experto para implementar IA en tu empresa.',
    icon: '💡',
  },
];

const testimonials = [
  {
    name: 'María García',
    company: 'TechStartup',
    text: 'Excelente trabajo. El chatbot que nos desarrollaron aumentó nuestras conversiones un 30%.',
    rating: 5,
  },
  {
    name: 'Carlos López',
    company: 'E-commerce Pro',
    text: 'Muy profesional y entrega a tiempo. Totalmente recomendado.',
    rating: 5,
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Soluciones de IA para tu Negocio
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Desarrollamos chatbots, modelos de ML y automatizaciones que transforman tu empresa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/services"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                Ver Servicios
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
              >
                Contactar
              </Link>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
              Nuestros Servicios
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-sm hover:shadow-md transition"
                >
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link
                href="/services"
                className="text-blue-600 font-semibold hover:text-blue-700"
              >
                Ver todos los planes →
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
              Lo que dicen nuestros clientes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.name}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 italic">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              ¿Listo para transformar tu negocio con IA?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Contáctanos hoy y te ayudamos a implementar soluciones de inteligencia artificial.
            </p>
            <Link
              href="/contact"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition inline-block"
            >
              Solicitar Presupuesto
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
