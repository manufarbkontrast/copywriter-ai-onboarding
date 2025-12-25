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

  // SVG Icons für die Produkte
  const PhoneIcon = () => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="20" y="15" width="60" height="70" rx="8" stroke="currentColor" strokeWidth="3" fill="none"/>
      <rect x="30" y="25" width="40" height="30" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
      <circle cx="50" cy="70" r="3" fill="currentColor"/>
      <path d="M 40 85 L 60 85" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  );

  const ChatbotIcon = () => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="15" y="20" width="70" height="50" rx="5" stroke="currentColor" strokeWidth="3" fill="none"/>
      <path d="M 25 35 L 45 35 M 25 45 L 55 45 M 25 55 L 50 55" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="70" cy="40" r="8" stroke="currentColor" strokeWidth="3" fill="none"/>
      <path d="M 25 70 L 15 80 L 25 80 Z" fill="currentColor"/>
      <rect x="50" y="75" width="30" height="15" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
    </svg>
  );

  const WebsiteIcon = () => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="15" y="20" width="70" height="60" rx="3" stroke="currentColor" strokeWidth="3" fill="none"/>
      <rect x="20" y="30" width="60" height="5" fill="currentColor"/>
      <rect x="20" y="45" width="45" height="4" fill="currentColor"/>
      <rect x="20" y="55" width="50" height="4" fill="currentColor"/>
      <rect x="20" y="65" width="40" height="4" fill="currentColor"/>
      <circle cx="75" cy="50" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M 70 50 L 80 50 M 75 45 L 75 55" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );

  const products = [
    {
      id: 'phone-agent' as ProductType,
      title: "KI Telefon Agenten",
      icon: PhoneIcon,
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
      icon: ChatbotIcon,
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
      icon: WebsiteIcon,
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
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-white">
      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-100 z-50">
        <div 
          className="h-full bg-black transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Große Hero Section mit Scroll-Effekten */}
      <section 
        ref={heroRef}
        className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden"
        style={{
          opacity: heroOpacity,
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-gray-100 rounded-full blur-3xl opacity-30"
            style={{
              transform: `translate(${scrollY * 0.3}px, ${scrollY * 0.4}px) scale(${1 + scrollY * 0.0003})`
            }}
          />
          <div 
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-100 rounded-full blur-3xl opacity-30"
            style={{
              transform: `translate(${-scrollY * 0.3}px, ${-scrollY * 0.4}px) scale(${1 + scrollY * 0.0003})`
            }}
          />
        </div>

        <div 
          className="text-center max-w-5xl mx-auto animate-fade-in relative z-10"
          style={{
            transform: `translateY(${-scrollY * 0.4}px)`,
          }}
        >
          <h1 
            className="text-6xl md:text-8xl lg:text-9xl font-light text-black mb-8 md:mb-12 tracking-tight leading-none"
            style={{
              transform: `scale(${Math.max(0.7, 1 - scrollY * 0.0008)}) translateY(${scrollY * 0.1}px)`,
              textShadow: scrollY > 30 ? '0 4px 30px rgba(0,0,0,0.15)' : 'none',
              opacity: Math.max(0.3, 1 - scrollY * 0.0015),
            }}
          >
            FORCE4GOOD
          </h1>
          <p 
            className="text-xl md:text-2xl lg:text-3xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12 md:mb-16 font-light"
            style={{
              transform: `translateY(${scrollY * 0.2}px)`,
              opacity: Math.max(0, 1 - scrollY * 0.003),
            }}
          >
            Innovative KI-Lösungen, die Ihr Unternehmen voranbringen
          </p>
          <p 
            className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed mb-12 md:mb-16"
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
            className="group flex flex-col items-center gap-2 text-gray-400 hover:text-black transition-colors duration-300 animate-gentle-bounce relative z-10"
            style={{
              opacity: Math.max(0, 1 - scrollY * 0.008),
              transform: `translateY(${scrollY * 0.3}px)`,
            }}
            aria-label="Zu den Produkten scrollen"
          >
            <span className="text-sm uppercase tracking-widest font-light">Produkte entdecken</span>
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
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-end">
          <button
            onClick={handleStartOnboarding}
            disabled={!selectedProduct}
            className={`px-6 py-2.5 text-sm font-medium tracking-wide rounded-sm transition-all duration-300 transform uppercase ${
              selectedProduct
                ? 'bg-black hover:bg-gray-800 text-white shadow-sm hover:shadow-md hover:-translate-y-0.5'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed transform-none'
            }`}
          >
            Onboarding starten
          </button>
        </div>
      </header>

      {/* Produkte Section */}
      <section id="products-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">

        {/* Section Title */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-black mb-4 tracking-tight">
            Unsere Lösungen
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Wählen Sie die KI-Lösung, die am besten zu Ihrem Unternehmen passt
          </p>
        </div>

        {/* Produkte */}
        <div className="space-y-12 md:space-y-16">
          {products.map((product, index) => {
            const isSelected = selectedProduct === product.id;
            return (
              <div
                key={product.id}
                className={`flex flex-col ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } gap-8 md:gap-16 items-center animate-fade-in border-2 rounded-sm p-6 md:p-8 transition-all duration-300 ${
                  isSelected 
                    ? 'border-black bg-gray-50' 
                    : 'border-gray-200 bg-white hover:border-gray-300 cursor-pointer'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleProductSelect(product.id)}
              >
                {/* Icon/Visual */}
                <div className="flex-shrink-0 w-full md:w-1/3 flex justify-center">
                  <div className={`w-32 h-32 rounded-lg flex items-center justify-center transition-transform duration-300 hover:scale-110 p-6 ${
                    isSelected ? 'bg-black text-white' : 'bg-gray-100 text-black border-2 border-gray-300'
                  }`}>
                    <product.icon />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 w-full">
                  <div className="flex items-center gap-3 mb-4">
                    <h2 className="text-3xl md:text-4xl font-medium text-black tracking-tight">
                      {product.title}
                    </h2>
                    {isSelected && (
                      <span className="text-black text-xl">✓</span>
                    )}
                  </div>
                  <p className="text-base md:text-lg text-gray-700 mb-8 leading-relaxed">
                    {product.description}
                  </p>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Vorteile */}
                    <div>
                      <h3 className="text-sm font-medium text-black uppercase tracking-widest mb-4">
                        Vorteile
                      </h3>
                      <ul className="space-y-3">
                        {product.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="text-black mt-1.5 flex-shrink-0">✓</span>
                            <span className="text-gray-700 text-sm leading-relaxed">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Probleme die gelöst werden */}
                    <div>
                      <h3 className="text-sm font-medium text-black uppercase tracking-widest mb-4">
                        Löst diese Probleme
                      </h3>
                      <ul className="space-y-3">
                        {product.problems.map((problem, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="text-gray-400 mt-1.5 flex-shrink-0">•</span>
                            <span className="text-gray-600 text-sm leading-relaxed">{problem}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section unten */}
      <section className="bg-gray-50 border-t border-gray-200 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-light text-black mb-6 tracking-tight">
            Bereit für Ihre individuelle Lösung?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Starten Sie jetzt das Onboarding und finden Sie die perfekte KI-Lösung für Ihr Unternehmen.
          </p>
          <button
            onClick={handleStartOnboarding}
            disabled={!selectedProduct}
            className={`px-10 py-4 text-white text-sm font-medium tracking-wide rounded-sm shadow-sm transition-all duration-300 transform uppercase ${
              selectedProduct
                ? 'bg-black hover:bg-gray-800 hover:shadow-md hover:-translate-y-0.5'
                : 'bg-gray-300 cursor-not-allowed transform-none'
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

