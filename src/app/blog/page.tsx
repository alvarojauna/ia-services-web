import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const posts = [
  {
    slug: 'introduccion-chatbots-ia',
    title: 'Introducción a los Chatbots con IA: Guía Completa 2024',
    excerpt:
      'Descubre cómo los chatbots con inteligencia artificial están revolucionando la atención al cliente y cómo puedes implementar uno en tu negocio.',
    category: 'Chatbots',
    author: 'Álvaro Jauna',
    date: '2024-01-15',
    readTime: '8 min',
    image: '/blog/chatbots-intro.jpg',
  },
  {
    slug: 'machine-learning-negocios',
    title: '5 Casos de Uso de Machine Learning para Pequeños Negocios',
    excerpt:
      'El Machine Learning no es solo para grandes empresas. Conoce aplicaciones prácticas que pueden transformar tu pequeño negocio.',
    category: 'Machine Learning',
    author: 'Álvaro Jauna',
    date: '2024-01-10',
    readTime: '6 min',
    image: '/blog/ml-business.jpg',
  },
  {
    slug: 'automatizacion-procesos-ia',
    title: 'Automatización de Procesos con IA: Por Dónde Empezar',
    excerpt:
      'Guía paso a paso para identificar qué procesos de tu empresa pueden beneficiarse de la automatización con inteligencia artificial.',
    category: 'Automatización',
    author: 'Álvaro Jauna',
    date: '2024-01-05',
    readTime: '10 min',
    image: '/blog/automation.jpg',
  },
  {
    slug: 'gpt-4-aplicaciones-empresariales',
    title: 'GPT-4 y sus Aplicaciones Empresariales',
    excerpt:
      'Exploramos las capacidades de GPT-4 y cómo las empresas están aprovechando este modelo para mejorar sus operaciones.',
    category: 'IA Generativa',
    author: 'Álvaro Jauna',
    date: '2024-01-01',
    readTime: '7 min',
    image: '/blog/gpt4.jpg',
  },
  {
    slug: 'roi-proyectos-ia',
    title: 'Cómo Calcular el ROI de Proyectos de IA',
    excerpt:
      'Metodología práctica para medir el retorno de inversión en proyectos de inteligencia artificial y justificar la inversión.',
    category: 'Estrategia',
    author: 'Álvaro Jauna',
    date: '2023-12-20',
    readTime: '9 min',
    image: '/blog/roi.jpg',
  },
  {
    slug: 'tendencias-ia-2024',
    title: 'Tendencias en IA para 2024: Lo que Viene',
    excerpt:
      'Las principales tendencias en inteligencia artificial que definirán el próximo año y cómo preparar tu empresa.',
    category: 'Tendencias',
    author: 'Álvaro Jauna',
    date: '2023-12-15',
    readTime: '5 min',
    image: '/blog/trends.jpg',
  },
];

const categories = [
  'Todos',
  'Chatbots',
  'Machine Learning',
  'Automatización',
  'IA Generativa',
  'Estrategia',
];

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Artículos, guías y recursos sobre Inteligencia Artificial y Machine
              Learning
            </p>
          </div>
        </section>

        {/* Categories */}
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

        {/* Blog Posts */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition group"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                      <span className="text-6xl">
                        {post.category === 'Chatbots'
                          ? '🤖'
                          : post.category === 'Machine Learning'
                          ? '🧠'
                          : post.category === 'Automatización'
                          ? '⚡'
                          : post.category === 'IA Generativa'
                          ? '✨'
                          : post.category === 'Estrategia'
                          ? '📊'
                          : '💡'}
                      </span>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                          {post.category}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {post.readTime}
                        </span>
                      </div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                        <span>{post.author}</span>
                        <span>{formatDate(post.date)}</span>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              Suscríbete al Newsletter
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Recibe artículos, guías y novedades sobre IA directamente en tu
              email. Sin spam, solo contenido de valor.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Suscribirme
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
