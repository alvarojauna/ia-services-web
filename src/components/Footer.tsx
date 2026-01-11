import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">IA Services</h3>
            <p className="text-sm">
              Soluciones profesionales de Inteligencia Artificial y Machine Learning para tu negocio.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Servicios</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/services" className="hover:text-white">Chatbots IA</Link></li>
              <li><Link href="/services" className="hover:text-white">Modelos ML</Link></li>
              <li><Link href="/services" className="hover:text-white">Automatización</Link></li>
              <li><Link href="/services" className="hover:text-white">Consultoría</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/portfolio" className="hover:text-white">Portfolio</Link></li>
              <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contacto</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2 text-sm">
              <li>alvarojauna100@gmail.com</li>
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
