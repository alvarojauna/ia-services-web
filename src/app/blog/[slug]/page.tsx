import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const posts: Record<string, {
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  content: string;
}> = {
  'introduccion-chatbots-ia': {
    title: 'Introducción a los Chatbots con IA: Guía Completa 2024',
    excerpt:
      'Descubre cómo los chatbots con inteligencia artificial están revolucionando la atención al cliente.',
    category: 'Chatbots',
    author: 'Álvaro Jauna',
    date: '2024-01-15',
    readTime: '8 min',
    content: `
## ¿Qué es un Chatbot con IA?

Un chatbot con inteligencia artificial es un programa diseñado para simular conversaciones humanas de manera natural. A diferencia de los chatbots tradicionales basados en reglas, los chatbots con IA pueden entender el contexto, aprender de las interacciones y proporcionar respuestas más precisas y personalizadas.

## Beneficios para tu Negocio

### 1. Disponibilidad 24/7
Los chatbots nunca duermen. Pueden atender a tus clientes a cualquier hora del día o la noche, los 365 días del año.

### 2. Reducción de Costos
Al automatizar las consultas frecuentes, puedes reducir significativamente los costos de atención al cliente.

### 3. Escalabilidad
Un chatbot puede manejar miles de conversaciones simultáneamente, algo imposible para un equipo humano.

### 4. Consistencia
Cada cliente recibe el mismo nivel de servicio, sin importar la hora o la carga de trabajo.

## Tipos de Chatbots

### Basados en Reglas
- Funcionan con árboles de decisión
- Respuestas predefinidas
- Limitados pero predecibles

### Con IA/NLP
- Entienden lenguaje natural
- Aprenden con el tiempo
- Más flexibles y naturales

### Híbridos
- Combinan reglas con IA
- Lo mejor de ambos mundos
- Ideal para la mayoría de negocios

## Cómo Implementar un Chatbot

1. **Define objetivos claros**: ¿Qué problemas quieres resolver?
2. **Identifica casos de uso**: Comienza con las consultas más frecuentes
3. **Elige la plataforma**: WhatsApp, Web, Telegram, etc.
4. **Entrena con datos reales**: Usa conversaciones históricas
5. **Itera y mejora**: Analiza métricas y optimiza

## Conclusión

Los chatbots con IA no son el futuro, son el presente. Las empresas que los implementan hoy están ganando una ventaja competitiva significativa en la experiencia del cliente.

¿Listo para implementar un chatbot en tu negocio? Contáctanos y te ayudamos a dar el primer paso.
    `,
  },
  'machine-learning-negocios': {
    title: '5 Casos de Uso de Machine Learning para Pequeños Negocios',
    excerpt:
      'El Machine Learning no es solo para grandes empresas. Conoce aplicaciones prácticas.',
    category: 'Machine Learning',
    author: 'Álvaro Jauna',
    date: '2024-01-10',
    readTime: '6 min',
    content: `
## Machine Learning para Todos

Contrario a lo que muchos creen, el Machine Learning no es exclusivo de las grandes corporaciones con presupuestos millonarios. Hoy existen herramientas y servicios que permiten a pequeños negocios aprovechar esta tecnología.

## 5 Casos de Uso Prácticos

### 1. Predicción de Demanda
Anticipa qué productos se venderán más y cuándo. Esto te permite:
- Optimizar inventario
- Reducir productos sin stock
- Disminuir exceso de inventario

### 2. Segmentación de Clientes
Agrupa a tus clientes según comportamiento de compra para:
- Personalizar campañas de marketing
- Ofrecer productos relevantes
- Mejorar retención

### 3. Detección de Fraude
Protege tu negocio identificando transacciones sospechosas antes de que causen daño.

### 4. Recomendaciones de Productos
Como Netflix o Amazon, recomienda productos basándote en historial y preferencias.

### 5. Análisis de Sentimiento
Monitorea qué dicen de tu marca en redes sociales y reseñas para actuar rápidamente.

## Por Dónde Empezar

El primer paso es identificar un problema específico que quieras resolver. No intentes implementar todo a la vez. Comienza con un caso de uso, mide resultados y expande gradualmente.

## Herramientas Accesibles

- **Google Cloud AutoML**: ML sin código
- **AWS SageMaker Canvas**: Interfaz visual
- **Azure ML Studio**: Drag and drop

## Conclusión

El Machine Learning está más accesible que nunca. No necesitas un equipo de científicos de datos para empezar a beneficiarte de esta tecnología.
    `,
  },
  'automatizacion-procesos-ia': {
    title: 'Automatización de Procesos con IA: Por Dónde Empezar',
    excerpt:
      'Guía paso a paso para identificar qué procesos de tu empresa pueden beneficiarse de la automatización.',
    category: 'Automatización',
    author: 'Álvaro Jauna',
    date: '2024-01-05',
    readTime: '10 min',
    content: `
## La Automatización Inteligente

La automatización con IA va más allá de los macros de Excel o las reglas simples. Permite automatizar tareas que antes requerían juicio humano.

## Identificando Oportunidades

### Características de Procesos Automatizables

1. **Repetitivos**: Se realizan frecuentemente
2. **Basados en reglas**: Tienen lógica definible
3. **Digitales**: Los datos ya están en formato digital
4. **Voluminosos**: Consumen mucho tiempo manual

### Ejemplos Comunes

- Procesamiento de facturas
- Clasificación de emails
- Extracción de datos de documentos
- Generación de informes
- Respuesta a consultas frecuentes

## Framework de Priorización

Evalúa cada proceso según:

| Factor | Peso |
|--------|------|
| Volumen | 30% |
| Tiempo ahorrado | 25% |
| Complejidad técnica | 20% |
| Impacto en errores | 15% |
| Costo actual | 10% |

## Pasos para Implementar

1. **Mapea el proceso actual**: Documenta cada paso
2. **Identifica excepciones**: ¿Qué casos son diferentes?
3. **Define métricas**: ¿Cómo medirás el éxito?
4. **Piloto pequeño**: Empieza con un subconjunto
5. **Escala gradualmente**: Expande según resultados

## ROI de la Automatización

En promedio, las empresas ven un ROI del 200-300% en el primer año de implementar automatización con IA.

## Conclusión

La automatización no reemplaza empleados, los libera para tareas de mayor valor. Identifica tus procesos repetitivos y comienza tu transformación digital hoy.
    `,
  },
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts[slug];

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/blog"
              className="inline-flex items-center text-blue-200 hover:text-white mb-6 transition"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Volver al blog
            </Link>
            <span className="inline-block bg-blue-500 text-white text-sm px-3 py-1 rounded-full mb-4">
              {post.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center gap-4 text-blue-100">
              <span>{post.author}</span>
              <span>•</span>
              <span>{formatDate(post.date)}</span>
              <span>•</span>
              <span>{post.readTime} de lectura</span>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <article className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {post.content.split('\n').map((line, index) => {
                if (line.startsWith('## ')) {
                  return (
                    <h2
                      key={index}
                      className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white"
                    >
                      {line.replace('## ', '')}
                    </h2>
                  );
                }
                if (line.startsWith('### ')) {
                  return (
                    <h3
                      key={index}
                      className="text-xl font-bold mt-6 mb-3 text-gray-900 dark:text-white"
                    >
                      {line.replace('### ', '')}
                    </h3>
                  );
                }
                if (line.startsWith('- ')) {
                  return (
                    <li
                      key={index}
                      className="text-gray-700 dark:text-gray-300 ml-4"
                    >
                      {line.replace('- ', '')}
                    </li>
                  );
                }
                if (line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ') || line.startsWith('4. ') || line.startsWith('5. ')) {
                  return (
                    <li
                      key={index}
                      className="text-gray-700 dark:text-gray-300 ml-4 list-decimal"
                    >
                      {line.replace(/^\d+\.\s/, '')}
                    </li>
                  );
                }
                if (line.trim() === '') {
                  return <br key={index} />;
                }
                if (line.startsWith('|')) {
                  return null; // Skip table rows for simplicity
                }
                return (
                  <p key={index} className="text-gray-700 dark:text-gray-300 mb-4">
                    {line}
                  </p>
                );
              })}
            </div>
          </div>
        </article>

        {/* CTA Section */}
        <section className="py-12 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-blue-600 rounded-xl p-8 text-white text-center">
              <h2 className="text-2xl font-bold mb-4">
                ¿Te interesa implementar esto en tu negocio?
              </h2>
              <p className="text-blue-100 mb-6">
                Contáctanos y te ayudamos a dar el primer paso hacia la
                transformación digital con IA.
              </p>
              <Link
                href="/contact"
                className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                Solicitar consulta gratuita
              </Link>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              Artículos relacionados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(posts)
                .filter(([key]) => key !== slug)
                .slice(0, 2)
                .map(([key, relatedPost]) => (
                  <Link
                    key={key}
                    href={`/blog/${key}`}
                    className="block bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition"
                  >
                    <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                      {relatedPost.category}
                    </span>
                    <h3 className="font-bold text-gray-900 dark:text-white mt-2 line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      {relatedPost.readTime} de lectura
                    </p>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({
    slug,
  }));
}
