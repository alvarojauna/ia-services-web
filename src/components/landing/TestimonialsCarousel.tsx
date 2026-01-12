'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FadeInOnScroll from '@/components/animations/FadeInOnScroll';

const testimonials = [
  {
    name: 'María García',
    role: 'CEO',
    company: 'TechStartup',
    text: 'Excelente trabajo. El chatbot que nos desarrollaron aumentó nuestras conversiones un 30%. El equipo fue muy profesional y atento a nuestras necesidades.',
    rating: 5,
    avatar: 'MG',
    color: 'bg-purple-500',
  },
  {
    name: 'Carlos López',
    role: 'CTO',
    company: 'E-commerce Pro',
    text: 'Muy profesional y entrega a tiempo. La automatización que implementaron nos ahorra más de 20 horas semanales. Totalmente recomendado.',
    rating: 5,
    avatar: 'CL',
    color: 'bg-blue-500',
  },
  {
    name: 'Ana Martínez',
    role: 'Directora de Operaciones',
    company: 'FinTech Solutions',
    text: 'El modelo de ML que desarrollaron predice con un 95% de precisión. Superó nuestras expectativas y el ROI fue inmediato.',
    rating: 5,
    avatar: 'AM',
    color: 'bg-emerald-500',
  },
  {
    name: 'Roberto Sánchez',
    role: 'Fundador',
    company: 'DataDrive',
    text: 'Consultoría de primer nivel. Nos ayudaron a definir nuestra estrategia de IA desde cero. Ahora somos líderes en nuestro sector.',
    rating: 5,
    avatar: 'RS',
    color: 'bg-orange-500',
  },
];

export default function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInOnScroll>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
            Lo que dicen nuestros <span className="text-gradient">clientes</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Empresas que ya transformaron su negocio con nuestras soluciones de IA
          </p>
        </FadeInOnScroll>

        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Card */}
          <div className="relative h-[320px] md:h-[280px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="absolute inset-0"
              >
                <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-xl p-8 md:p-10 h-full">
                  <div className="flex flex-col md:flex-row gap-6 h-full">
                    {/* Avatar */}
                    <div className="flex-shrink-0 flex md:flex-col items-center gap-4">
                      <div
                        className={`w-16 h-16 md:w-20 md:h-20 rounded-full ${testimonials[current].color} flex items-center justify-center text-white text-xl md:text-2xl font-bold shadow-lg`}
                      >
                        {testimonials[current].avatar}
                      </div>
                      <div className="flex md:mt-2">
                        {[...Array(testimonials[current].rating)].map((_, i) => (
                          <span key={i} className="text-yellow-400 text-lg">
                            ★
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-grow flex flex-col justify-between">
                      <p className="text-gray-600 dark:text-gray-300 text-lg italic leading-relaxed">
                        &ldquo;{testimonials[current].text}&rdquo;
                      </p>
                      <div className="mt-4">
                        <p className="font-bold text-gray-900 dark:text-white text-lg">
                          {testimonials[current].name}
                        </p>
                        <p className="text-gray-500 dark:text-gray-400">
                          {testimonials[current].role} en {testimonials[current].company}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goTo(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === current
                    ? 'bg-blue-600 w-8'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
