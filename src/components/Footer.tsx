import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4 text-gradient">IA Services</h3>
            <p className="text-sm">
              Soluciones profesionales de Inteligencia Artificial y Machine Learning para tu negocio.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Servicios</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/services" className="hover:text-white transition-colors duration-200">Chatbots IA</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors duration-200">Modelos ML</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors duration-200">Automatización</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors duration-200">Consultoría</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/portfolio" className="hover:text-white transition-colors duration-200">Portfolio</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors duration-200">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors duration-200">Contacto</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white transition-colors duration-200 cursor-default">alvarojauna100@gmail.com</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          © {new Date().getFullYear()} IA Services. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
