'use client';

const technologies = [
  { name: 'Python', icon: '🐍' },
  { name: 'TensorFlow', icon: '🔮' },
  { name: 'PyTorch', icon: '🔥' },
  { name: 'AWS', icon: '☁️' },
  { name: 'OpenAI', icon: '🤖' },
  { name: 'LangChain', icon: '🔗' },
  { name: 'Hugging Face', icon: '🤗' },
  { name: 'Docker', icon: '🐳' },
  { name: 'Kubernetes', icon: '⚙️' },
  { name: 'React', icon: '⚛️' },
  { name: 'Node.js', icon: '💚' },
  { name: 'PostgreSQL', icon: '🐘' },
];

export default function TechLogosScroll() {
  return (
    <div className="py-12 bg-white/5 backdrop-blur-sm overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-6">
        <p className="text-center text-sm text-gray-400 uppercase tracking-wider">
          Tecnologías que dominamos
        </p>
      </div>
      <div className="relative">
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-900 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-900 to-transparent z-10" />

        {/* Scrolling container */}
        <div className="flex animate-scroll-x">
          {[...technologies, ...technologies].map((tech, index) => (
            <div
              key={`${tech.name}-${index}`}
              className="flex items-center gap-2 px-8 py-3 mx-4 bg-white/10 rounded-full backdrop-blur-sm border border-white/10 whitespace-nowrap hover:bg-white/20 transition-colors"
            >
              <span className="text-2xl">{tech.icon}</span>
              <span className="text-white font-medium">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
