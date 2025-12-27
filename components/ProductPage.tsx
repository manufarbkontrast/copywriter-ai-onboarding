import React, { useState, useEffect, useRef } from 'react';
import { ProductType } from '../types';

interface Props {
  onStartOnboarding: (product: ProductType) => void;
}

const ProductPage: React.FC<Props> = ({ onStartOnboarding }) => {
  const [selectedProduct, setSelectedProduct] = useState<ProductType>('');
  const [scrollY, setScrollY] = useState(0);
  const [heroOpacity, setHeroOpacity] = useState(1);
  const [scrollProgress, setScrollProgress] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const [particles, setParticles] = useState<Array<{id: number, left: number, delay: number}>>([]);

  // Partikel generieren - weniger und subtiler
  useEffect(() => {
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 20
    }));
    setParticles(newParticles);
  }, []);

  // Pflanzen-Icons für die Produkte
  const PhonePlantIcon = () => (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Plant stem */}
      <path d="M 60 80 L 60 50" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      {/* Plant branches */}
      <path d="M 60 55 L 45 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M 60 60 L 75 45" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M 60 65 L 50 50" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      {/* Chat bubble in center */}
      <circle cx="60" cy="40" r="12" stroke="currentColor" strokeWidth="2" fill="none"/>
      <circle cx="60" cy="40" r="6" fill="currentColor" className="animate-pulse-glow"/>
      {/* Leaves/Particles */}
      <circle cx="45" cy="38" r="2" fill="currentColor" className="animate-pulse-glow"/>
      <circle cx="75" cy="43" r="2" fill="currentColor" className="animate-pulse-glow"/>
      <circle cx="52" cy="48" r="1.5" fill="currentColor" className="animate-pulse-glow"/>
    </svg>
  );

  const ChatbotPlantIcon = () => (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Central node */}
      <circle cx="60" cy="50" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
      <text x="60" y="55" textAnchor="middle" className="text-xs fill-current">B</text>
      {/* Branches */}
      <path d="M 60 45 L 40 35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M 60 45 L 80 35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M 60 55 L 50 70" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M 60 55 L 70 70" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      {/* Nodes */}
      <circle cx="40" cy="33" r="6" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <text x="40" y="37" textAnchor="middle" className="text-xs fill-current">?</text>
      <circle cx="80" cy="33" r="6" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <circle cx="50" cy="70" r="5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <text x="50" y="74" textAnchor="middle" className="text-xs fill-current">000</text>
      <circle cx="70" cy="70" r="5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      {/* Particles */}
      <circle cx="40" cy="31" r="1.5" fill="currentColor" className="animate-pulse-glow"/>
      <circle cx="82" cy="31" r="1.5" fill="currentColor" className="animate-pulse-glow"/>
    </svg>
  );

  const WebsitePlantIcon = () => (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Plant with roots */}
      <path d="M 60 80 L 60 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      {/* Roots */}
      <path d="M 60 80 L 50 90" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M 60 80 L 70 90" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Branches to buildings */}
      <path d="M 60 50 L 85 35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="3,3"/>
      <path d="M 60 55 L 85 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="3,3"/>
      {/* Building structures */}
      <rect x="80" y="30" width="12" height="15" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <rect x="83" y="33" width="3" height="3" fill="currentColor"/>
      <rect x="88" y="33" width="3" height="3" fill="currentColor"/>
      <rect x="80" y="38" width="12" height="7" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      {/* Leaves */}
      <circle cx="45" cy="45" r="3" fill="currentColor" className="animate-pulse-glow"/>
      <circle cx="55" cy="35" r="2.5" fill="currentColor" className="animate-pulse-glow"/>
    </svg>
  );

  const products = [
    {
      id: 'phone-agent' as ProductType,
      title: "KI Telefon Agenten",
      icon: PhonePlantIcon,
      description: "Intelligente Telefonassistenten, die Ihre Kundenanfragen professionell bearbeiten und rund um die Uhr verfügbar sind.",
      benefits: [
        "24/7 Verfügbarkeit für Ihre Kunden",
        "Konsistente und professionelle Kommunikation",
        "Reduzierung von Wartezeiten und Kosten",
        "Skalierbare Kundenbetreuung ohne Personalaufwand"
      ],
      problems: [
        "Verpasste Anrufe außerhalb der Geschäftszeiten",
        "Hohe Personalkosten für Call-Center",
        "Inkonsistente Qualität der Kundenbetreuung",
        "Überlastung der Mitarbeiter bei Spitzenzeiten"
      ]
    },
    {
      id: 'chatbot' as ProductType,
      title: "Onboarding für Mitarbeiter durch Chatbot",
      icon: ChatbotPlantIcon,
      description: "Automatisiertes Mitarbeiter-Onboarding mit intelligenten Chatbots, die neue Mitarbeiter effizient einarbeiten.",
      benefits: [
        "Konsistentes Onboarding für alle neuen Mitarbeiter",
        "Reduzierung des Zeitaufwands für HR-Abteilungen",
        "Sofortige Verfügbarkeit von Informationen",
        "Personalisierte Lernerfahrung für jeden Mitarbeiter"
      ],
      problems: [
        "Zeitaufwändiges manuelles Onboarding",
        "Inkonsistente Informationen für neue Mitarbeiter",
        "Hoher Aufwand für HR-Abteilungen",
        "Lange Einarbeitungszeiten"
      ]
    },
    {
      id: 'website' as ProductType,
      title: "Website Erstellung",
      icon: WebsitePlantIcon,
      description: "Professionelle, moderne Websites, die Ihre Marke optimal präsentieren und Ihre Geschäftsziele unterstützen.",
      benefits: [
        "Professionelle Online-Präsenz",
        "Optimiert für Suchmaschinen und Conversion",
        "Moderne, responsive Designs",
        "Schnelle Umsetzung ohne technisches Know-how"
      ],
      problems: [
        "Fehlende oder veraltete Online-Präsenz",
        "Hohe Kosten für Webentwicklung",
        "Lange Entwicklungszeiten",
        "Technische Komplexität ohne Expertenwissen"
      ]
    }
  ];

  const handleProductSelect = (productId: ProductType) => {
    setSelectedProduct(productId);
  };

  const handleStartOnboarding = () => {
    if (selectedProduct) {
      onStartOnboarding(selectedProduct);
    }
  };

  const scrollToProducts = () => {
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Scroll-Effekt für Hero-Section
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      // Fade-out Effekt basierend auf Scroll-Position
      const heroHeight = heroRef.current?.offsetHeight || window.innerHeight;
      const opacity = Math.max(0, 1 - (currentScrollY / heroHeight) * 1.2);
      setHeroOpacity(opacity);
      
      // Scroll-Progress berechnen
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (currentScrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-[#1a1a1a] min-h-screen relative">
      {/* Floating Particles - über die gesamte Seite */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-0.5 h-0.5 bg-white rounded-full particle opacity-20"
            style={{
              left: `${particle.left}%`,
              top: '100%',
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-800 z-50">
        <div 
          className="h-full bg-white transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Große Hero Section mit Scroll-Effekten */}
      <section 
        ref={heroRef}
        className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 relative"
        style={{
          opacity: heroOpacity,
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      >

        {/* Animated Background Glows - sehr subtil */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"
            style={{
              opacity: 0.02,
              transform: `translate(${scrollY * 0.2}px, ${scrollY * 0.3}px) scale(${1 + scrollY * 0.0002})`
            }}
          />
          <div 
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl"
            style={{
              opacity: 0.02,
              transform: `translate(${-scrollY * 0.2}px, ${-scrollY * 0.3}px) scale(${1 + scrollY * 0.0002})`
            }}
          />
        </div>

        <div 
          className="text-center max-w-5xl mx-auto animate-fade-in relative z-20"
          style={{
            transform: `translateY(${-scrollY * 0.4}px)`,
          }}
        >
          <h1 
            className="text-6xl md:text-8xl lg:text-9xl font-light text-white mb-8 md:mb-12 tracking-tight leading-none"
            style={{
              transform: `scale(${Math.max(0.7, 1 - scrollY * 0.0008)}) translateY(${scrollY * 0.1}px)`,
              textShadow: '0 0 20px rgba(255,255,255,0.05)',
              opacity: Math.max(0.3, 1 - scrollY * 0.0015),
            }}
          >
            FORCE4GOOD
          </h1>
          <p 
            className="text-xl md:text-2xl lg:text-3xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12 md:mb-16 font-light"
            style={{
              transform: `translateY(${scrollY * 0.2}px)`,
              opacity: Math.max(0, 1 - scrollY * 0.003),
            }}
          >
            Innovative KI-Lösungen, die Ihr Unternehmen voranbringen
          </p>
          <p 
            className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed mb-12 md:mb-16"
            style={{
              transform: `translateY(${scrollY * 0.25}px)`,
              opacity: Math.max(0, 1 - scrollY * 0.004),
            }}
          >
            Wählen Sie eine Lösung aus und starten Sie Ihr individuelles Onboarding
          </p>
          
          {/* Scroll Indicator */}
          <button
            onClick={scrollToProducts}
            className="group flex flex-col items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300 animate-gentle-bounce relative z-10"
            style={{
              opacity: Math.max(0, 1 - scrollY * 0.008),
              transform: `translateY(${scrollY * 0.3}px)`,
            }}
            aria-label="Zu den Produkten scrollen"
          >
            <span className="text-sm uppercase tracking-widest font-light">Lösungen entdecken</span>
            <svg 
              className="w-6 h-6 transform group-hover:translate-y-1 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>
      </section>

      {/* Header mit Button oben rechts - Sticky */}
      <header className="bg-[#1a1a1a] bg-opacity-95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-30 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-end">
          <button
            onClick={handleStartOnboarding}
            disabled={!selectedProduct}
            className={`px-6 py-2.5 text-sm font-medium tracking-wide rounded-sm transition-all duration-300 transform uppercase ${
              selectedProduct
                ? 'bg-white hover:bg-gray-200 text-[#1a1a1a] shadow-sm hover:shadow-md hover:-translate-y-0.5'
                : 'bg-gray-800 text-gray-500 cursor-not-allowed transform-none border border-gray-700'
            }`}
          >
            Onboarding starten
          </button>
        </div>
      </header>

      {/* Produkte Section */}
      <section id="products-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">

        {/* Section Title */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4 tracking-tight">
            Unsere Lösungen
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Wählen Sie die KI-Lösung, die am besten zu Ihrem Unternehmen passt
          </p>
        </div>

        {/* Produkte */}
        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product, index) => {
            const isSelected = selectedProduct === product.id;
            return (
              <div
                key={product.id}
                className={`relative bg-gray-900 bg-opacity-50 backdrop-blur-sm border-2 rounded-lg p-8 transition-all duration-300 cursor-pointer animate-fade-in hover:border-white hover:bg-opacity-70 ${
                  isSelected 
                    ? 'border-white bg-opacity-80' 
                    : 'border-gray-700'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleProductSelect(product.id)}
              >
                {isSelected && (
                  <div className="absolute top-4 right-4 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-[#1a1a1a]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}

                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div className={`w-24 h-24 flex items-center justify-center transition-transform duration-300 hover:scale-110 ${
                    isSelected ? 'text-white' : 'text-gray-400'
                  }`}>
                    <product.icon />
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-2xl font-light text-white mb-4 tracking-tight">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Benefits - simplified */}
                  <div className="space-y-2 mb-4">
                    {product.benefits.slice(0, 2).map((benefit, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-white mt-1 flex-shrink-0">✓</span>
                        <span className="text-gray-300 text-xs leading-relaxed">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section unten */}
      <section className="border-t border-gray-800 py-16 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-light text-white mb-6 tracking-tight">
            Bereit für Ihre individuelle Lösung?
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
            Starten Sie jetzt das Onboarding und finden Sie die perfekte KI-Lösung für Ihr Unternehmen.
          </p>
          <button
            onClick={handleStartOnboarding}
            disabled={!selectedProduct}
            className={`px-10 py-4 text-sm font-medium tracking-wide rounded-sm transition-all duration-300 transform uppercase ${
              selectedProduct
                ? 'bg-white hover:bg-gray-200 text-[#1a1a1a] hover:shadow-md hover:-translate-y-0.5'
                : 'bg-gray-800 text-gray-500 cursor-not-allowed transform-none border border-gray-700'
            }`}
          >
            {selectedProduct ? 'Onboarding starten' : 'Bitte wählen Sie ein Produkt'}
          </button>
        </div>
      </section>
    </div>
  );
};

export default ProductPage;
