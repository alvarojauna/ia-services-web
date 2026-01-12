'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  AnimatedBackground,
  TechLogosScroll,
  StatsSection,
  TestimonialsCarousel,
  CTASection,
  FeaturesSection,
} from '@/components/landing';
import FadeInOnScroll from '@/components/animations/FadeInOnScroll';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <Header />

      <main className="flex-grow">
        {/* Hero Section - Premium */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800" />

          {/* Particle animation */}
          <AnimatedBackground />

          {/* Gradient orbs */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/30 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '-2s' }} />

          {/* Content */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <FadeInOnScroll>
              <span className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium mb-6">
                Transformamos negocios con Inteligencia Artificial
              </span>
            </FadeInOnScroll>

            <FadeInOnScroll delay={0.1}>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Soluciones de{' '}
                <span className="relative">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-200 animate-gradient-x">
                    IA
                  </span>
                </span>
                <br />
                para tu Negocio
              </h1>
            </FadeInOnScroll>

            <FadeInOnScroll delay={0.2}>
              <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
                Desarrollamos chatbots inteligentes, modelos de ML personalizados y automatizaciones que{' '}
                <span className="text-white font-semibold">transforman tu empresa</span>.
              </p>
            </FadeInOnScroll>

            <FadeInOnScroll delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/services">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg shadow-2xl hover:shadow-white/25 transition-shadow"
                  >
                    Ver Servicios
                  </motion.button>
                </Link>
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 border-2 border-white/30 text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-colors backdrop-blur-sm"
                  >
                    Contactar
                  </motion.button>
                </Link>
              </div>
            </FadeInOnScroll>

            {/* Scroll indicator */}
            <FadeInOnScroll delay={0.5}>
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-white/60"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </motion.div>
              </div>
            </FadeInOnScroll>
          </div>
        </section>

        {/* Tech Logos Scroll */}
        <div className="bg-gray-900">
          <TechLogosScroll />
        </div>

        {/* Features/Services Section */}
        <FeaturesSection />

        {/* Stats Section */}
        <StatsSection />

        {/* Testimonials Carousel */}
        <TestimonialsCarousel />

        {/* CTA Section */}
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
