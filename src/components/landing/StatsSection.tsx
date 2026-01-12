'use client';

import { AnimatedCounter } from '@/components/animations';
import FadeInOnScroll from '@/components/animations/FadeInOnScroll';

const stats = [
  { value: 50, suffix: '+', label: 'Proyectos Completados' },
  { value: 98, suffix: '%', label: 'Clientes Satisfechos' },
  { value: 24, suffix: '/7', label: 'Soporte Disponible' },
  { value: 3, suffix: 'x', label: 'ROI Promedio' },
];

export default function StatsSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInOnScroll>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">
            Resultados que <span className="text-gradient">hablan por sí solos</span>
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Números que reflejan nuestro compromiso con la excelencia
          </p>
        </FadeInOnScroll>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <FadeInOnScroll key={stat.label} delay={index * 0.1}>
              <div className="text-center group">
                <div className="relative inline-block">
                  <div className="text-5xl md:text-6xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">
                    <AnimatedCounter value={stat.value} duration={2} />
                    <span className="text-blue-400">{stat.suffix}</span>
                  </div>
                  <div className="absolute -inset-4 bg-blue-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                </div>
                <p className="text-gray-400 text-sm md:text-base">{stat.label}</p>
              </div>
            </FadeInOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
