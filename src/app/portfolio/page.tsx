import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const projects = [
  {
    id: 1,
    title: 'Chatbot para E-commerce',
    client: 'TechStore',
    category: 'Chatbot IA',
    description:
      'Desarrollo de un asistente virtual inteligente para atención al cliente 24/7, integrado con el catálogo de productos y sistema de pedidos.',
    results: [
      '30% reducción en tickets de soporte',
      '24/7 disponibilidad',
      '85% tasa de resolución automática',
    ],
    technologies: ['GPT-4', 'Node.js', 'WhatsApp API', 'MongoDB'],
    image: '/portfolio/chatbot-ecommerce.jpg',
  },
  {
    id: 2,
    title: 'Predicción de Demanda',
    client: 'LogiFreight',
    category: 'Machine Learning',
    description:
      'Modelo de ML para predecir la demanda de productos y optimizar el inventario, reduciendo costos de almacenamiento.',
    results: [
      '25% reducción en stock muerto',
      '15% ahorro en costos logísticos',
      '95% precisión en predicciones',
    ],
    technologies: ['Python', 'TensorFlow', 'AWS SageMaker', 'Power BI'],
    image: '/portfolio/ml-demand.jpg',
  },
  {
    id: 3,
    title: 'Automatización de Facturas',
    client: 'ContaPlus',
    category: 'Automatización',
    description:
      'Sistema de extracción automática de datos de facturas usando OCR e IA, integrado con el sistema contable del cliente.',
    results: [
      '90% reducción en tiempo de procesamiento',
      '99% precisión en extracción',
      '200+ facturas/hora procesadas',
    ],
    technologies: ['Python', 'AWS Textract', 'FastAPI', 'PostgreSQL'],
    image: '/portfolio/automation-invoices.jpg',
  },
  {
    id: 4,
    title: 'Clasificador de Leads',
    client: 'SalesForce Corp',
    category: 'Machine Learning',
    description:
      'Modelo de clasificación para priorizar leads según probabilidad de conversión, mejorando la eficiencia del equipo de ventas.',
    results: [
      '40% aumento en conversiones',
      '50% reducción en tiempo de calificación',
      'ROI de 300% en 6 meses',
    ],
    technologies: ['Python', 'Scikit-learn', 'Salesforce API', 'Docker'],
    image: '/portfolio/ml-leads.jpg',
  },
  {
    id: 5,
    title: 'Asistente de Recursos Humanos',
    client: 'HR Solutions',
    category: 'Chatbot IA',
    description:
      'Chatbot interno para empleados que responde preguntas sobre políticas, beneficios y procedimientos de la empresa.',
    results: [
      '60% reducción en consultas a RRHH',
      'Respuesta instantánea 24/7',
      'Satisfacción del 92%',
    ],
    technologies: ['OpenAI', 'React', 'Node.js', 'Slack API'],
    image: '/portfolio/chatbot-hr.jpg',
  },
  {
    id: 6,
    title: 'Análisis de Sentimiento',
    client: 'MediaWatch',
    category: 'Machine Learning',
    description:
      'Sistema de análisis de sentimiento en redes sociales para monitorear la reputación de marca en tiempo real.',
    results: [
      'Monitoreo de 10K+ menciones/día',
      'Alertas en tiempo real',
      '89% precisión en clasificación',
    ],
    technologies: ['Python', 'BERT', 'Kafka', 'Elasticsearch'],
    image: '/portfolio/ml-sentiment.jpg',
  },
];

const categories = ['Todos', 'Chatbot IA', 'Machine Learning', 'Automatización'];

export default function PortfolioPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Portfolio</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Conoce algunos de los proyectos que hemos desarrollado para nuestros
              clientes
            </p>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-8 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-4 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full font-medium transition ${
                    category === 'Todos'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition group"
                >
                  <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <span className="text-6xl">
                      {project.category === 'Chatbot IA'
                        ? '🤖'
                        : project.category === 'Machine Learning'
                        ? '🧠'
                        : '⚡'}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                        {project.category}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {project.client}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      {project.description}
                    </p>
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Resultados:
                      </h4>
                      <ul className="space-y-1">
                        {project.results.slice(0, 2).map((result) => (
                          <li
                            key={result}
                            className="text-sm text-gray-600 dark:text-gray-400 flex items-center"
                          >
                            <svg
                              className="w-4 h-4 text-green-500 mr-2"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            {result}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
                <div className="text-gray-600 dark:text-gray-400">
                  Proyectos completados
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">30+</div>
                <div className="text-gray-600 dark:text-gray-400">
                  Clientes satisfechos
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
                <div className="text-gray-600 dark:text-gray-400">
                  Tasa de satisfacción
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">5</div>
                <div className="text-gray-600 dark:text-gray-400">
                  Años de experiencia
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              ¿Quieres un proyecto como estos?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Cuéntanos tu idea y la convertiremos en realidad con inteligencia
              artificial.
            </p>
            <Link
              href="/contact"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition inline-block"
            >
              Iniciar mi proyecto
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
